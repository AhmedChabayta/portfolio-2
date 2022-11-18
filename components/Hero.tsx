import { Cursor, useTypewriter } from "react-simple-typewriter";
import hello from "../hello.json";
import { motion } from "framer-motion";
import Image from "next/image";
import me from "../me.png";
import Link from "next/link";

type Props = {};
export default function Hero({}: Props) {
  const list = hello.map((word) => word.hello);
  const [text, count] = useTypewriter({
    words: list,
    loop: true,
    delaySpeed: 1000,
  });
  return (
    <div
      id="hero"
      className="h-screen w-screen relative z-10 flex flex-col space-y-12 items-center justify-center text-center"
    >
      <h1 className="text-5xl lg:text-6xl font-semibold relative z-50 my-4 overflow-hidden">
        <span dir="auto" className="mr-3">
          {text} <Cursor cursorColor="#fff" />
        </span>
      </h1>
      <Image
        className="relative h-44 w-44 rounded-2xl object-cover"
        src={me}
        alt=""
      />
      <h2 className="text-sm uppercase text-white pb-2 tracking-[7px] leading-10 z-50 relative">
        Ahmed Chabayta <br />
        Frontend Developer
      </h2>
    </div>
  );
}
