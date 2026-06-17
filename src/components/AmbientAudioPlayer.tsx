import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import AmbientAudioPlayer from './components/AmbientAudioPlayer';
src/App.tsx
const AUDIO_FILE = '/audio/01-main-bgm.mp3';

export default function AmbientAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('grp-audio-enabled');

    if (saved === 'true') {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0;

    if (enabled) {
      audio.play().catch(() => {});

      let volume = 0;
      const fade = setInterval(() => {
        volume += 0.01;

        if (volume >= 0.18) {
          volume = 0.18;
          clearInterval(fade);
        }

        audio.volume = volume;
      }, 100);

      return () => clearInterval(fade);
    } else {
      let volume = audio.volume;

      const fade = setInterval(() => {
        volume -= 0.01;

        if (volume <= 0) {
          volume = 0;
          audio.pause();
          clearInterval(fade);
        }

        audio.volume = volume;
      }, 60);

      return () => clearInterval(fade);
    }
  }, [enabled]);

  const toggleAudio = () => {
    const next = !enabled;

    setEnabled(next);

    localStorage.setItem(
      'grp-audio-enabled',
      next.toString()
    );
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source
          src={AUDIO_FILE}
          type="audio/mpeg"
        />
      </audio>

      <button
        onClick={toggleAudio}
        className="
          fixed
          bottom-6
          right-6
          z-[999]
          group
          flex
          items-center
          gap-3
          rounded-full
          border
          border-[#D6B25E]/40
          bg-[#0F2E2B]/85
          backdrop-blur-xl
          px-5
          py-3
          text-[#E8F2EB]
          shadow-xl
          transition-all
          duration-300
          hover:border-[#D6B25E]
          hover:scale-105
        "
      >
        <Music
          size={18}
          className="text-[#68E3D4]"
        />

        <span className="text-sm font-medium">
          Ambient Audio
        </span>

        {enabled ? (
          <Volume2
            size={18}
            className="text-[#D6B25E]"
          />
        ) : (
          <VolumeX
            size={18}
            className="text-[#D6B25E]"
          />
        )}
      </button>
    </>
  );
}