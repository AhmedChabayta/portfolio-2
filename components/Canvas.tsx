import { useLayoutEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
export default function Canvas({
  hue,
  quality,
  shape,
}: {
  hue: number;
  quality: number;
  shape: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window !== 'undefined' &&
      audioRef.current &&
      canvasRef.current
    ) {
      console.log(typeof window);
      setMounted(false);

      setMounted(true);
      const AudioCtx = AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      const ctx: CanvasRenderingContext2D | null | undefined =
        canvasRef?.current?.getContext('2d');

      const audioSource: MediaElementAudioSourceNode =
        audioCtx.createMediaElementSource(audioRef.current);

      const analyser: AnalyserNode = audioCtx.createAnalyser();
      const bufferLength: number = analyser.frequencyBinCount;
      const dataArray: Uint8Array = new Uint8Array(bufferLength);

      let barWidth: number = 10;
      let barHeight: number;
      let animationFrame: number;

      audioRef.current.volume = 0.5;
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = quality || 64;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      const animate = () => {
        if (canvasRef.current) {
          ctx?.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
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
      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
        cancelAnimationFrame(animationFrame);
        audioCtx.suspend();
      });

      const drawVisualizer = () => {
        if (ctx && canvasRef.current) {
          for (let i = 0; i < bufferLength; Math.floor(i++)) {
            barHeight = dataArray[i] * 4;

            ctx.fillStyle = '#ff00d9';
            ctx.strokeStyle = '#fff';
            ctx.fillRect(
              quality <= 64
                ? i * 100
                : quality > 1000
                ? i * 20
                : quality > 2000
                ? i * 2
                : i,
              canvasRef.current.height,
              barWidth,
              -barHeight
            );
            ctx.stroke();
          }
        }
      };

      const drawCircularVizualizer = () => {
        if (canvasRef.current && ctx) {
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2;
            ctx?.save();
            ctx?.translate(
              canvasRef.current.width / 2,
              canvasRef.current.height / 2
            );
            ctx?.rotate((i * (Math.PI * 8)) / bufferLength);
            ctx.fillStyle = '#ff00d9';
            ctx?.beginPath();
            ctx?.arc(barWidth, barHeight * 2, i / 10, i, 2 * Math.PI);
            ctx?.fill();
            ctx?.restore();
          }
        }
      };
      window.addEventListener('resize', () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
      });
    }
  }, [quality, shape]);
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed w-screen h-screen will-change-auto"
      />
      <audio
        src="/On & On.mp3"
        ref={audioRef}
        className="fixed bottom-0 w-screen z-10 bg-transparent"
      />
      <div
        style={{
          filter: `contrast(2) hue-rotate(${hue}deg)`,
          backdropFilter: 'blur(24px)',
        }}
        className={`wallpaper fixed z-1 top-0 bottom-0 left-0 right-0 h-screen w-screen
        bg-gradient-to-br from-fuchsia-500/70 to-orange-500/70 overflow-hidden`}
      />

      {mounted ? (
        <div
          onClick={() => {
            isPlaying ? audioRef?.current?.pause() : audioRef?.current?.play();
          }}
          className="fixed bottom-2 left-2 z-[500] font-black text-white text-3xl cursor-pointer"
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
      <div className="fixed right-2 bottom-0 max-w-xs lg:max-w-none text-gray-200/40">
        <p>
          MUSIC FOR DEMO PURPOSES ONLY. I DO NOT OWN ANY OF THE MUSIC PRESENT
        </p>
      </div>
    </>
  );
}
