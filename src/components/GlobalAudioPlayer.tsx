import React, { useState } from 'react';
import { VoiceTalent, AudioSample } from '../types';
import { Play, Pause, Volume2, VolumeX, X, BadgeCheck, Send, Gauge } from 'lucide-react';

interface GlobalAudioPlayerProps {
  talent: VoiceTalent | null;
  sample: AudioSample | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onSelectTalent: (talent: VoiceTalent) => void;
  onInviteTalent: (talent: VoiceTalent) => void;
  progress: number;
  currentTime: number;
  onSpeedChange: (speed: number) => void;
  currentSpeed: number;
}

export const GlobalAudioPlayer: React.FC<GlobalAudioPlayerProps> = ({
  talent,
  sample,
  isPlaying,
  onTogglePlay,
  onClose,
  onSelectTalent,
  onInviteTalent,
  progress,
  currentTime,
  onSpeedChange,
  currentSpeed
}) => {
  const [muted, setMuted] = useState(false);
  const speeds = [0.75, 1.0, 1.25, 1.5];

  if (!talent || !sample) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNextSpeed = () => {
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    onSpeedChange(speeds[nextIndex]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#001f3f] text-white border-t border-[#12345b] shadow-2xl px-4 md:px-8 py-3 animate-in slide-in-from-bottom duration-200">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Talent & Sample Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-[280px] sm:max-w-sm">
          <img
            src={talent.avatar}
            alt={talent.name}
            onClick={() => onSelectTalent(talent)}
            className="w-11 h-11 rounded-full object-cover border border-white/20 shrink-0 cursor-pointer hover:opacity-80"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 
                onClick={() => onSelectTalent(talent)}
                className="text-xs sm:text-sm font-bold truncate cursor-pointer hover:underline text-white font-headline"
              >
                {talent.name}
              </h4>
              {talent.verified && (
                <BadgeCheck className="w-3.5 h-3.5 text-[#82cfff] shrink-0" />
              )}
            </div>
            <div className="text-[11px] text-[#82cfff] truncate font-medium">
              {sample.title}
            </div>
          </div>
        </div>

        {/* Center: Controls & Waveform Progress */}
        <div className="flex flex-col items-center flex-grow max-w-xl px-2">
          <div className="flex items-center gap-4 mb-1">
            {/* Speed toggle */}
            <button
              onClick={handleNextSpeed}
              className="text-[10px] font-bold text-white/80 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              title="Tốc độ phát"
            >
              {currentSpeed}x
            </button>

            {/* Play/Pause */}
            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-white text-[#001f3f] hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-[#001f3f]" />
              ) : (
                <Play className="w-4 h-4 fill-[#001f3f] translate-x-0.5" />
              )}
            </button>

            <span className="text-[10px] text-white/60 font-mono hidden sm:inline">
              {formatTime(currentTime)} / {formatTime(sample.durationSec)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden relative">
            <div
              className="bg-[#2dbcfe] h-full transition-all duration-100"
              style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
            />
          </div>
        </div>

        {/* Right: Booking CTA & Close */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onInviteTalent(talent)}
            className="px-3.5 py-1.5 bg-[#2dbcfe] text-[#001e2d] hover:bg-[#82cfff] rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đặt Giọng Này</span>
            <span className="sm:hidden">Đặt</span>
          </button>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Đóng trình phát"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
