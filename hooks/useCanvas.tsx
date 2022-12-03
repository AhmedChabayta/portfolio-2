import { useLayoutEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { barLengthAtom, canvasRotationAtom } from '../atoms/canvasStateAtoms';

export default function useCanvas(quality: number, shape: string) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const rotation = useRecoilValue(canvasRotationAtom);
  const barLength = useRecoilValue(barLengthAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useLayoutEffect(() => {
    if (audioRef.current && canvasRef.current) {
      setMounted(false);
      const audioCtx = new AudioContext();
      const ctx: CanvasRenderingContext2D | null =
        canvasRef.current?.getContext('2d');
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
            canvasRef!.current!.width / 2,
            canvasRef!.current!.height / 2
          );
          ctx?.rotate((Math.PI + 360 + i * 100 + rotation) / bufferLength);
          ctx!.fillStyle = `#ee00ff`;
          ctx!.globalCompositeOperation = 'exclusion';
          ctx?.fillRect(0, 0, barWidth, barHeight);
          ctx?.restore();
        }
      };

      const drawCircularVizualizer = () => {
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * barLength;
          ctx?.save();
          ctx?.translate(
            canvasRef!.current!.width / 2,
            canvasRef!.current!.height / 2
          );
          ctx?.rotate(i * bufferLength * rotation);
          ctx!.fillStyle = `#04f7fb`;
          ctx!.globalCompositeOperation = 'hue';
          ctx?.beginPath();
          ctx?.arc(
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
    }
  }, [audioRef, barLength, canvasRef, quality, rotation, shape]);
  return {
    audioRef,
    canvasRef,
    mounted,
    isPlaying,
  };
}
