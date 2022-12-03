import { Cursor, useTypewriter } from 'react-simple-typewriter';
import hello from '../hello.json';
import Image from 'next/image';
import { urlFor } from '../sanity/sanity';
import { Cairo_Play as CP } from '@next/font/google';

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
      className="relative z-10 flex h-screen flex-col items-center justify-center space-y-12 text-center"
    >
      <h1
        className={`${cairo.className} typography typography-2xl relative z-50 my-4 p-8 font-cairo text-4xl font-black`}
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
      <div className="relative z-50 space-y-2 pb-2 font-black uppercase leading-10 tracking-[7px] text-white">
        <h2>
          {name} <br />
        </h2>
        <h2 className="">{title}</h2>
      </div>
    </div>
  );
}
