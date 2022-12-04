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
      className="relative z-10 flex h-screen flex-col items-center justify-center space-y-12 text-center"
    >
      <h1
        className={`typography typography-2xl relative z-50 my-4 p-8  text-4xl font-black lg:text-3xl`}
      >
        <span className="" dir="auto">
          {text} <Cursor cursorColor="#ffffff" />
        </span>
      </h1>
      <Image
        priority
        className="rounded object-cover"
        width={200}
        height={200}
        src={urlFor(image.asset).url()}
        alt=""
      />
      <div className="relative z-50 space-y-2 pb-2 text-sm font-black uppercase leading-10 tracking-[7px] text-white sm:text-lg md:text-2xl">
        <h2>
          {name} <br />
        </h2>
        <h2 className="">{title}</h2>
      </div>
    </div>
  );
}
