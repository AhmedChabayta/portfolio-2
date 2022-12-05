import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { urlFor } from '../sanity/sanity';
import SectionTitle from './SectionTitle';

interface Props {
  personalImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export default function About({ personalImage }: Props) {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { amount: 'some', once: true });

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen flex-col items-center justify-center text-center md:text-left lg:space-y-8 lg:space-x-8  xl:flex-row"
    >
      <SectionTitle title="about" />
      <motion.div
        layout
        className={`relative mb-4 flex h-60 w-60 items-center justify-center rounded sm:my-10 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 lg:rounded-lg xl:h-[500px] xl:w-[500px]`}
        animate={{
          transform: isInView ? 'translateX(0px)' : 'translateX(-100px)',
        }}
        style={{ transition: 'all 0.2s linear' }}
        ref={imageRef}
      >
        <Image
          priority
          src={urlFor(personalImage.asset).url()}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          fill
          alt=""
          style={{ WebkitAppearance: 'none', transition: 'all 0.3s' }}
          className="relative z-50 rounded object-cover p-[2px] sm:rounded-sm md:rounded-md lg:rounded-lg"
        />
      </motion.div>
      <div className="space-y-10 lg:px-10">
        <h4 className="text-lg md:text-2xl lg:text-3xl">Background:</h4>
        <p className="max-w-xs text-lg capitalize md:max-w-xl">
          Self taught front end web developer, specializing in ReactJs, NextJs.
          My passion is to meet great artists, learn and be inspired to create
          efficient work.
        </p>
      </div>
    </motion.div>
  );
}
