import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { canvasStateAtom } from '../atoms/canvasStateAtoms';
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
  const canvas = useRecoilValue(canvasStateAtom);
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col relative h-screen text-center md:text-left xl:flex-row justify-center space-y-16 lg:space-y-8 items-center lg:space-x-8 mx-auto"
    >
      <SectionTitle title="about" />
      <motion.div
        layout
        className={`relative flex items-center justify-center ${
          canvas ? 'shadow-[0px_0px_25px_5px_#ffffff]' : ''
        }  lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-full lg:rounded bg-gray-50 lg:shadow-none`}
        animate={{
          transform: isInView ? 'translateX(0px)' : 'translateX(-100px)',
        }}
        style={{ transition: 'all 0.2s linear' }}
        ref={imageRef}
      >
        <Image
          priority
          src={urlFor(personalImage.asset).url()}
          width={300}
          height={300}
          alt=""
          style={{ WebkitAppearance: 'none', transition: 'all 0.3s' }}
          className="relative p-[2px] z-50 object-cover rounded-full lg:rounded-none lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] shadow-[0px_0px_15px_#ffffff_inset] lg:shadow-none"
        />
      </motion.div>
      <article className="space-y-10 lg:px-10 pt-24 md:pt-0 typography typography-white typography-xl">
        <h4 className=" text-3xl">Background:</h4>
        <p className=" max-w-xl capitalize">
          Self taught front end web developer, specializing in ReactJs, NextJs.
          My passion is to meet great artists, learn and be inspired to create
          efficient work.
        </p>
      </article>
    </motion.div>
  );
}
