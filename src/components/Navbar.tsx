import React, { useState } from 'react';
import { NavTab } from '../types';
import { Menu, X, Mic, PlusCircle, Bookmark, User } from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenBriefModal: () => void;
  onOpenAuthModal: () => void;
  savedCount: number;
  onOpenSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBriefModal,
  onOpenAuthModal,
  savedCount,
  onOpenSavedModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'explore', label: 'Tìm giọng' },
    { id: 'how-it-works', label: 'Cách hoạt động' },
    { id: 'enterprise', label: 'Dành cho doanh nghiệp' },
    { id: 'talents', label: 'Dành cho Voice Talent' },
    { id: 'voice-rights', label: 'Voice Rights' },
  ];

  return (
    <nav className="bg-[#faf9fd]/95 backdrop-blur-md fixed top-0 w-full z-40 border-b border-[#c3c6cf]/60">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 md:px-10 py-4">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#001f3f] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Mic className="w-4 h-4 text-[#82cfff]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#001f3f] font-headline">
            Vocalink
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-semibold transition-all py-1 cursor-pointer relative ${
                    isActive
                      ? 'text-[#001f3f] border-b-2 border-[#001f3f] pb-1'
                      : 'text-[#43474e] hover:text-[#001f3f]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {savedCount > 0 && (
            <button
              onClick={onOpenSavedModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#00658d] bg-[#c6e7ff]/40 rounded-lg hover:bg-[#c6e7ff]/70 transition-colors"
              title="Danh sách giọng đọc đã lưu"
            >
              <Bookmark className="w-3.5 h-3.5 fill-[#00658d]" />
              <span>{savedCount} đã lưu</span>
            </button>
          )}

          <button
            onClick={onOpenAuthModal}
            className="bg-transparent border border-[#001f3f] text-[#001f3f] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#eeedf1] transition-colors cursor-pointer"
          >
            Đăng nhập
          </button>
          <button
            onClick={onOpenBriefModal}
            className="bg-[#001f3f] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#12345b] transition-all shadow-sm hover:shadow cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-[#82cfff]" />
            <span>Đăng Voice Brief</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {savedCount > 0 && (
            <button
              onClick={onOpenSavedModal}
              className="p-2 text-[#00658d] bg-[#c6e7ff]/40 rounded-lg"
            >
              <Bookmark className="w-4 h-4 fill-[#00658d]" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#001f3f] hover:bg-[#eeedf1] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9fd] border-b border-[#c3c6cf] px-6 py-4 space-y-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                    activeTab === item.id
                      ? 'bg-[#d4e3ff] text-[#001f3f]'
                      : 'text-[#43474e] hover:bg-[#eeedf1]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-[#c3c6cf]/40 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAuthModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center border border-[#001f3f] text-[#001f3f] py-2.5 rounded-lg text-sm font-semibold"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => {
                onOpenBriefModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-[#001f3f] text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-[#82cfff]" />
              Đăng Voice Brief
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
