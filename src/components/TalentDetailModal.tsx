import React, { useState } from 'react';
import { VoiceTalent, AudioSample } from '../types';
import { X, BadgeCheck, Star, Play, Pause, Bookmark, ShieldCheck, Clock, Mic, Radio, Volume2, Calendar, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface TalentDetailModalProps {
  talent: VoiceTalent | null;
  onClose: () => void;
  onInviteTalent: (talent: VoiceTalent) => void;
  isSaved: boolean;
  onToggleSave: (talentId: string) => void;
  currentPlayingId: string | null;
  currentSampleId: string | null;
  isPlaying: boolean;
  onPlaySample: (talent: VoiceTalent, sampleId: string) => void;
}

export const TalentDetailModal: React.FC<TalentDetailModalProps> = ({
  talent,
  onClose,
  onInviteTalent,
  isSaved,
  onToggleSave,
  currentPlayingId,
  currentSampleId,
  isPlaying,
  onPlaySample
}) => {
  const [activeTab, setActiveTab] = useState<'demos' | 'equipment' | 'reviews'>('demos');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [message, setMessage] = useState('');

  if (!talent) return null;

  const formatPrice = (vnd: number) => {
    return new Intl.NumberFormat('vi-VN').format(vnd) + ' đ/phút';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setMessage('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#c3c6cf] my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[#001f3f] to-[#12345b] p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-20 h-20 rounded-full object-cover border-3 border-white/80 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold font-headline">{talent.name}</h2>
                {talent.verified && (
                  <BadgeCheck className="w-5 h-5 text-[#82cfff] fill-[#82cfff]/20" />
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
                  {talent.region}
                </span>
              </div>
              <p className="text-white/80 text-sm mt-1">{talent.title}</p>
              
              <div className="flex items-center gap-4 text-xs text-white/90 mt-3 flex-wrap">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Star className="w-4 h-4 fill-amber-300" />
                  {talent.rating} ({talent.reviewCount} đánh giá)
                </span>
                <span>•</span>
                <span>{talent.completedProjects} dự án hoàn thành</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Bàn giao trong {talent.turnaroundHours}h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="border-b border-[#c3c6cf]/60 px-6 bg-[#faf9fd] flex gap-6">
          <button
            onClick={() => setActiveTab('demos')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'demos'
                ? 'border-[#001f3f] text-[#001f3f]'
                : 'border-transparent text-[#43474e] hover:text-[#001f3f]'
            }`}
          >
            Kho Giọng Demo ({talent.sampleAudios.length})
          </button>
          <button
            onClick={() => setActiveTab('equipment')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'equipment'
                ? 'border-[#001f3f] text-[#001f3f]'
                : 'border-transparent text-[#43474e] hover:text-[#001f3f]'
            }`}
          >
            Thiết bị Studio & Tiểu sử
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#001f3f] text-[#001f3f]'
                : 'border-transparent text-[#43474e] hover:text-[#001f3f]'
            }`}
          >
            Đánh giá từ Khách hàng ({talent.reviewCount})
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === 'demos' && (
            <div className="space-y-4">
              <div className="text-xs text-[#74777f]">
                Nhấn vào nút Play ở từng bản thu để nghe thử các phong cách và kịch bản khác nhau:
              </div>
              <div className="space-y-3">
                {talent.sampleAudios.map((sample) => {
                  const isThisPlaying = isPlaying && currentPlayingId === talent.id && currentSampleId === sample.id;
                  return (
                    <div
                      key={sample.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isThisPlaying
                          ? 'border-[#2dbcfe] bg-[#c6e7ff]/10 shadow-xs'
                          : 'border-[#c3c6cf]/80 hover:border-[#74777f] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onPlaySample(talent, sample.id)}
                          className="w-11 h-11 rounded-full bg-[#001f3f] hover:bg-[#12345b] text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                        >
                          {isThisPlaying ? (
                            <Pause className="w-5 h-5 fill-white" />
                          ) : (
                            <Play className="w-5 h-5 fill-white translate-x-0.5" />
                          )}
                        </button>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-[#001f3f] truncate">
                              {sample.title}
                            </h4>
                            <span className="text-xs font-semibold px-2 py-0.5 bg-[#f4f3f7] text-[#00658d] rounded">
                              {sample.category}
                            </span>
                          </div>

                          <div className="text-xs text-[#43474e] mt-0.5">
                            Tone giọng: <span className="font-medium text-[#001f3f]">{sample.tone}</span> • Thời lượng: {sample.durationSec}s
                          </div>

                          {/* Equalizer animation */}
                          <div className="flex items-end gap-1 mt-2 h-4">
                            {(sample.waveformData || [5, 8, 10, 6, 9, 7, 5, 8, 10, 6, 4, 7, 9]).map((val, idx) => (
                              <div
                                key={idx}
                                style={{ height: `${Math.min(16, val * 1.5)}px` }}
                                className={`w-1 rounded-xs ${
                                  isThisPlaying ? 'bg-[#00658d] animate-sound-wave' : 'bg-[#82cfff]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs bg-[#faf9fd] p-2.5 rounded-lg text-[#43474e] border border-[#c3c6cf]/40 italic">
                        <strong>Trích đoạn kịch bản:</strong> "{sample.scriptSnippet}"
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#001f3f] uppercase tracking-wider mb-2">
                  Giới thiệu & Kinh nghiệm
                </h4>
                <p className="text-sm text-[#43474e] leading-relaxed">
                  {talent.bio}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#001f3f] uppercase tracking-wider mb-3">
                  Tiêu chuẩn Thiết bị Studio (Home/Pro Studio)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60">
                    <Mic className="w-5 h-5 text-[#00658d] mb-1.5" />
                    <div className="text-xs text-[#74777f]">Microphone</div>
                    <div className="text-xs font-bold text-[#001f3f] mt-0.5">{talent.equipment.mic}</div>
                  </div>
                  <div className="p-3.5 bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60">
                    <Radio className="w-5 h-5 text-[#00658d] mb-1.5" />
                    <div className="text-xs text-[#74777f]">Soundcard / Interface</div>
                    <div className="text-xs font-bold text-[#001f3f] mt-0.5">{talent.equipment.soundcard}</div>
                  </div>
                  <div className="p-3.5 bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60">
                    <Volume2 className="w-5 h-5 text-[#00658d] mb-1.5" />
                    <div className="text-xs text-[#74777f]">Không gian cách âm</div>
                    <div className="text-xs font-bold text-[#001f3f] mt-0.5">{talent.equipment.room}</div>
                  </div>
                </div>
              </div>

              {/* Badges and Guarantees */}
              <div className="bg-[#c6e7ff]/30 p-4 rounded-xl border border-[#82cfff]/50 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-[#00658d] shrink-0" />
                <div className="text-xs text-[#001e2d]">
                  <strong className="block font-bold mb-0.5">Cam kết Bản quyền Voice Rights & Đạt chuẩn Broadcast</strong>
                  Bản thu được xử lý khử ồn sạch sẽ, đạt chuẩn âm lượng tiêu chuẩn LUFS (-14 đến -16 LUFS), sẵn sàng phát sóng trên truyền hình, YouTube, Spotify và mạng xã hội.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60">
                <div>
                  <div className="text-3xl font-extrabold text-[#001f3f] font-headline">{talent.rating}/5.0</div>
                  <div className="flex text-amber-400 gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-[#43474e] text-right">
                  Dựa trên <strong>{talent.reviewCount}</strong> dự án được xác thực qua hợp đồng Vocalink
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-3">
                <div className="p-3.5 bg-white rounded-xl border border-[#c3c6cf]/60 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#001f3f]">Producer Hoàng Nam (Dentsu Redder)</strong>
                    <span className="text-[#74777f]">2 ngày trước</span>
                  </div>
                  <p className="text-[#43474e]">
                    "Giọng đọc cực kỳ chuyên nghiệp, bắt nhịp kịch bản nhanh và thu âm trả file chỉ sau 6 tiếng. Khách hàng bên mình duyệt ngay bản đầu tiên."
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[#c3c6cf]/60 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#001f3f]">Content Manager Minh Trí (EdTech Topica)</strong>
                    <span className="text-[#74777f]">1 tuần trước</span>
                  </div>
                  <p className="text-[#43474e]">
                    "Phát âm rõ ràng, chuẩn ngữ điệu sư phạm. Thiết bị thu chuẩn không hề bị lẫn tiếng vang hay tạp âm nền."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#faf9fd] border-t border-[#c3c6cf]/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-[#74777f] uppercase font-bold tracking-wider">
              Báo giá tham khảo
            </div>
            <div className="text-lg font-bold text-[#001f3f]">
              {formatPrice(talent.basePricePerMinute)}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onToggleSave(talent.id)}
              className="p-2.5 border border-[#c3c6cf] rounded-xl hover:bg-white text-[#001f3f] transition-colors cursor-pointer"
              title="Lưu giọng đọc"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-[#00658d] text-[#00658d]' : ''}`} />
            </button>

            <button
              onClick={() => {
                onClose();
                onInviteTalent(talent);
              }}
              className="flex-grow sm:flex-grow-0 px-6 py-2.5 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#82cfff]" />
              <span>Gửi Kịch bản / Mời dự án</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
