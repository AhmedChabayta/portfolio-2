import { Cursor, useTypewriter } from 'react-simple-typewriter';
import hello from '../hello.json';
import Image from 'next/image';
import me from '../me.png';

export default function Hero() {
  const list = hello.map((word) => word.hello);
  const [text] = useTypewriter({
    words: list,
    loop: true,
    delaySpeed: 1000,
    typeSpeed: 80,
  });
  return (
    <div
      id="hero"
      className="h-screen relative z-10 flex flex-col space-y-12 items-center justify-center text-center"
    >
      <h1 className="text-5xl lg:text-6xl font-semibold relative z-50 my-4">
        <span dir="auto">
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
