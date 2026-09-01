import React from 'react';
import { VoiceTalent } from '../types';
import { X, Bookmark, Play, Pause, Trash2, Send, BadgeCheck } from 'lucide-react';

interface SavedTalentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTalents: VoiceTalent[];
  onRemoveSaved: (talentId: string) => void;
  onSelectTalent: (talent: VoiceTalent) => void;
  onInviteTalent: (talent: VoiceTalent) => void;
  currentPlayingId: string | null;
  isPlaying: boolean;
  onPlayTalent: (talent: VoiceTalent) => void;
}

export const SavedTalentsModal: React.FC<SavedTalentsModalProps> = ({
  isOpen,
  onClose,
  savedTalents,
  onRemoveSaved,
  onSelectTalent,
  onInviteTalent,
  currentPlayingId,
  isPlaying,
  onPlayTalent
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#c3c6cf] shadow-2xl relative max-h-[80vh] flex flex-col animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-[#c3c6cf]/60">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#00658d] fill-[#00658d]" />
            <h3 className="text-lg font-bold font-headline text-[#001f3f]">
              Danh Sách Đã Lưu ({savedTalents.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#74777f] hover:text-[#001f3f] p-1 rounded-full hover:bg-[#eeedf1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 overflow-y-auto flex-grow space-y-3">
          {savedTalents.length === 0 ? (
            <div className="text-center py-10 text-[#74777f] text-sm">
              Chưa có Voice Talent nào được lưu. Bạn có thể nhấn biểu tượng bookmark ở từng thẻ giọng đọc để lưu lại.
            </div>
          ) : (
            savedTalents.map((talent) => {
              const isThisPlaying = isPlaying && currentPlayingId === talent.id;
              return (
                <div
                  key={talent.id}
                  className="p-3.5 bg-[#faf9fd] rounded-xl border border-[#c3c6cf]/60 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => onPlayTalent(talent)}
                      className="w-9 h-9 rounded-full bg-[#001f3f] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                    >
                      {isThisPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
                    </button>
                    <div className="min-w-0">
                      <div 
                        onClick={() => {
                          onClose();
                          onSelectTalent(talent);
                        }}
                        className="text-sm font-bold text-[#001f3f] truncate cursor-pointer hover:underline flex items-center gap-1"
                      >
                        <span>{talent.name}</span>
                        {talent.verified && <BadgeCheck className="w-3.5 h-3.5 text-[#2dbcfe]" />}
                      </div>
                      <div className="text-xs text-[#74777f] truncate">
                        {talent.region} • {talent.tags.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onInviteTalent(talent);
                      }}
                      className="px-3 py-1.5 bg-[#001f3f] text-white rounded-lg text-xs font-semibold hover:bg-[#12345b] cursor-pointer"
                    >
                      Mời
                    </button>
                    <button
                      onClick={() => onRemoveSaved(talent.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa khỏi đã lưu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pt-3 border-t border-[#c3c6cf]/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eeedf1] text-[#001f3f] rounded-xl text-xs font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
