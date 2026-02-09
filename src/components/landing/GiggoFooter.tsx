import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";

const GiggoFooter = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6B00] to-[#FFA726] bg-clip-text text-transparent">
                Giggo
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Platform marketplace UGC terpercaya untuk seller TikTok Shop & Shopee. Kreator
              terverifikasi, bayar aman, hasil berkualitas.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B00] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B00] transition-colors" aria-label="TikTok">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.8.1V9a6.27 6.27 0 00-.8-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.27 8.27 0 004.76 1.5V7.12a4.83 4.83 0 01-1-.43z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B00] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-gray-400">Produk</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/campaigns" className="text-gray-300 hover:text-[#FF6B00] transition-colors">Harga</Link></li>
              <li><Link to="/creators" className="text-gray-300 hover:text-[#FF6B00] transition-colors">Kreator</Link></li>
              <li><Link to="/" className="text-gray-300 hover:text-[#FF6B00] transition-colors">Cara Kerja</Link></li>
              <li><Link to="/brands" className="text-gray-300 hover:text-[#FF6B00] transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-gray-400">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-gray-500 cursor-not-allowed">Blog</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Tutorial</span></li>
              <li><Link to="/" className="text-gray-300 hover:text-[#FF6B00] transition-colors">FAQ</Link></li>
              <li><span className="text-gray-500 cursor-not-allowed">API Docs</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-gray-400">Perusahaan</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-gray-500 cursor-not-allowed">Tentang Kami</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Karir</span></li>
              <li>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#FF6B00] transition-colors flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> Kontak
                </a>
              </li>
              <li>
                <a href="mailto:hello@giggo.id" className="text-gray-300 hover:text-[#FF6B00] transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> hello@giggo.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Giggo.id - PT Giggo Kreasi Digital. Jakarta, Indonesia.
          </p>
          <div className="flex gap-6 text-xs">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GiggoFooter;
