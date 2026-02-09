-- Create transaction type enum
CREATE TYPE public.transaction_type AS ENUM ('deposit', 'withdrawal', 'earning', 'escrow_hold', 'escrow_release', 'refund');

-- Create transaction status enum
CREATE TYPE public.transaction_status AS ENUM ('pending', 'success', 'failed');

-- Create wallets table
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
  pending_balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT positive_balance CHECK (balance >= 0),
  CONSTRAINT positive_pending CHECK (pending_balance >= 0)
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
  amount NUMERIC(15, 2) NOT NULL,
  type transaction_type NOT NULL,
  status transaction_status NOT NULL DEFAULT 'pending',
  reference_id UUID, -- Links to campaign_id or application_id
  description TEXT,
  bank_name TEXT,
  account_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_wallets_user_id ON public.wallets(user_id);
CREATE INDEX idx_transactions_wallet_id ON public.transactions(wallet_id);
CREATE INDEX idx_transactions_reference ON public.transactions(reference_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);

-- Enable RLS
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Wallet RLS Policies
CREATE POLICY "Users can view their own wallet"
ON public.wallets FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wallet"
ON public.wallets FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update wallet balances"
ON public.wallets FOR UPDATE
USING (auth.uid() = user_id);

-- Transaction RLS Policies
CREATE POLICY "Users can view their wallet transactions"
ON public.transactions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.wallets
    WHERE wallets.id = transactions.wallet_id
    AND wallets.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create transactions for their wallet"
ON public.transactions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.wallets
    WHERE wallets.id = transactions.wallet_id
    AND wallets.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their pending transactions"
ON public.transactions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.wallets
    WHERE wallets.id = transactions.wallet_id
    AND wallets.user_id = auth.uid()
  )
  AND status = 'pending'
);

-- Create trigger for updated_at
CREATE TRIGGER update_wallets_updated_at
BEFORE UPDATE ON public.wallets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to ensure wallet exists for user
CREATE OR REPLACE FUNCTION public.ensure_wallet_exists(_user_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _wallet_id UUID;
BEGIN
  SELECT id INTO _wallet_id FROM public.wallets WHERE user_id = _user_id;
  
  IF _wallet_id IS NULL THEN
    INSERT INTO public.wallets (user_id, balance, pending_balance)
    VALUES (_user_id, 0, 0)
    RETURNING id INTO _wallet_id;
  END IF;
  
  RETURN _wallet_id;
END;
$$;

-- Function to process escrow hold (Brand launching campaign)
CREATE OR REPLACE FUNCTION public.hold_escrow_for_campaign(
  _brand_id UUID,
  _campaign_id UUID,
  _amount NUMERIC
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _wallet_id UUID;
  _current_balance NUMERIC;
BEGIN
  -- Get or create wallet
  SELECT id, balance INTO _wallet_id, _current_balance
  FROM public.wallets
  WHERE user_id = _brand_id;
  
  IF _wallet_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check sufficient balance
  IF _current_balance < _amount THEN
    RETURN FALSE;
  END IF;
  
  -- Deduct from balance, add to pending
  UPDATE public.wallets
  SET balance = balance - _amount,
      pending_balance = pending_balance + _amount
  WHERE id = _wallet_id;
  
  -- Record transaction
  INSERT INTO public.transactions (wallet_id, amount, type, status, reference_id, description)
  VALUES (_wallet_id, _amount, 'escrow_hold', 'success', _campaign_id, 'Escrow hold for campaign launch');
  
  RETURN TRUE;
END;
$$;

-- Function to release escrow to creator
CREATE OR REPLACE FUNCTION public.release_escrow_to_creator(
  _brand_id UUID,
  _creator_id UUID,
  _campaign_id UUID,
  _amount NUMERIC,
  _description TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _brand_wallet_id UUID;
  _creator_wallet_id UUID;
BEGIN
  -- Get brand wallet
  SELECT id INTO _brand_wallet_id FROM public.wallets WHERE user_id = _brand_id;
  
  -- Get or create creator wallet
  _creator_wallet_id := public.ensure_wallet_exists(_creator_id);
  
  IF _brand_wallet_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Deduct from brand pending balance
  UPDATE public.wallets
  SET pending_balance = pending_balance - _amount
  WHERE id = _brand_wallet_id AND pending_balance >= _amount;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Add to creator pending balance (they need to request payout)
  UPDATE public.wallets
  SET pending_balance = pending_balance + _amount
  WHERE id = _creator_wallet_id;
  
  -- Record brand transaction
  INSERT INTO public.transactions (wallet_id, amount, type, status, reference_id, description)
  VALUES (_brand_wallet_id, _amount, 'escrow_release', 'success', _campaign_id, _description);
  
  -- Record creator earning
  INSERT INTO public.transactions (wallet_id, amount, type, status, reference_id, description)
  VALUES (_creator_wallet_id, _amount, 'earning', 'pending', _campaign_id, _description);
  
  RETURN TRUE;
END;
$$;