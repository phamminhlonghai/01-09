import React, { useState } from 'react';
import { Building2, Film, Gamepad2, GraduationCap, ShieldCheck, Sparkles, Check, Send, PhoneCall, Headphones } from 'lucide-react';

interface EnterpriseSectionProps {
  onOpenBriefModal: () => void;
}

export const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({ onOpenBriefModal }) => {
  const [submitted, setSubmitted] = useState(false);
  const [calcMinutes, setCalcMinutes] = useState(30);
  const [calcTier, setCalcTier] = useState<'standard' | 'exclusive'>('standard');

  const estimatedCost = Math.round(calcMinutes * (calcTier === 'standard' ? 400000 : 750000));
  const estimatedSavings = Math.round(estimatedCost * 0.25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#00658d] uppercase tracking-wider bg-[#c6e7ff]/40 px-3 py-1 rounded-full">
          GIẢI PHÁP CHO DOANH NGHIỆP & AGENCY
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#001f3f] font-headline">
          Sản Xuất Âm Thanh Chuyên Nghiệp Ở Quy Mô Lớn
        </h2>
        <p className="text-base text-[#43474e] leading-relaxed">
          Đồng hành cùng hơn 120+ Agency quảng cáo, Studio game và nền tảng giáo dục hàng đầu. 
          Bảo vệ bản quyền pháp lý tuyệt đối với quy trình quản lý dự án tập trung.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#c6e7ff]/50 flex items-center justify-center text-[#00658d]">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-headline font-bold text-lg text-[#001f3f]">Dành cho Agency & Brand</h3>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Casting nhanh trong 2 giờ cho các chiến dịch TVC/Digital. Hỗ trợ thu âm trực tiếp qua Session Link với khách hàng.
          </p>
          <ul className="text-xs text-[#43474e] space-y-1.5 pt-2 border-t border-[#c3c6cf]/30">
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Hóa đơn VAT điện tử</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> NDA bảo mật kịch bản</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#c6e7ff]/50 flex items-center justify-center text-[#00658d]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-headline font-bold text-lg text-[#001f3f]">EdTech & Sách nói</h3>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Gói sản xuất hàng trăm giờ thu âm bài giảng e-learning, audiobook với độ đồng nhất chất âm cao nhất.
          </p>
          <ul className="text-xs text-[#43474e] space-y-1.5 pt-2 border-t border-[#c3c6cf]/30">
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Chiết khấu theo khối lượng</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Kiểm duyệt tạp âm AI</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#c6e7ff]/50 flex items-center justify-center text-[#00658d]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h3 className="font-headline font-bold text-lg text-[#001f3f]">Game & Animation</h3>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Đội ngũ diễn viên lồng tiếng nhân vật đa sắc thái biểu cảm, linh hoạt từ anh hùng sử thi đến hoạt hình thiếu nhi.
          </p>
          <ul className="text-xs text-[#43474e] space-y-1.5 pt-2 border-t border-[#c3c6cf]/30">
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Master file đa kênh WAV</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Ký Voice Rights toàn cầu</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#c6e7ff]/50 flex items-center justify-center text-[#00658d]">
            <Film className="w-5 h-5" />
          </div>
          <h3 className="font-headline font-bold text-lg text-[#001f3f]">Tài liệu & Thuyết minh</h3>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Chất giọng chuẩn phát thanh viên, độ chuẩn xác cao, phù hợp cho phim tài liệu lịch sử, báo cáo thường niên doanh nghiệp.
          </p>
          <ul className="text-xs text-[#43474e] space-y-1.5 pt-2 border-t border-[#c3c6cf]/30">
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Thời gian trả file siêu tốc</li>
            <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Chỉnh sửa kịch bản miễn phí</li>
          </ul>
        </div>
      </div>

      {/* Interactive Enterprise Estimate Calculator & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Estimator */}
        <div className="bg-white p-7 rounded-2xl border border-[#c3c6cf] shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00658d]" />
            <h3 className="font-headline font-bold text-xl text-[#001f3f]">
              Ước Tính Chi Phí Thu Âm Doanh Nghiệp
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2 text-[#001f3f]">
                <span>Tổng thời lượng dự kiến:</span>
                <span className="text-[#00658d] font-bold">{calcMinutes} phút</span>
              </div>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={calcMinutes}
                onChange={(e) => setCalcMinutes(Number(e.target.value))}
                className="w-full h-2 bg-[#eeedf1] rounded-lg appearance-none cursor-pointer accent-[#001f3f]"
              />
              <div className="flex justify-between text-[11px] text-[#74777f] mt-1">
                <span>5 phút (TVC ngắn)</span>
                <span>60 phút (Audiobook)</span>
                <span>180 phút (Khóa học lớn)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#43474e] uppercase mb-2">
                Cấp độ Bản quyền & Giọng đọc:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCalcTier('standard')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    calcTier === 'standard'
                      ? 'border-[#001f3f] bg-[#c6e7ff]/20 ring-1 ring-[#001f3f]'
                      : 'border-[#c3c6cf] hover:bg-[#faf9fd]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#001f3f]">Tiêu chuẩn (Standard)</div>
                  <div className="text-[11px] text-[#74777f]">Mạng xã hội, nội bộ, web</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCalcTier('exclusive')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    calcTier === 'exclusive'
                      ? 'border-[#001f3f] bg-[#c6e7ff]/20 ring-1 ring-[#001f3f]'
                      : 'border-[#c3c6cf] hover:bg-[#faf9fd]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#001f3f]">Độc quyền (Broadcast/TVC)</div>
                  <div className="text-[11px] text-[#74777f]">Truyền hình, Radio, Toàn cầu</div>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60 space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-[#43474e]">Chi phí ước tính:</span>
              <span className="text-xl font-bold text-[#001f3f]">
                {new Intl.NumberFormat('vi-VN').format(estimatedCost)} đ
              </span>
            </div>
            <div className="flex justify-between items-baseline text-xs text-emerald-600 font-semibold">
              <span>Tiết kiệm qua gói Enterprise (~25%):</span>
              <span>- {new Intl.NumberFormat('vi-VN').format(estimatedSavings)} đ</span>
            </div>
          </div>
        </div>

        {/* Enterprise Consultation Form */}
        <div className="bg-white p-7 rounded-2xl border border-[#c3c6cf] shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-[#00658d]" />
            <h3 className="font-headline font-bold text-xl text-[#001f3f]">
              Yêu Cầu Tư Vấn Gói Doanh Nghiệp
            </h3>
          </div>
          <p className="text-xs text-[#43474e]">
            Đội ngũ Giám đốc Casting của Vocalink sẽ liên hệ lại trong vòng 30 phút cùng bản mẫu giọng đề xuất.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-emerald-800">Yêu cầu đã được tiếp nhận!</h4>
              <p className="text-xs text-emerald-700">
                Chuyên viên tư vấn của Vocalink sẽ gọi điện hỗ trợ bạn trong ít phút.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Họ tên của bạn *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Tên Công ty / Agency *</label>
                <input
                  type="text"
                  required
                  placeholder="Công ty Cổ phần Truyền thông ABC"
                  className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Yêu cầu cụ thể</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả dự án, số lượng video, thời hạn cần bàn giao..."
                  className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4 text-[#82cfff]" />
                <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
