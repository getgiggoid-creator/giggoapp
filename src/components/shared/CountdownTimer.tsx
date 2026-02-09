import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  endDate: Date;
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ 
  endDate, 
  className, 
  showIcon = true,
  compact = false 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (isExpired) {
    return (
      <div className={cn("flex items-center gap-1.5 text-muted-foreground", className)}>
        {showIcon && <Clock className="w-4 h-4" />}
        <span className="text-sm font-medium">Ended</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {showIcon && <Clock className="w-4 h-4 text-primary" />}
        <span className="text-sm font-medium">
          {timeLeft.days > 0 ? `${timeLeft.days}d` : `${timeLeft.hours}h ${timeLeft.minutes}m`}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && <Clock className="w-4 h-4 text-primary" />}
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <>
            <TimeUnit value={timeLeft.days} label="d" />
            <span className="text-muted-foreground">:</span>
          </>
        )}
        <TimeUnit value={timeLeft.hours} label="h" />
        <span className="text-muted-foreground">:</span>
        <TimeUnit value={timeLeft.minutes} label="m" />
        <span className="text-muted-foreground">:</span>
        <TimeUnit value={timeLeft.seconds} label="s" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex items-baseline gap-0.5">
    <span className="text-sm font-bold tabular-nums">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);
