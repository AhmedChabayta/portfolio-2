import { forwardRef, useLayoutEffect, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { onAndOn } from '../assets/music';
import { motion } from 'framer-motion';
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export const Canvas = forwardRef(
  ({
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

    useLayoutEffect(() => {
      setMounted(false);
      const AudioCtx = AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      const ctx: CanvasRenderingContext2D =
        canvasRef?.current?.getContext('2d');
      ctx.filter = 'brightness(200)';
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
      if (audioRef.current && canvasRef.current) {
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
      }

      const drawVisualizer = () => {
        for (let i = 0; i < bufferLength; Math.floor(i++)) {
          barHeight = dataArray[i] * 3;
          ctx.fillStyle = `#ee00ff`;
          ctx.strokeStyle = '#26ff00';
          ctx.stroke();
          ctx.strokeRect(i * 2, canvasRef.current.height, barWidth, -barHeight);
          ctx.fillRect(
            i * 3,
            canvasRef.current.height,
            barWidth + 2,
            -barHeight + 2
          );
        }
      };

      const drawCircularVizualizer = () => {
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * 2;
          ctx?.save();
          ctx?.translate(
            canvasRef.current.width / 2,
            canvasRef.current.height / 2
          );
          ctx?.rotate(
            (i * 0.1 * Math.PI * (quality > 4000 ? 128 : 64)) / bufferLength
          );
          ctx.fillStyle = '#ff00d9';
          ctx.shadowColor = 'red';
          ctx.globalCompositeOperation = 'luminosity';
          ctx?.beginPath();
          ctx.arc(
            i / 4 + barHeight / 2,
            i / 4 + barHeight / 2,
            15,
            i * 2,
            2 * Math.PI,
            true
          );
          ctx?.fill();
          ctx?.restore();
        }
      };
      window.addEventListener('resize', () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
      });
    }, [audioRef, canvasRef, quality, shape]);

    return (
      <>
        <canvas
          ref={canvasRef}
          className="fixed w-screen h-screen will-change-auto "
        />
        <audio
          src={onAndOn}
          ref={audioRef}
          className="fixed bottom-0 w-screen z-10 bg-transparent"
        />
        <motion.div
          animate={{
            backgroundImage: `linear-gradient(145deg, rgba(100,0,151,0.6) 0%, rgba(255,0,0,0.6) 100%)`,
            filter: `hue-rotate(${hue}deg)`,
          }}
          transition={{
            duration: hue / 100,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          style={{
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            position: 'fixed',
            zIndex: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: '100vh',
            width: '100vw',
          }}
        />

        {mounted ? (
          <div
            onClick={() => {
              isPlaying
                ? audioRef?.current?.pause()
                : audioRef?.current?.play();
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
);
Canvas.displayName = 'Canvas';
