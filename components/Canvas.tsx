import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import useCanvas from '../hooks/useCanvas';

export const Canvas = ({
  quality,
  shape,
  colors,
}: {
  quality: number;
  shape: string;
  colors: {
    red: number;
    green: number;
    blue: number;
  };
}) => {
  const { red, green, blue } = colors;
  const { canvasRef, audioRef, track, isPlaying } = useCanvas(shape, quality);
  return (
    <>
      <motion.canvas
        ref={canvasRef}
        animate={{
          backgroundImage: `linear-gradient(${
            red > green + blue
              ? '-145deg'
              : green > red + blue
              ? '90deg'
              : '145deg'
          }, rgb(${colors.red * 2},${colors.green},${colors.blue * 2}) 0%,rgb(${
            colors.red
          },${colors.green},${colors.blue})`,
          filter:
            shape === 'rect'
              ? `brightness(1.2) contrast(1.1) saturate(1.1) blur(5px)`
              : `brightness(1.2) contrast(1.1) saturate(1.1) `,
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
        className="fixed h-screen w-screen will-change-auto"
      />
      <audio ref={audioRef} hidden className="fixed bottom-0 z-10 w-screen" />

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
