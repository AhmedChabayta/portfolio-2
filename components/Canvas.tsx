import { useLayoutEffect, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { onAndOn } from '../assets/music';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { barLengthAtom, canvasRotationAtom } from '../atoms/canvasStateAtoms';
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export const Canvas = ({
  hue = 90,
  quality,
  shape,
  canvasRef,
  audioRef,
}: {
  hue: number;
  quality: number;
  shape: string;
  canvasRef: any;
  audioRef: any;
}) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const rotation = useRecoilValue(canvasRotationAtom);
  const barLength = useRecoilValue(barLengthAtom);

  useLayoutEffect(() => {
    setMounted(false);
    const AudioCtx = AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    const ctx: CanvasRenderingContext2D = canvasRef?.current?.getContext('2d');
    const audioSource: MediaElementAudioSourceNode =
      audioCtx.createMediaElementSource(audioRef.current);
    const analyser: AnalyserNode = audioCtx.createAnalyser();
    const bufferLength: number = analyser.frequencyBinCount;
    const dataArray: Uint8Array = new Uint8Array(bufferLength);
    let barWidth: number = 2;
    let barHeight: number;
    let animationFrame: number;
    audioRef.current.volume = 0.5;
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = quality || 128;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    setMounted(true);
    const animate = () => {
      if (canvasRef.current && audioRef.current) {
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        analyser.getByteFrequencyData(dataArray);
        shape === 'rect' ? drawVisualizer() : drawCircularVizualizer();
        animationFrame = requestAnimationFrame(animate);
      }
    };

    audioRef.current.addEventListener('play', () => {
      cancelAnimationFrame(animationFrame);
      animate();
      audioCtx.resume();
      setIsPlaying(true);
    });
    audioRef.current.removeEventListener('play', () => {
      cancelAnimationFrame(animationFrame);
      animate();
      audioCtx.resume();
      setIsPlaying(true);
    });
    audioRef.current.addEventListener('pause', () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationFrame);
      audioCtx.suspend();
    });
    audioRef.current.addEventListener('pause', () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationFrame);
      audioCtx.suspend();
    });

    const drawVisualizer = () => {
      for (let i = 0; i < bufferLength; Math.floor(i++)) {
        barHeight = dataArray[i] * barLength;
        ctx?.save();
        ctx?.translate(
          canvasRef.current.width / 2,
          canvasRef.current.height / 2
        );
        ctx?.rotate((Math.PI + 360 + i * 100 + rotation) / bufferLength);
        ctx.fillStyle = `#ee00ff`;
        ctx.globalCompositeOperation = 'exclusion';
        ctx.fillRect(0, 0, barWidth, barHeight);
        ctx?.restore();
      }
    };

    const drawCircularVizualizer = () => {
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * barLength;
        ctx?.save();
        ctx?.translate(
          canvasRef.current.width / 2,
          canvasRef.current.height / 2
        );
        ctx?.rotate(i * bufferLength * rotation);
        ctx.fillStyle = `#04f7fb`;
        ctx.globalCompositeOperation = 'hue';
        ctx?.beginPath();
        ctx.arc(
          i / 4 + barHeight / 2,
          i / 4 + barHeight / 2,
          barWidth * 2,
          i * 2,
          2 * Math.PI,
          true
        );
        ctx?.fill();
        ctx?.restore();
      }
    };
    window.addEventListener('resize', () => {
      if (canvasRef.current && audioRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    });
  }, [audioRef, barLength, canvasRef, quality, rotation, shape]);
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
        src={onAndOn}
        ref={audioRef}
        className="fixed bottom-0 z-10 w-screen bg-transparent"
      />

      {mounted ? (
        <div
          onClick={() => {
            isPlaying ? audioRef?.current?.pause() : audioRef?.current?.play();
          }}
          className="fixed bottom-2 left-[20px] z-[500] cursor-pointer text-3xl font-black text-white"
        >
          {isPlaying ? (
            <PauseIcon className="w-8" />
          ) : (
            <PlayIcon className="w-8" />
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
