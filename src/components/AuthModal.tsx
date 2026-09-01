import React, { useState } from 'react';
import { X, Building2, Mic, CheckCircle2, Lock, Mail, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'client' | 'talent'>('client');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 border border-[#c3c6cf] shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#74777f] hover:text-[#001f3f] p-1.5 rounded-full hover:bg-[#eeedf1]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-headline text-[#001f3f]">
            {mode === 'login' ? 'Đăng Nhập Vocalink' : 'Tạo Tài Khoản Mới'}
          </h2>
          <p className="text-xs text-[#43474e] mt-1">
            Nền tảng Voice Talent chuyên nghiệp hàng đầu Việt Nam
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#faf9fd] border border-[#c3c6cf] rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              role === 'client'
                ? 'bg-[#001f3f] text-white shadow-xs'
                : 'text-[#43474e] hover:text-[#001f3f]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Doanh nghiệp / Thuê giọng</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('talent')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              role === 'talent'
                ? 'bg-[#001f3f] text-white shadow-xs'
                : 'text-[#43474e] hover:text-[#001f3f]'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Talent / Nghệ sĩ</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-[#001f3f]">
              {mode === 'login' ? 'Đăng nhập thành công!' : 'Đăng ký thành công!'}
            </h4>
            <p className="text-xs text-[#43474e]">Chào mừng bạn trở lại với Vocalink.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#43474e] mb-1">Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#74777f] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#43474e] mb-1">Mật khẩu *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#74777f] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9fd] border border-[#c3c6cf] rounded-lg focus:outline-none focus:border-[#00658d]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#001f3f] text-white hover:bg-[#12345b] rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{mode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-xs text-[#74777f] pt-2">
              {mode === 'login' ? (
                <>
                  Chưa có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-[#00658d] font-bold hover:underline"
                  >
                    Đăng ký ngay
                  </button>
                </>
              ) : (
                <>
                  Đã có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#00658d] font-bold hover:underline"
                  >
                    Đăng nhập
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
