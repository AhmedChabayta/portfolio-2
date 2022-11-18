import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
export default function Canvas() {
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvas = canvasRef.current;
  const audio = audioRef.current;

  useEffect(() => {
    if (typeof canvas != null && typeof audio != null) {
      const ctx = canvas?.getContext("2d");
      let audioSource: any;
      let analyser: any;
      let bufferLength: number;
      let dataArray: Uint8Array;
      let barWidth: number;
      let barHeight: number;
      let x: number;
      let animationFrame: number;
      let audioCtx: any;
      if (typeof audioCtx != null) {
        audioCtx = new (AudioContext || window.webkitAudioContext)();
      }

      if (audio && canvas) {
        audio.volume = 0.5;
        audioSource = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 1024 * 2;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        barWidth = 10;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function animate() {
          if (canvas) {
            x = 0;
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            drawVisualizer();
            animationFrame = requestAnimationFrame(animate);
          }
        }
        audio.addEventListener("play", () => {
          cancelAnimationFrame(animationFrame);
          animate();
          audioCtx.resume();
          setIsPlaying(true);
        });
        audio.addEventListener("pause", () => {
          setIsPlaying(false);
          cancelAnimationFrame(animationFrame);
          audioCtx.suspend();
        });

        function drawVisualizer() {
          if (ctx && canvas) {
            for (let i = 0; i < bufferLength; Math.floor(i++)) {
              barHeight = dataArray[i] * 4;
              ctx.fillStyle = "#ff00d9";
              ctx.strokeStyle = "#fff";
              ctx.fillRect(i * 3, canvas.height, barWidth, -barHeight);
              ctx.stroke();
              x -= barWidth;
            }
          }
        }
        window.addEventListener("resize", () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
      }
    }
  }, [canvas, audio]);
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed w-screen h-screen contrast-200"
      />
      <audio
        src="/On & On.mp3"
        ref={audioRef}
        className="fixed bottom-0 w-screen z-10 bg-transparent"
      />
      <div className="fixed z-1 top-0 bottom-0 left-0 right-0 h-screen w-screen bg-gradient-to-br from-fuchsia-500/70 to-orange-500/70 backdrop-blur-xl overflow-hidden" />

      {typeof audio != null && typeof canvas ? (
        <div
          onClick={() => {
            isPlaying ? audioRef?.current?.pause() : audioRef?.current?.play();
          }}
          className="fixed bottom-2 left-2 z-[500] font-black text-white text-3xl cursor-pointer"
        >
          {isPlaying ? "Pause" : "Play"}
        </div>
      ) : (
        <p className="fixed bottom-0 z-50 font-black text-3xl cursor-pointer text-white">
          Loading
        </p>
      )}

      <div className="fixed right-2 bottom-0 max-w-xs lg:max-w-none text-gray-200/40">
        <p>
          MUSIC FOR DEMO PURPOSES ONLY. I DO NOT OWN ANY OF THE MUSIC PRESENT
        </p>
      </div>
    </>
  );
}
