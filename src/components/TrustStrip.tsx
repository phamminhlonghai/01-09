import React from 'react';
import { Megaphone, GraduationCap, Gamepad2, Radio, BookOpen, Film } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const industries = [
    { label: 'AGENCY', icon: Megaphone },
    { label: 'EDTECH', icon: GraduationCap },
    { label: 'GAME', icon: Gamepad2 },
    { label: 'PODCAST', icon: Radio },
    { label: 'AUDIOBOOK', icon: BookOpen },
    { label: 'FILM & TVC', icon: Film },
  ];

  return (
    <section className="bg-[#f4f3f7] py-7 border-y border-[#c3c6cf]/60">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex justify-center items-center gap-6 sm:gap-10 md:gap-14 flex-wrap opacity-75">
          {industries.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#43474e] tracking-wider uppercase hover:text-[#001f3f] transition-colors"
              >
                <Icon className="w-4 h-4 text-[#00658d]" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
