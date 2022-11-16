import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NoSsrWrapper = dynamic(() => import("./NoSsr"), {
  ssr: false,
});

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    const ctx = canvas?.getContext("2d");
    let audioSource: any;
    let analyser: any;

    let bufferLength: number;
    let dataArray: Uint8Array;
    let barWidth: number;
    let barHeight: number;
    let x: number;
    let animationFrame: number;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 3;
            ctx?.save();

            ctx.fillStyle = `#e06c3a`;
            ctx.stroke();
            ctx?.fillRect(i * 4, canvas.height, barWidth, -barHeight);

            x -= barWidth;
            ctx?.restore();
          }
        }
      }
      window.addEventListener("resize", () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      });
    }
  }, []);

  const router = useRouter();
  return (
    <div className="overflow-hidden h-screen">
      <motion.canvas
        initial={{ filter: "hue-rotate(0deg)" }}
        animate={{ filter: "hue-rotate(360deg)" }}
        transition={{ duration: 30, repeat: Infinity }}
        ref={canvasRef}
        className="fixed w-screen h-screen z-[0] contrast-100 hue-rotate-[200deg] bg-gradient-to-br from-sky-500 to-amber-500"
      />
      <audio
        src="/On & On.mp3"
        ref={audioRef}
        className="fixed bottom-0 w-screen z-10 bg-transparent"
      />
      <NoSsrWrapper>
        {audioRef.current ? (
          <div
            onClick={() => {
              isPlaying
                ? audioRef?.current?.pause()
                : audioRef?.current?.play();
            }}
            className="fixed bottom-2 left-2 z-50 font-black text-white text-3xl cursor-pointer"
          >
            {isPlaying ? "Pause" : "Play"}
          </div>
        ) : (
          <p className="fixed bottom-0 z-50 font-black text-3xl cursor-pointer text-white">
            Loading
          </p>
        )}

        <div className="fixed right-2 bottom-0">
          <p>
            MUSIC FOR DEMO PURPOSES ONLY. I DO NOT OWN ANY OF THE MUSIC PRESENT
          </p>
        </div>

        <div className="flex flex-col top-1/2 -translate-y-1/2 fixed left-0 z-[100] w-fit h-fit">
          <Link href="#home">
            <button
              style={{
                color:
                  router.asPath === "/#home" ? "rgb(94, 234, 212)" : "#fff",
              }}
              className="heroButton"
            >
              Home
            </button>
          </Link>
          <Link href="#about">
            <button
              style={{
                color: router.asPath === "/#about" ? "rgb(94,234,212)" : "#fff",
              }}
              className="heroButton"
            >
              About
            </button>
          </Link>
          <Link href="#skills">
            <button
              style={{
                color:
                  router.asPath === "/#skills" ? "rgb(94,234,212)" : "#fff",
              }}
              className="heroButton"
            >
              Skills
            </button>
          </Link>
        </div>
      </NoSsrWrapper>
      <>{children}</>
    </div>
  );
}
