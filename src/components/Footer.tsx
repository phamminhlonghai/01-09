import React from 'react';
import { NavTab } from '../types';
import { Mic, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenBriefModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBriefModal }) => {
  return (
    <footer className="bg-[#001f3f] text-white w-full py-16 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div 
              onClick={() => setActiveTab('explore')}
              className="text-2xl font-bold font-headline tracking-tight text-white flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#82cfff]">
                <Mic className="w-4 h-4" />
              </div>
              <span>Vocalink</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              © 2024 Vocalink. Nền tảng Voice Talent chuyên nghiệp hàng đầu Việt Nam.
            </p>
            <div className="pt-2 text-[11px] text-white/60 space-y-1">
              <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Hà Nội & TP. Hồ Chí Minh</div>
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> contact@vocalink.vn</div>
            </div>
          </div>

          {/* Col 2: Sản phẩm */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              SẢN PHẨM
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className="hover:text-[#82cfff] transition-colors cursor-pointer"
                >
                  Tìm giọng
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenBriefModal}
                  className="hover:text-[#82cfff] transition-colors cursor-pointer"
                >
                  Đăng Voice Brief
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('how-it-works')}
                  className="hover:text-[#82cfff] transition-colors cursor-pointer"
                >
                  Cách hoạt động
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Dành cho */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              DÀNH CHO
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button 
                  onClick={() => setActiveTab('enterprise')}
                  className="hover:text-[#82cfff] transition-colors cursor-pointer"
                >
                  Doanh nghiệp & Agency
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('talents')}
                  className="hover:text-[#82cfff] transition-colors cursor-pointer"
                >
                  Voice Talent / Nghệ sĩ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('voice-rights')}
                  className="hover:text-[#82cfff] transition-colors cursor-pointer"
                >
                  Bản quyền Voice Rights
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tài nguyên */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              TÀI NGUYÊN
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <span className="hover:text-[#82cfff] transition-colors cursor-pointer">
                  Blog & Xu hướng Audio
                </span>
              </li>
              <li>
                <span className="hover:text-[#82cfff] transition-colors cursor-pointer">
                  Bảng giá thu âm chuẩn
                </span>
              </li>
              <li>
                <span className="hover:text-[#82cfff] transition-colors cursor-pointer">
                  Cẩm nang đạo diễn giọng đọc
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <span className="hover:text-[#82cfff] transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#82cfff] transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-[#82cfff] transition-colors cursor-pointer">
                  Voice Rights Protection
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-4">
          <div>
            Vocalink - Nền tảng kết nối trực tiếp Voice Talent và Doanh nghiệp với công nghệ bảo chứng âm thanh.
          </div>
          <div className="flex items-center gap-4">
            <span>Tiêu chuẩn âm thanh EBU R128</span>
            <span>•</span>
            <span>Bảo vệ quyền tác giả số</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
