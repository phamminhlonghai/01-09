import React, { useState, useMemo } from 'react';
import { VoiceTalent, Gender, Region, ProjectCategory } from '../types';
import { Search, Filter, Play, Pause, BadgeCheck, Star, Bookmark, Clock, ArrowUpDown, SlidersHorizontal, Check, Mic2, Sparkles } from 'lucide-react';

interface TalentMarketplaceProps {
  talents: VoiceTalent[];
  onSelectTalent: (talent: VoiceTalent) => void;
  onInviteTalent: (talent: VoiceTalent) => void;
  savedTalentIds: string[];
  onToggleSaveTalent: (talentId: string) => void;
  currentPlayingId: string | null;
  currentSampleId: string | null;
  isPlaying: boolean;
  onPlaySample: (talent: VoiceTalent, sampleId: string) => void;
}

export const TalentMarketplace: React.FC<TalentMarketplaceProps> = ({
  talents,
  onSelectTalent,
  onInviteTalent,
  savedTalentIds,
  onToggleSaveTalent,
  currentPlayingId,
  currentSampleId,
  isPlaying,
  onPlaySample
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'completed'>('rating');
  const [selectedSampleMap, setSelectedSampleMap] = useState<Record<string, string>>({});

  const categories = [
    'Tất cả thể loại',
    'Quảng cáo TVC',
    'Sách nói (Audiobook)',
    'Podcast & Radio',
    'Game & Trailer',
    'EdTech & E-Learning',
    'Thuyết minh Tài liệu',
    'Tổng đài IVR & Trợ lý ảo AI'
  ];

  const filteredTalents = useMemo(() => {
    return talents.filter((talent) => {
      // Search term match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = talent.name.toLowerCase().includes(query);
        const matchesBio = talent.bio.toLowerCase().includes(query);
        const matchesTags = talent.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesSamples = talent.sampleAudios.some(s => s.title.toLowerCase().includes(query) || s.tone.toLowerCase().includes(query));
        if (!matchesName && !matchesBio && !matchesTags && !matchesSamples) {
          return false;
        }
      }

      // Region filter
      if (selectedRegion !== 'all' && talent.region !== selectedRegion) {
        return false;
      }

      // Gender filter
      if (selectedGender !== 'all' && talent.gender !== selectedGender) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && selectedCategory !== 'Tất cả thể loại') {
        const hasCategory = talent.sampleAudios.some(s => s.category === selectedCategory) ||
          talent.tags.includes(selectedCategory);
        if (!hasCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.basePricePerMinute - b.basePricePerMinute;
      if (sortBy === 'price-desc') return b.basePricePerMinute - a.basePricePerMinute;
      if (sortBy === 'completed') return b.completedProjects - a.completedProjects;
      return 0;
    });
  }, [talents, searchTerm, selectedRegion, selectedGender, selectedCategory, sortBy]);

  const formatPrice = (vnd: number) => {
    return new Intl.NumberFormat('vi-VN').format(vnd) + ' đ/phút';
  };

  return (
    <section id="marketplace-section" className="max-w-[1280px] mx-auto px-6 md:px-10 py-12">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-bold text-[#00658d] uppercase tracking-wider mb-1">
            MARKETPLACE VOICE TALENT
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#001f3f] font-headline">
            Khám phá Danh bạ Giọng đọc Chuyên nghiệp
          </h2>
          <p className="text-sm text-[#43474e] mt-1">
            Lọc theo chất giọng, vùng miền, phong cách đọc và nghe thử kịch bản trực tiếp.
          </p>
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs text-[#74777f]">
            Tìm thấy <strong className="text-[#001f3f]">{filteredTalents.length}</strong> Voice Talent
          </span>
          <div className="flex items-center gap-1.5 bg-white border border-[#c3c6cf] rounded-lg px-3 py-1.5 text-xs text-[#001f3f]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#00658d]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer"
            >
              <option value="rating">Đánh giá cao nhất</option>
              <option value="completed">Nhiều dự án hoàn thành</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-xl border border-[#c3c6cf] p-4 md:p-5 shadow-sm mb-8 space-y-4">
        {/* Search row */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#74777f]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên Voice Talent, thể loại (TVC, Sách nói, Trailer...), từ khóa (trầm ấm, năng động, chuẩn Hà Nội)..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#faf9fd] border border-[#c3c6cf] rounded-lg text-sm focus:outline-none focus:border-[#00658d] focus:ring-1 focus:ring-[#00658d]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#74777f] hover:text-[#001f3f]"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Filter Badges & Selectors */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* Region Filter */}
          <div className="flex items-center gap-1 bg-[#faf9fd] border border-[#c3c6cf] rounded-lg p-1">
            <span className="text-[11px] font-bold text-[#74777f] px-2">Vùng miền:</span>
            {['all', 'Miền Bắc', 'Miền Nam', 'Miền Trung'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#001f3f] text-white shadow-xs'
                    : 'text-[#43474e] hover:bg-[#eeedf1]'
                }`}
              >
                {reg === 'all' ? 'Tất cả' : reg}
              </button>
            ))}
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-1 bg-[#faf9fd] border border-[#c3c6cf] rounded-lg p-1">
            <span className="text-[11px] font-bold text-[#74777f] px-2">Giới tính:</span>
            {['all', 'Nữ', 'Nam'].map((gen) => (
              <button
                key={gen}
                onClick={() => setSelectedGender(gen)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedGender === gen
                    ? 'bg-[#001f3f] text-white shadow-xs'
                    : 'text-[#43474e] hover:bg-[#eeedf1]'
                }`}
              >
                {gen === 'all' ? 'Tất cả' : gen}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1 bg-[#faf9fd] border border-[#c3c6cf] rounded-lg px-2.5 py-1.5 text-xs text-[#001f3f]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00658d]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {(selectedRegion !== 'all' || selectedGender !== 'all' || selectedCategory !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedGender('all');
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="text-xs text-rose-600 font-semibold hover:underline px-2 py-1 ml-auto"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Talent Cards Grid */}
      {filteredTalents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#c3c6cf] p-8">
          <Mic2 className="w-12 h-12 text-[#74777f] mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-bold text-[#001f3f] mb-1">Không tìm thấy Voice Talent phù hợp</h3>
          <p className="text-sm text-[#43474e] max-w-md mx-auto mb-4">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc bỏ bớt các tiêu chí lọc vùng miền, thể loại.
          </p>
          <button
            onClick={() => {
              setSelectedRegion('all');
              setSelectedGender('all');
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="bg-[#001f3f] text-white px-4 py-2 rounded-lg text-xs font-semibold"
          >
            Xem tất cả giọng đọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTalents.map((talent) => {
            const isSaved = savedTalentIds.includes(talent.id);
            const activeSampleId = selectedSampleMap[talent.id] || talent.sampleAudios[0]?.id;
            const currentSample = talent.sampleAudios.find(s => s.id === activeSampleId) || talent.sampleAudios[0];
            const isThisSamplePlaying = isPlaying && currentPlayingId === talent.id && currentSampleId === currentSample?.id;

            return (
              <div
                key={talent.id}
                className="bg-white rounded-xl border border-[#c3c6cf]/80 p-5 shadow-sm hover:shadow-[0px_12px_24px_rgba(18,52,91,0.08)] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="relative cursor-pointer" onClick={() => onSelectTalent(talent)}>
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Đang online sẵn sàng nhận job" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => onSelectTalent(talent)}
                          className="flex items-center gap-1.5 cursor-pointer hover:underline"
                        >
                          <h3 className="font-headline text-lg font-bold text-[#001f3f]">
                            {talent.name}
                          </h3>
                          {talent.verified && (
                            <BadgeCheck className="w-4 h-4 text-[#2dbcfe] fill-[#2dbcfe]/20" />
                          )}
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={() => onToggleSaveTalent(talent.id)}
                          className="text-[#74777f] hover:text-[#00658d] p-1.5 rounded-lg hover:bg-[#faf9fd] transition-colors cursor-pointer"
                          title={isSaved ? "Bỏ lưu" : "Lưu Voice Talent"}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#00658d] text-[#00658d]' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs text-[#43474e] line-clamp-1 mt-0.5">
                        {talent.title}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-[#74777f] mt-1.5">
                        <span className="flex items-center gap-1 font-semibold text-[#001f3f]">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {talent.rating}
                          <span className="text-[#74777f] font-normal">({talent.reviewCount})</span>
                        </span>
                        <span>•</span>
                        <span>{talent.completedProjects} dự án</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-[#eeedf1] text-[#001f3f] font-semibold text-[10px]">
                          {talent.region}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sample Tabs for this Talent */}
                  <div className="mb-3">
                    <div className="text-[11px] font-bold text-[#74777f] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Mẫu giọng thu thử</span>
                      <span className="text-[#00658d] font-normal">{talent.sampleAudios.length} mẫu</span>
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {talent.sampleAudios.map((sample) => (
                        <button
                          key={sample.id}
                          onClick={() => setSelectedSampleMap(prev => ({ ...prev, [talent.id]: sample.id }))}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                            currentSample?.id === sample.id
                              ? 'bg-[#c6e7ff] text-[#001e2d] font-bold'
                              : 'bg-[#faf9fd] text-[#43474e] hover:bg-[#eeedf1]'
                          }`}
                        >
                          {sample.category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audio Player Strip */}
                  <div className="bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60 p-3.5 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Play Button */}
                      <button
                        onClick={() => onPlaySample(talent, currentSample.id)}
                        className="w-10 h-10 rounded-full bg-[#001f3f] hover:bg-[#12345b] text-white flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-transform cursor-pointer"
                        title={isThisSamplePlaying ? "Tạm dừng" : "Nghe mẫu này"}
                      >
                        {isThisSamplePlaying ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                        )}
                      </button>

                      {/* Info & Live Waveform */}
                      <div className="flex-grow min-w-0">
                        <div className="text-xs font-bold text-[#001f3f] truncate">
                          {currentSample?.title}
                        </div>
                        <div className="text-[11px] text-[#74777f] truncate mt-0.5">
                          Tone: {currentSample?.tone} • {currentSample?.durationSec}s
                        </div>

                        {/* Equalizer Bars */}
                        <div className="flex items-end gap-1 mt-2 h-4">
                          {(currentSample?.waveformData || [4, 7, 9, 5, 8, 6, 9, 3, 5, 8, 10, 6]).map((val, idx) => (
                            <div
                              key={idx}
                              style={{ height: `${Math.min(16, val * 1.6)}px` }}
                              className={`w-1 rounded-xs transition-all ${
                                isThisSamplePlaying
                                  ? 'bg-[#00658d] animate-sound-wave'
                                  : idx < 4
                                  ? 'bg-[#82cfff]'
                                  : 'bg-[#c3c6cf]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Script Snippet Preview */}
                    <div className="mt-2.5 pt-2 border-t border-[#c3c6cf]/40 text-[11px] text-[#43474e] italic line-clamp-1">
                      "{currentSample?.scriptSnippet}"
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {talent.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-[#f4f3f7] text-[#43474e]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & Actions */}
                <div className="pt-3 border-t border-[#c3c6cf]/40 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-[#74777f] uppercase font-bold tracking-wider">
                      Giá khởi điểm
                    </div>
                    <div className="text-sm font-bold text-[#001f3f]">
                      {formatPrice(talent.basePricePerMinute)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectTalent(talent)}
                      className="px-3 py-1.5 border border-[#c3c6cf] text-[#001f3f] hover:bg-[#faf9fd] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Xem hồ sơ
                    </button>
                    <button
                      onClick={() => onInviteTalent(talent)}
                      className="px-3.5 py-1.5 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Mời dự án
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
