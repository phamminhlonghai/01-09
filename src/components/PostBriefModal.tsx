import React, { useState } from 'react';
import { VoiceTalent, ProjectCategory, Region, Gender, VoiceBrief } from '../types';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, Clock, FileText, CheckCircle2, Mic, Users, DollarSign } from 'lucide-react';

interface PostBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  talents: VoiceTalent[];
  onBriefCreated: (brief: VoiceBrief) => void;
  preselectedTalent?: VoiceTalent | null;
}

export const PostBriefModal: React.FC<PostBriefModalProps> = ({
  isOpen,
  onClose,
  talents,
  onBriefCreated,
  preselectedTalent
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState(preselectedTalent ? `Dự án thu âm cùng ${preselectedTalent.name}` : '');
  const [category, setCategory] = useState<ProjectCategory>('Quảng cáo TVC');
  const [targetGender, setTargetGender] = useState<Gender | 'Không yêu cầu'>(preselectedTalent ? preselectedTalent.gender : 'Không yêu cầu');
  const [targetRegion, setTargetRegion] = useState<Region | 'Không yêu cầu'>(preselectedTalent ? preselectedTalent.region : 'Không yêu cầu');
  const [tone, setTone] = useState('Trầm ấm, truyền cảm, tự nhiên');
  const [scriptText, setScriptText] = useState('Chào mừng bạn đến với chiến dịch truyền thông mới nhất của chúng tôi...');
  const [budget, setBudget] = useState('2.000.000 - 5.000.000 đ');
  const [deadlineDays, setDeadlineDays] = useState(2);
  const [usageType, setUsageType] = useState<any>('Mạng xã hội / Youtube');
  const [licenseDuration, setLicenseDuration] = useState<any>('1 năm');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Calculate word count & estimated duration
  const words = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const estimatedMin = Math.max(0.2, +(words / 150).toFixed(1)); // average 150 words per minute

  // Matching talents preview
  const matchingTalents = talents.filter((t) => {
    if (preselectedTalent && t.id === preselectedTalent.id) return true;
    if (targetGender !== 'Không yêu cầu' && t.gender !== targetGender) return false;
    if (targetRegion !== 'Không yêu cầu' && t.region !== targetRegion) return false;
    return true;
  }).slice(0, 3);

  const handleSubmit = () => {
    const newBrief: VoiceBrief = {
      id: `brief-${Date.now()}`,
      title: title || 'Dự án Voice Brief mới',
      category,
      targetGender,
      targetRegion,
      tone,
      scriptText,
      wordCount: words,
      estimatedDurationMin: estimatedMin,
      budget,
      deadlineDays,
      usageType,
      licenseDuration,
      status: 'Open',
      createdAt: 'Vừa xong'
    };

    onBriefCreated(newBrief);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#c3c6cf] my-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#001f3f] p-6 text-white flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#82cfff] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Casting & Đăng Voice Brief</span>
            </div>
            <h2 className="text-xl font-bold font-headline">
              {preselectedTalent ? `Mời Voice Talent: ${preselectedTalent.name}` : 'Tạo Voice Brief Tuyển Chọn Giọng Đọc'}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        {!submitted && (
          <div className="bg-[#faf9fd] border-b border-[#c3c6cf]/60 px-6 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-[#001f3f] text-white' : 'bg-[#c3c6cf] text-[#43474e]'
              }`}>1</span>
              <span className={step === 1 ? 'font-bold text-[#001f3f]' : 'text-[#74777f]'}>Dự án</span>
            </div>
            <div className="w-8 h-0.5 bg-[#c3c6cf]/60" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-[#001f3f] text-white' : 'bg-[#c3c6cf] text-[#43474e]'
              }`}>2</span>
              <span className={step === 2 ? 'font-bold text-[#001f3f]' : 'text-[#74777f]'}>Chất giọng</span>
            </div>
            <div className="w-8 h-0.5 bg-[#c3c6cf]/60" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-[#001f3f] text-white' : 'bg-[#c3c6cf] text-[#43474e]'
              }`}>3</span>
              <span className={step === 3 ? 'font-bold text-[#001f3f]' : 'text-[#74777f]'}>Kịch bản & Ngân sách</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-headline text-[#001f3f]">
                Voice Brief Đã Đăng Thành Công!
              </h3>
              <p className="text-sm text-[#43474e] max-w-md mx-auto">
                Hệ thống đã gửi thông báo đến các Voice Talent phù hợp. Bạn sẽ nhận được các bản thu audition demo trong vòng 1-4 giờ.
              </p>

              {/* Matched Talents */}
              <div className="pt-4 border-t border-[#c3c6cf]/60 text-left">
                <div className="text-xs font-bold text-[#001f3f] uppercase tracking-wider mb-3">
                  Voice Talent đề xuất phù hợp nhất:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {matchingTalents.map((t) => (
                    <div key={t.id} className="p-3 bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60 flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#001f3f] truncate">{t.name}</div>
                        <div className="text-[11px] text-[#74777f]">{t.region}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-sm font-semibold cursor-pointer"
                >
                  Xong & Xem danh sách dự án
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Step 1: Project Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#43474e] uppercase mb-1">
                      Tên Dự Án / Chiến Dịch *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="VD: TVC Giới thiệu Sản phẩm Sữa Tươi 2024"
                      className="w-full px-3.5 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl text-sm focus:outline-none focus:border-[#00658d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#43474e] uppercase mb-2">
                      Thể loại nội dung *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Quảng cáo TVC',
                        'Sách nói (Audiobook)',
                        'Podcast & Radio',
                        'Game & Trailer',
                        'EdTech & E-Learning',
                        'Thuyết minh Tài liệu'
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat as any)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                            category === cat
                              ? 'border-[#001f3f] bg-[#c6e7ff]/30 text-[#001f3f] ring-1 ring-[#001f3f]'
                              : 'border-[#c3c6cf] text-[#43474e] hover:bg-[#faf9fd]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#43474e] uppercase mb-1">
                      Mục đích phát sóng & Bản quyền
                    </label>
                    <select
                      value={usageType}
                      onChange={(e) => setUsageType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl text-sm focus:outline-none focus:border-[#00658d]"
                    >
                      <option>Mạng xã hội / Youtube</option>
                      <option>Phát sóng truyền hình / Radio</option>
                      <option>Nội bộ công ty</option>
                      <option>Sách nói / Giáo dục</option>
                      <option>Quảng cáo thương mại toàn cầu</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Voice Tone & Criteria */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#43474e] uppercase mb-2">
                        Giới tính giọng đọc *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Không yêu cầu', 'Nữ', 'Nam'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setTargetGender(g as any)}
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                              targetGender === g
                                ? 'border-[#001f3f] bg-[#c6e7ff]/30 text-[#001f3f] ring-1 ring-[#001f3f]'
                                : 'border-[#c3c6cf] text-[#43474e] hover:bg-[#faf9fd]'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#43474e] uppercase mb-2">
                        Vùng miền / Chất giọng *
                      </label>
                      <select
                        value={targetRegion}
                        onChange={(e) => setTargetRegion(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl text-sm focus:outline-none focus:border-[#00658d]"
                      >
                        <option value="Không yêu cầu">Không yêu cầu</option>
                        <option value="Miền Bắc">Miền Bắc (Hà Nội chuẩn)</option>
                        <option value="Miền Nam">Miền Nam (Sài Gòn ngọt ngào)</option>
                        <option value="Miền Trung">Miền Trung (Huế / Đà Nẵng)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#43474e] uppercase mb-1">
                      Mô tả Phong cách & Cảm xúc (Tone of Voice) *
                    </label>
                    <input
                      type="text"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      placeholder="VD: Trầm ấm, uy quyền, lay động cảm xúc, tươi vui, hài hước..."
                      className="w-full px-3.5 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl text-sm focus:outline-none focus:border-[#00658d]"
                    />
                  </div>

                  {/* Quick Tone Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Trầm ấm & Quyền lực', 'Thanh lịch & Ấm áp', 'Tươi vui & Năng động', 'Truyền cảm & Xúc động', 'Chuẩn đài truyền hình'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-[#eeedf1] text-[#001f3f] hover:bg-[#c6e7ff] transition-colors"
                      >
                        + {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Script & Budget */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-[#43474e] uppercase">
                        Kịch bản thu âm (Script) *
                      </label>
                      <div className="text-xs text-[#00658d] font-semibold flex items-center gap-2">
                        <span>{words} từ</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> ~{estimatedMin} phút đọc
                        </span>
                      </div>
                    </div>
                    <textarea
                      rows={4}
                      value={scriptText}
                      onChange={(e) => setScriptText(e.target.value)}
                      placeholder="Dán kịch bản của bạn vào đây..."
                      className="w-full px-3.5 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl text-sm focus:outline-none focus:border-[#00658d] leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#43474e] uppercase mb-1">
                        Ngân sách dự kiến *
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl text-sm focus:outline-none focus:border-[#00658d]"
                      >
                        <option>Dưới 1.500.000 đ</option>
                        <option>2.000.000 - 5.000.000 đ</option>
                        <option>5.000.000 - 10.000.000 đ</option>
                        <option>Trên 10.000.000 đ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#43474e] uppercase mb-1">
                        Hạn chót nhận file Master (Deadline) *
                      </label>
                      <select
                        value={deadlineDays}
                        onChange={(e) => setDeadlineDays(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl text-sm focus:outline-none focus:border-[#00658d]"
                      >
                        <option value={1}>Gấp trong 12 - 24 giờ</option>
                        <option value={2}>Trong 2 ngày</option>
                        <option value={5}>Trong 5 ngày</option>
                        <option value={10}>Linh hoạt / Dự án dài hạn</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div className="pt-4 border-t border-[#c3c6cf]/60 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-xs font-semibold text-[#43474e] hover:text-[#001f3f] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Tiếp tục</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Đăng Voice Brief & Nhận Audition</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
