import { Cursor, useTypewriter } from 'react-simple-typewriter';
import hello from '../hello.json';
import Image from 'next/image';
import { urlFor } from '../sanity/sanity';
import { Roboto, Cairo_Play as CP } from '@next/font/google';

const cairo = CP({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'auto',
  variable: '--font-cairo',
  fallback: ['system-ui', 'arial'],
});

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
      <h1
        className={`${cairo.className} font-black relative z-50 my-4 p-8 font-cairo typography typography-2xl text-4xl`}
      >
        <span className="" dir="auto">
          {text} <Cursor cursorColor="#ffffff" />
        </span>
      </h1>
      <Image
        className="rounded object-cover"
        width={200}
        height={200}
        src={urlFor(image.asset).url()}
        alt=""
      />
      <div className="uppercase text-white pb-2 tracking-[7px] leading-10 space-y-2 z-50 relative font-black">
        <h2>
          {name} <br />
        </h2>
        <h2 className="">{title}</h2>
      </div>
    </div>
  );
}
