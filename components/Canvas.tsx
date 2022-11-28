import { useLayoutEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';


declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
export default function Canvas({
  hue = 0,
  quality,
  shape,
}: {
  hue?: number;
  quality: number;
  shape: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useLayoutEffect(() => {
    setMounted(false);
    if (canvasRef.current != null && audioRef.current != null) {
      setMounted(true);
      const canvas = canvasRef.current;
      const audio = audioRef.current;
      const ctx = canvas?.getContext('2d');
      let audioSource: MediaElementAudioSourceNode;
      let analyser: AnalyserNode;
      let bufferLength: number;
      let dataArray: Uint8Array;
      let barWidth: number;
      let barHeight: number;
      let animationFrame: number;
      let audioCtx: AudioContext;

      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      audio.volume = 0.5;
      audioSource = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = quality || 64;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      barWidth = 10;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const animate = () => {
        if (canvas) {
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          analyser.getByteFrequencyData(dataArray);
          shape === 'rect' ? drawVisualizer() : drawCircularVizualizer();
          animationFrame = requestAnimationFrame(animate);
        }
      };
      audio.addEventListener('play', () => {
        cancelAnimationFrame(animationFrame);
        animate();
        audioCtx.resume();
        setIsPlaying(true);
      });
      audio.addEventListener('pause', () => {
        setIsPlaying(false);
        cancelAnimationFrame(animationFrame);
        audioCtx.suspend();
      });

      const drawVisualizer = () => {
        if (ctx && canvas) {
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
              canvas.height,
              barWidth,
              -barHeight
            );
            ctx.stroke();
          }
        }
      };

      const drawCircularVizualizer = () => {
        if (ctx && canvas) {
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((i * (Math.PI * 64)) / bufferLength);
            ctx.fillStyle = '#ff00d9';
            ctx.beginPath();
            ctx.arc(barWidth, barHeight * 2, i / 10, i, 2 * Math.PI, true);
            ctx.fill();
            ctx.restore();
          }
        }
      };
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    }
  }, [quality, shape, mounted]);
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
