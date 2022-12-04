import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

import useCanvas from '../hooks/useCanvas';

export const Canvas = ({
  hue = 90,
  quality,
  shape,
}: {
  hue: number;
  quality: number;
  shape: string;
}) => {
  const { canvasRef, audioRef, track, isPlaying } = useCanvas(shape, quality);
  return (
    <>
      <motion.canvas
        ref={canvasRef}
        animate={{
          backgroundImage: `linear-gradient(-145deg, hsl(290,100%,65%) 0%,hsl(205,100%,65%) 100%)`,
          filter:
            shape === 'rect'
              ? `hue-rotate(${hue}deg) brightness(1.1) contrast(1.1) saturate(1.1) blur(5px)`
              : `hue-rotate(${hue}deg) brightness(1.1) contrast(1.1) saturate(1.1) `,
        }}
        transition={{
          duration: 0.7,
        }}
        className="fixed h-screen w-screen border shadow-[0px_0px_3px_3px_#ffffff_inset] will-change-auto"
      />
      <audio
        ref={audioRef}
        className="fixed bottom-0 z-10 w-screen bg-transparent"
      />

      {track.length && (
        <div
          onClick={() => {
            audioRef?.current?.paused
              ? audioRef?.current?.play()
              : audioRef?.current?.pause();
          }}
          className="fixed bottom-2 left-[20px] z-[500] cursor-pointer text-3xl font-black text-white"
        >
          {isPlaying ? (
            <PauseIcon className="w-8" />
          ) : (
            <PlayIcon className="w-8" />
          )}
        </div>
      )}
    </>
  );
};
