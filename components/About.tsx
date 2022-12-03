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
      className="relative mx-auto flex h-screen flex-col items-center justify-center space-y-16 text-center md:text-left lg:space-y-8 lg:space-x-8 xl:flex-row"
    >
      <SectionTitle title="about" />
      <motion.div
        layout
        className={`relative flex items-center justify-center ${
          canvas ? 'shadow-[0px_0px_25px_5px_#ffffff]' : ''
        }  rounded-full bg-gray-50 lg:h-96 lg:w-96 lg:rounded lg:shadow-none xl:h-[500px] xl:w-[500px]`}
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
          className="relative z-50 rounded-full object-cover p-[2px] shadow-[0px_0px_15px_#ffffff_inset] lg:h-96 lg:w-96 lg:rounded-none lg:shadow-none xl:h-[500px] xl:w-[500px]"
        />
      </motion.div>
      <article className="typography typography-xl typography-white space-y-10 pt-24 md:pt-0 lg:px-10">
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
