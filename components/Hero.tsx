import { Cursor, useTypewriter } from 'react-simple-typewriter';
import hello from '../hello.json';
import Image from 'next/image';
import { urlFor } from '../sanity/sanity';

interface Props {
  name: string;
  title: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export default function Hero({ name, title, image }: Props) {
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
        className="rounded object-cover"
        width={200}
        height={200}
        src={urlFor(image.asset).url()}
        alt=""
      />
      <h2 className="text-sm uppercase text-white pb-2 tracking-[7px] leading-10 z-50 relative">
        {name} <br />
        {title}
      </h2>
    </div>
  );
}
