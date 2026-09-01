import React, { useEffect, useState } from 'react';
import { VoiceTalent } from '../types';
import { audioEngine } from '../services/audioEngine';
import { Play, Pause, BadgeCheck, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  talents: VoiceTalent[];
  onOpenBriefModal: () => void;
  onExploreClick: () => void;
  onSelectTalent: (talent: VoiceTalent) => void;
  currentPlayingId: string | null;
  isPlaying: boolean;
  onPlayTalentAudio: (talent: VoiceTalent, sampleId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  talents,
  onOpenBriefModal,
  onExploreClick,
  onSelectTalent,
  currentPlayingId,
  isPlaying,
  onPlayTalentAudio
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mien-bac' | 'quang-cao'>('all');

  const minhAnh = talents.find((t) => t.id === 'talent-minh-anh') || talents[0];
  const thanhTung = talents.find((t) => t.id === 'talent-thanh-tung') || talents[1];

  const heroTalents = [minhAnh, thanhTung].filter(Boolean);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 pt-8 pb-16 md:pt-14 md:pb-24 flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {/* Left Column: Hero Copy */}
      <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6e7ff]/40 text-[#00658d] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nền tảng Voice Talent #1 Việt Nam</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-[48px] leading-[1.15] font-extrabold text-[#001f3f] tracking-tight">
          Tìm đúng giọng.<br />
          Nâng tầm nội dung.
        </h1>

        <p className="text-[#43474e] text-base md:text-lg leading-relaxed max-w-xl">
          Nền tảng kết nối trực tiếp với hàng trăm Voice Talent chuyên nghiệp tại Việt Nam. 
          Quy trình chuẩn hoá, chi phí minh bạch, bảo vệ bản quyền âm thanh.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={onOpenBriefModal}
            className="bg-[#001f3f] text-white px-6 py-3.5 rounded-lg text-sm md:text-base font-semibold hover:bg-[#12345b] transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 group"
          >
            <span>Đăng Voice Brief</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreClick}
            className="bg-transparent border border-[#001f3f] text-[#001f3f] px-6 py-3.5 rounded-lg text-sm md:text-base font-semibold hover:bg-[#eeedf1] transition-colors cursor-pointer"
          >
            Khám phá Giọng đọc
          </button>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#c3c6cf]/30 max-w-lg">
          <div>
            <div className="text-xl font-bold text-[#001f3f] font-headline">500+</div>
            <div className="text-xs text-[#43474e]">Voice Talent tuyển chọn</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#001f3f] font-headline">12 - 24h</div>
            <div className="text-xs text-[#43474e]">Bàn giao file Master</div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#001f3f] font-headline">100%</div>
            <div className="text-xs text-[#43474e]">Bảo hộ Voice Rights</div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Card Preview matching the exact uploaded image */}
      <div className="w-full md:w-1/2">
        <div className="bg-white rounded-2xl border border-[#c3c6cf]/70 p-6 md:p-7 shadow-[0px_12px_28px_rgba(18,52,91,0.08)] relative">
          
          {/* Mockup Filter Badges */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveFilter(activeFilter === 'mien-bac' ? 'all' : 'mien-bac')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'mien-bac'
                  ? 'bg-[#001f3f] text-white'
                  : 'bg-[#c6e7ff] text-[#00658d] hover:bg-[#c6e7ff]/80'
              }`}
            >
              MIỀN BẮC
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'quang-cao' ? 'all' : 'quang-cao')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'quang-cao'
                  ? 'bg-[#001f3f] text-white'
                  : 'bg-[#c6e7ff] text-[#00658d] hover:bg-[#c6e7ff]/80'
              }`}
            >
              QUẢNG CÁO
            </button>
            <span className="text-[11px] text-[#74777f] ml-auto hidden sm:inline">
              Nhấn Play để nghe thử
            </span>
          </div>

          {/* Talent Audio Preview Cards */}
          <div className="space-y-4">
            {heroTalents.map((talent) => {
              const isThisPlaying = isPlaying && currentPlayingId === talent.id;
              const sample = talent.sampleAudios[0];

              return (
                <div
                  key={talent.id}
                  className={`bg-white rounded-xl border border-[#c3c6cf]/70 p-4 sm:p-5 flex items-center gap-4 transition-all ${
                    isThisPlaying
                      ? 'border-[#2dbcfe] shadow-[0px_8px_20px_rgba(45,188,254,0.15)] ring-1 ring-[#2dbcfe]/30'
                      : 'hover:shadow-[0px_12px_24px_rgba(18,52,91,0.08)] hover:border-[#74777f]'
                  }`}
                >
                  {/* Circular Play/Pause Button */}
                  <button
                    onClick={() => onPlayTalentAudio(talent, sample?.id)}
                    className="w-12 h-12 rounded-full bg-[#001f3f] hover:bg-[#12345b] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95 cursor-pointer"
                    title={isThisPlaying ? "Tạm dừng" : "Nghe mẫu giọng"}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    )}
                  </button>

                  {/* Name, Verified Badge, and Equalizer Bars */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <div 
                        onClick={() => onSelectTalent(talent)}
                        className="flex items-center gap-1.5 cursor-pointer hover:underline"
                      >
                        <h3 className="font-headline text-lg font-bold text-[#001f3f] truncate">
                          {talent.name}
                        </h3>
                        {talent.verified && (
                          <BadgeCheck className="w-4 h-4 text-[#2dbcfe] fill-[#2dbcfe]/20" />
                        )}
                      </div>
                      <button
                        onClick={() => onSelectTalent(talent)}
                        className="text-xs text-[#00658d] font-semibold hover:underline hidden sm:block"
                      >
                        Chi tiết
                      </button>
                    </div>

                    {/* Audio Waveform Bars (exact Sky Blue & Grey from screenshot) */}
                    <div className="flex items-end gap-1 mt-2.5 h-6">
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#2dbcfe] animate-pulse h-6' : 'bg-[#82cfff] h-6'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#2dbcfe] animate-pulse h-4' : 'bg-[#82cfff] h-4'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#2dbcfe] animate-pulse h-5' : 'bg-[#82cfff] h-5'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#82cfff] h-3' : 'bg-[#c3c6cf] h-3'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#2dbcfe] animate-pulse h-6' : 'bg-[#c3c6cf] h-6'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#82cfff] h-2' : 'bg-[#c3c6cf] h-2'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#2dbcfe] h-4' : 'bg-[#c3c6cf] h-4'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#82cfff] h-5' : 'bg-[#c3c6cf] h-2'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#2dbcfe] animate-pulse h-6' : 'bg-[#c3c6cf] h-3'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#82cfff] h-3' : 'bg-[#c3c6cf] h-1.5'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#2dbcfe] h-5' : 'bg-[#c3c6cf] h-4'}`} />
                      <div className={`w-1 rounded-sm transition-all duration-300 ${isThisPlaying ? 'bg-[#82cfff] h-4' : 'bg-[#c3c6cf] h-2.5'}`} />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#74777f] mt-1.5">
                      <span className="truncate max-w-[200px]">{sample?.title || 'Bản thu mẫu'}</span>
                      <span>{sample?.durationSec || 15}s • {talent.region}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#c3c6cf]/30 flex items-center justify-between text-xs text-[#43474e]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Hơn 48 Voice Talent đang sẵn sàng nhận job</span>
            </span>
            <button
              onClick={onExploreClick}
              className="text-[#00658d] font-bold hover:underline"
            >
              Xem tất cả &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
