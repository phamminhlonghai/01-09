import React, { useState, useEffect, useCallback } from 'react';
import { VoiceTalent, AudioSample, NavTab, VoiceBrief } from './types';
import { INITIAL_TALENTS, INITIAL_BRIEFS } from './data/mockData';
import { audioEngine } from './services/audioEngine';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { TalentMarketplace } from './components/TalentMarketplace';
import { TalentDetailModal } from './components/TalentDetailModal';
import { WorkflowSection } from './components/WorkflowSection';
import { EnterpriseSection } from './components/EnterpriseSection';
import { VoiceTalentSection } from './components/VoiceTalentSection';
import { VoiceRightsSection } from './components/VoiceRightsSection';
import { PostBriefModal } from './components/PostBriefModal';
import { GlobalAudioPlayer } from './components/GlobalAudioPlayer';
import { AuthModal } from './components/AuthModal';
import { SavedTalentsModal } from './components/SavedTalentsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('explore');
  const [talents, setTalents] = useState<VoiceTalent[]>(INITIAL_TALENTS);
  const [briefs, setBriefs] = useState<VoiceBrief[]>(INITIAL_BRIEFS);

  // Saved Talents (Bookmarks)
  const [savedTalentIds, setSavedTalentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vocalink_saved_talents');
      return saved ? JSON.parse(saved) : ['talent-minh-anh'];
    } catch {
      return ['talent-minh-anh'];
    }
  });

  // Audio Playback State
  const [currentPlayingTalent, setCurrentPlayingTalent] = useState<VoiceTalent | null>(null);
  const [currentPlayingSample, setCurrentPlayingSample] = useState<AudioSample | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Modals
  const [selectedTalentDetail, setSelectedTalentDetail] = useState<VoiceTalent | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [preselectedTalentForBrief, setPreselectedTalentForBrief] = useState<VoiceTalent | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Sync saved talents to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vocalink_saved_talents', JSON.stringify(savedTalentIds));
    } catch (e) {
      // ignore
    }
  }, [savedTalentIds]);

  const toggleSaveTalent = (talentId: string) => {
    setSavedTalentIds(prev => 
      prev.includes(talentId) ? prev.filter(id => id !== talentId) : [...prev, talentId]
    );
  };

  // Play audio sample
  const handlePlaySample = useCallback((talent: VoiceTalent, sampleId?: string) => {
    const sample = sampleId 
      ? talent.sampleAudios.find(s => s.id === sampleId) || talent.sampleAudios[0]
      : talent.sampleAudios[0];

    if (!sample) return;

    // Toggle if same sample is already playing
    if (isPlaying && currentPlayingTalent?.id === talent.id && currentPlayingSample?.id === sample.id) {
      audioEngine.stop();
      setIsPlaying(false);
      return;
    }

    setCurrentPlayingTalent(talent);
    setCurrentPlayingSample(sample);
    setIsPlaying(true);
    setAudioProgress(0);
    setCurrentTime(0);

    audioEngine.setPlaybackRate(playbackSpeed);
    audioEngine.playSample(
      talent.id,
      sample.id,
      sample.soundType || 'warm',
      sample.durationSec,
      sample.audioFrequency || 220,
      (prog, currTime) => {
        setAudioProgress(prog);
        setCurrentTime(currTime);
      },
      () => {
        setIsPlaying(false);
        setAudioProgress(0);
        setCurrentTime(0);
      }
    );
  }, [isPlaying, currentPlayingTalent, currentPlayingSample, playbackSpeed]);

  const handleToggleGlobalPlay = () => {
    if (!currentPlayingTalent || !currentPlayingSample) return;

    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      handlePlaySample(currentPlayingTalent, currentPlayingSample.id);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    audioEngine.setPlaybackRate(speed);
  };

  const handleCloseGlobalPlayer = () => {
    audioEngine.stop();
    setIsPlaying(false);
    setCurrentPlayingTalent(null);
    setCurrentPlayingSample(null);
  };

  const handleOpenBriefForTalent = (talent: VoiceTalent) => {
    setPreselectedTalentForBrief(talent);
    setIsBriefModalOpen(true);
  };

  const handleOpenGeneralBrief = () => {
    setPreselectedTalentForBrief(null);
    setIsBriefModalOpen(true);
  };

  const handleBriefCreated = (newBrief: VoiceBrief) => {
    setBriefs(prev => [newBrief, ...prev]);
  };

  const savedTalentsList = talents.filter(t => savedTalentIds.includes(t.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fd] text-[#1a1c1e] selection:bg-[#c6e7ff] selection:text-[#001f3f]">
      {/* Fixed Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBriefModal={handleOpenGeneralBrief}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        savedCount={savedTalentIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        {/* TAB 1: TÌM GIỌNG / TRANG CHỦ */}
        {activeTab === 'explore' && (
          <>
            {/* Hero Section matching screenshot */}
            <HeroSection
              talents={talents}
              onOpenBriefModal={handleOpenGeneralBrief}
              onExploreClick={() => {
                const el = document.getElementById('marketplace-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectTalent={(t) => setSelectedTalentDetail(t)}
              currentPlayingId={currentPlayingTalent?.id || null}
              isPlaying={isPlaying}
              onPlayTalentAudio={(t, sId) => handlePlaySample(t, sId)}
            />

            {/* Trust Strip */}
            <TrustStrip />

            {/* Marketplace & Discovery Grid */}
            <TalentMarketplace
              talents={talents}
              onSelectTalent={(t) => setSelectedTalentDetail(t)}
              onInviteTalent={handleOpenBriefForTalent}
              savedTalentIds={savedTalentIds}
              onToggleSaveTalent={toggleSaveTalent}
              currentPlayingId={currentPlayingTalent?.id || null}
              currentSampleId={currentPlayingSample?.id || null}
              isPlaying={isPlaying}
              onPlaySample={handlePlaySample}
            />
          </>
        )}

        {/* TAB 2: CÁCH HOẠT ĐỘNG */}
        {activeTab === 'how-it-works' && (
          <WorkflowSection onOpenBriefModal={handleOpenGeneralBrief} />
        )}

        {/* TAB 3: DÀNH CHO DOANH NGHIỆP */}
        {activeTab === 'enterprise' && (
          <EnterpriseSection onOpenBriefModal={handleOpenGeneralBrief} />
        )}

        {/* TAB 4: DÀNH CHO VOICE TALENT */}
        {activeTab === 'talents' && (
          <VoiceTalentSection />
        )}

        {/* TAB 5: VOICE RIGHTS */}
        {activeTab === 'voice-rights' && (
          <VoiceRightsSection />
        )}
      </main>

      {/* Talent Detail Modal */}
      {selectedTalentDetail && (
        <TalentDetailModal
          talent={selectedTalentDetail}
          onClose={() => setSelectedTalentDetail(null)}
          onInviteTalent={handleOpenBriefForTalent}
          isSaved={savedTalentIds.includes(selectedTalentDetail.id)}
          onToggleSave={toggleSaveTalent}
          currentPlayingId={currentPlayingTalent?.id || null}
          currentSampleId={currentPlayingSample?.id || null}
          isPlaying={isPlaying}
          onPlaySample={handlePlaySample}
        />
      )}

      {/* Post Voice Brief Wizard Modal */}
      <PostBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        talents={talents}
        onBriefCreated={handleBriefCreated}
        preselectedTalent={preselectedTalentForBrief}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Saved Talents Modal */}
      <SavedTalentsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTalents={savedTalentsList}
        onRemoveSaved={toggleSaveTalent}
        onSelectTalent={(t) => setSelectedTalentDetail(t)}
        onInviteTalent={handleOpenBriefForTalent}
        currentPlayingId={currentPlayingTalent?.id || null}
        isPlaying={isPlaying}
        onPlayTalent={(t) => handlePlaySample(t)}
      />

      {/* Persistent Global Floating Audio Player Bar */}
      <GlobalAudioPlayer
        talent={currentPlayingTalent}
        sample={currentPlayingSample}
        isPlaying={isPlaying}
        onTogglePlay={handleToggleGlobalPlay}
        onClose={handleCloseGlobalPlayer}
        onSelectTalent={(t) => setSelectedTalentDetail(t)}
        onInviteTalent={handleOpenBriefForTalent}
        progress={audioProgress}
        currentTime={currentTime}
        onSpeedChange={handleSpeedChange}
        currentSpeed={playbackSpeed}
      />

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBriefModal={handleOpenGeneralBrief}
      />
    </div>
  );
}
