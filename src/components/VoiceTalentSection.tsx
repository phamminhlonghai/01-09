import React, { useState } from 'react';
import { Mic, DollarSign, Shield, Zap, CheckCircle2, Award, ArrowRight, Send } from 'lucide-react';

export const VoiceTalentSection: React.FC = () => {
  const [weeklyMinutes, setWeeklyMinutes] = useState(25);
  const [applied, setApplied] = useState(false);

  const estimatedMonthlyIncome = weeklyMinutes * 4 * 420000;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => setApplied(false), 5000);
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#00658d] uppercase tracking-wider bg-[#c6e7ff]/40 px-3 py-1 rounded-full">
          DÀNH CHO DIỄN VIÊN LỒNG TIẾNG & VOICE TALENT
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#001f3f] font-headline">
          Biến Giọng Nói Của Bạn Thành Sự Nghiệp Đỉnh Cao
        </h2>
        <p className="text-base text-[#43474e] leading-relaxed">
          Gia nhập mạng lưới Voice Talent chuyên nghiệp hàng đầu Việt Nam. Nhận dự án TVC, Sách nói, Game từ các thương hiệu lớn với thanh toán được bảo đảm 100%.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-xl bg-[#c6e7ff]/60 flex items-center justify-center text-[#00658d]">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-lg text-[#001f3f]">Thanh Toán Đảm Bảo & Đúng Hạn</h3>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Hệ thống giữ cọc Escrow bảo vệ công sức của bạn. Không còn lo lắng về việc nợ tiền thu âm hay chậm trễ thanh toán từ đối tác.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-xl bg-[#c6e7ff]/60 flex items-center justify-center text-[#00658d]">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-lg text-[#001f3f]">Bảo Vệ Bản Quyền Âm Thanh</h3>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Hợp đồng chuẩn pháp lý chống việc nhân bản giọng nói AI (Voice Cloning) trái phép và bảo vệ thời hạn khai thác thương mại của bạn.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-xl bg-[#c6e7ff]/60 flex items-center justify-center text-[#00658d]">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-lg text-[#001f3f]">Nhận Audition Trực Tiếp</h3>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Nhận thông báo kịch bản casting phù hợp với chất giọng của bạn ngay trên nền tảng mà không cần qua nhiều cấp trung gian.
          </p>
        </div>
      </div>

      {/* Income Calculator & Onboarding Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Income Simulator */}
        <div className="bg-white p-7 rounded-2xl border border-[#c3c6cf] shadow-sm space-y-6">
          <h3 className="font-headline font-bold text-xl text-[#001f3f]">
            Ước Tính Thu Nhập Voice Talent
          </h3>
          <p className="text-xs text-[#43474e]">
            Kéo thanh trượt để tính thu nhập dự kiến mỗi tháng dựa trên số phút thu âm hoàn thành:
          </p>

          <div className="space-y-3">
            <div className="flex justify-between text-sm font-bold text-[#001f3f]">
              <span>Số phút thu âm / tuần:</span>
              <span className="text-[#00658d]">{weeklyMinutes} phút/tuần (~{weeklyMinutes * 4} phút/tháng)</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={weeklyMinutes}
              onChange={(e) => setWeeklyMinutes(Number(e.target.value))}
              className="w-full h-2 bg-[#eeedf1] rounded-lg appearance-none cursor-pointer accent-[#001f3f]"
            />
            <div className="flex justify-between text-[11px] text-[#74777f]">
              <span>5 phút/tuần (Bán thời gian)</span>
              <span>30 phút/tuần</span>
              <span>60 phút/tuần (Toàn thời gian)</span>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-br from-[#001f3f] to-[#12345b] rounded-xl text-white space-y-1">
            <div className="text-xs text-white/80">Thu nhập tiềm năng hàng tháng:</div>
            <div className="text-3xl font-extrabold text-[#82cfff] font-headline">
              {new Intl.NumberFormat('vi-VN').format(estimatedMonthlyIncome)} đ / tháng
            </div>
            <div className="text-[11px] text-white/70 pt-1">
              * Ước tính dựa trên mức giá trung bình 420.000 đ/phút file master hoàn thiện.
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white p-7 rounded-2xl border border-[#c3c6cf] shadow-sm space-y-4">
          <h3 className="font-headline font-bold text-xl text-[#001f3f]">
            Đăng Ký Gia Nhập Nền Tảng Vocalink
          </h3>
          <p className="text-xs text-[#43474e]">
            Điền thông tin và đính kèm link bản thu demo tốt nhất của bạn để Hội đồng Nghệ thuật xét duyệt.
          </p>

          {applied ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-emerald-800">Hồ sơ đã được gửi thành công!</h4>
              <p className="text-xs text-emerald-700">
                Đội ngũ Vocalink sẽ nghe duyệt bản demo và phản hồi qua email trong vòng 48 giờ làm việc.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Nghệ danh / Họ tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Minh Anh"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0988 123 456"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Vùng miền *</label>
                  <select className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]">
                    <option>Miền Bắc</option>
                    <option>Miền Nam</option>
                    <option>Miền Trung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#43474e] mb-1">Thiết bị Mic chính</label>
                  <input
                    type="text"
                    placeholder="VD: Rode NT1 / Shure SM7B"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#43474e] mb-1">Link Demo (Google Drive / Soundcloud / Youtube) *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4 text-[#82cfff]" />
                <span>Nộp Hồ Sơ Xét Duyệt Voice Talent</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
