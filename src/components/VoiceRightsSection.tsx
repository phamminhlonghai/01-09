import React, { useState } from 'react';
import { VOICE_RIGHTS_FEATURES } from '../data/mockData';
import { ShieldCheck, Award, Lock, FileText, CheckCircle, Sparkles, Download, Eye } from 'lucide-react';

export const VoiceRightsSection: React.FC = () => {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#00658d] uppercase tracking-wider bg-[#c6e7ff]/40 px-3 py-1 rounded-full">
          TIÊU CHUẨN BẢN QUYỀN ÂM THANH
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#001f3f] font-headline">
          Voice Rights: Bảo Hộ Bản Quyền Giọng Nói Toàn Diện
        </h2>
        <p className="text-base text-[#43474e] leading-relaxed">
          Đảm bảo tính hợp pháp tuyệt đối cho doanh nghiệp phát sóng các chiến dịch quảng cáo và bảo vệ tài sản giọng nói cho nghệ sĩ lồng tiếng.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VOICE_RIGHTS_FEATURES.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-[#c3c6cf]/80 shadow-sm flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#c6e7ff]/60 flex items-center justify-center text-[#00658d] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-base md:text-lg text-[#001f3f] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-[#43474e] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Showcase Card */}
      <div className="bg-gradient-to-br from-[#faf9fd] to-[#eeedf1] rounded-2xl border border-[#c3c6cf] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00658d] bg-white px-3 py-1 rounded-full border border-[#c3c6cf]/60">
            <Award className="w-4 h-4 text-[#00658d]" />
            <span>CHỨNG THƯ ĐIỆN TỬ ĐƯỢC MÃ HÓA SHA-256</span>
          </div>
          <h3 className="text-2xl font-bold font-headline text-[#001f3f]">
            Chứng Nhận Bản Quyền Giọng Nói Điện Tử (Voice Rights Certificate)
          </h3>
          <p className="text-sm text-[#43474e] leading-relaxed">
            Mỗi file âm thanh bàn giao đều được gắn mã định danh bản quyền duy nhất. Khách hàng nhận chứng thư pháp lý xác nhận quyền phát sóng thương mại trên mọi nền tảng truyền thông.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowCertModal(true)}
              className="px-4 py-2.5 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4 text-[#82cfff]" />
              <span>Xem Chứng Chỉ Mẫu</span>
            </button>
          </div>
        </div>

        {/* Mock Certificate Preview Visual */}
        <div 
          onClick={() => setShowCertModal(true)}
          className="w-full md:w-80 bg-white rounded-xl border-2 border-[#001f3f]/20 p-5 shadow-lg relative rotate-1 hover:rotate-0 transition-transform cursor-pointer"
        >
          <div className="border border-dashed border-[#c3c6cf] p-4 text-center space-y-2">
            <Award className="w-8 h-8 text-[#001f3f] mx-auto" />
            <div className="text-xs font-bold uppercase tracking-wider text-[#001f3f]">
              VOCALINK VOICE RIGHTS
            </div>
            <div className="text-[10px] text-[#74777f]">Chứng Thư Bản Quyền Thương Mại</div>
            <div className="py-2 border-y border-[#c3c6cf]/40 my-2 text-left text-[10px] space-y-1 text-[#43474e]">
              <div><strong>Dự án:</strong> TVC Sữa Vinamilk 2024</div>
              <div><strong>Voice Talent:</strong> Minh Anh (Miền Bắc)</div>
              <div><strong>Phạm vi:</strong> Toàn quốc • TVC & Digital</div>
              <div><strong>Thời hạn:</strong> 01 Năm (Đến 2025)</div>
            </div>
            <div className="text-[9px] text-emerald-700 font-mono font-bold bg-emerald-50 py-1 rounded">
              VERIFIED: #VCL-2024-88492X
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview for Certificate */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 border border-[#c3c6cf] shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="border-4 border-double border-[#001f3f] p-6 text-center space-y-4">
              <Award className="w-12 h-12 text-[#001f3f] mx-auto" />
              <div>
                <h3 className="font-headline font-extrabold text-xl text-[#001f3f] tracking-wide uppercase">
                  Chứng Nhận Quyền Sở Hữu Âm Thanh
                </h3>
                <div className="text-xs text-[#74777f] uppercase tracking-widest mt-0.5">
                  Vocalink Voice Rights Standard
                </div>
              </div>

              <p className="text-xs text-[#43474e] leading-relaxed">
                Văn bản này xác nhận Bên Thuê được toàn quyền sử dụng bản ghi âm giọng đọc cho mục đích thương mại theo phạm vi hợp đồng đã ký kết.
              </p>

              <div className="bg-[#faf9fd] p-4 rounded-xl border border-[#c3c6cf]/60 text-left text-xs space-y-1.5 text-[#001f3f]">
                <div><strong>Mã hợp đồng:</strong> VCL-2024-88492X</div>
                <div><strong>Voice Talent:</strong> Minh Anh (Verified Artist)</div>
                <div><strong>Khách hàng:</strong> Công ty TNHH Quảng Cáo Sáng Tạo XYZ</div>
                <div><strong>Cam kết AI:</strong> Nghiêm cấm huấn luyện mô hình Voice Cloning khi chưa có thỏa thuận phụ lục.</div>
              </div>

              <div className="flex justify-between items-end pt-4 border-t border-[#c3c6cf]/40 text-xs">
                <div className="text-left">
                  <div className="text-[10px] text-[#74777f]">Ngày phát hành:</div>
                  <div className="font-bold text-[#001f3f]">01/09/2024</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#74777f]">Hệ thống bảo chứng:</div>
                  <div className="font-bold text-[#00658d]">Vocalink Protocol</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCertModal(false)}
                className="px-5 py-2 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
