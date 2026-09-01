import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../data/mockData';
import { CheckCircle2, ArrowRight, Shield, Clock, FileCheck, Award, HelpCircle } from 'lucide-react';

interface WorkflowSectionProps {
  onOpenBriefModal: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onOpenBriefModal }) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#00658d] uppercase tracking-wider bg-[#c6e7ff]/40 px-3 py-1 rounded-full">
          QUY TRÌNH CHUẨN HÓA 5 BƯỚC
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#001f3f] font-headline mt-3 mb-4">
          Cách Vocalink Hoạt Động
        </h2>
        <p className="text-base text-[#43474e] leading-relaxed">
          Đơn giản hóa việc casting và sản xuất giọng đọc chuyên nghiệp. 
          Tiết kiệm đến 70% thời gian tìm kiếm và đảm bảo 100% quyền sở hữu thương mại.
        </p>
      </div>

      {/* Horizontal Progress Timeline */}
      <div className="relative mb-12 hidden lg:block">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#c3c6cf]/40 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[#001f3f] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((activeStep - 1) / 4) * 100}%` }}
        />

        <div className="relative z-10 flex justify-between">
          {WORKFLOW_STEPS.map((s) => {
            const isCompleted = s.step < activeStep;
            const isCurrent = s.step === activeStep;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isCurrent
                      ? 'bg-[#001f3f] text-white ring-4 ring-[#82cfff]/40 shadow-md scale-110'
                      : isCompleted
                      ? 'bg-[#2dbcfe] text-white shadow-xs'
                      : 'bg-white border-2 border-[#c3c6cf] text-[#74777f] group-hover:border-[#001f3f]'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : `0${s.step}`}
                </div>
                <span className={`text-xs font-bold mt-2.5 max-w-[130px] text-center ${
                  isCurrent ? 'text-[#001f3f]' : 'text-[#74777f]'
                }`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
        {WORKFLOW_STEPS.map((step) => {
          const isCurrent = step.step === activeStep;
          return (
            <div
              key={step.step}
              onClick={() => setActiveStep(step.step)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-[#001f3f] ring-2 ring-[#001f3f]/10 shadow-[0px_12px_24px_rgba(18,52,91,0.08)]'
                  : 'bg-[#faf9fd] border-[#c3c6cf]/60 hover:bg-white hover:border-[#74777f]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isCurrent ? 'bg-[#001f3f] text-white' : 'bg-[#eeedf1] text-[#43474e]'
                  }`}>
                    {step.step}
                  </span>
                  <span className="text-[11px] font-semibold text-[#00658d] bg-[#c6e7ff]/40 px-2.5 py-0.5 rounded-full">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-lg text-[#001f3f] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#43474e] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#c3c6cf]/40 flex items-center gap-2 text-xs font-semibold text-[#001f3f]">
                <Award className="w-4 h-4 text-[#00658d]" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to action bar */}
      <div className="bg-gradient-to-r from-[#001f3f] to-[#12345b] rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold font-headline">Bạn có sẵn kịch bản và cần tìm giọng ngay hôm nay?</h3>
          <p className="text-white/80 text-sm max-w-xl">
            Đăng Voice Brief miễn phí để nhận các bản thu thử demo 15s trực tiếp từ các Voice Talent hàng đầu.
          </p>
        </div>
        <button
          onClick={onOpenBriefModal}
          className="bg-white text-[#001f3f] hover:bg-[#faf9fd] px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
        >
          <span>Đăng Voice Brief Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
