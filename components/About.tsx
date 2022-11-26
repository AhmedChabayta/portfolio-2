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
  const isInView = useInView(imageRef, { amount: 'all', once: true });

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col relative h-screen text-center md:text-center xl:flex-row max-w-7xl px-10 justify-center items-center space-x-8 space-y-16 mx-auto"
    >
      <SectionTitle title="about" />
      <motion.div
        animate={{
          transform: isInView ? 'translateX(0px)' : 'translateX(-100px)',
        }}
        transition={{
          duration: 0.2,
        }}
        ref={imageRef}
      >
        <Image
          priority
          src={urlFor(personalImage.asset).url()}
          width={200}
          height={200}
          alt=""
          className="relative z-50 w-56 h-56 object-cover rounded-full lg:rounded-lg lg:w-64 lg:h-96 xl:w-[500px] xl:h-[500px] mt-28"
        />
      </motion.div>
      <div className="space-y-10 md:px-10">
        <h4 className="text-4xl font-semibold ">
          Here is a{' '}
          <span className="underline decoration-teal-500 underline-offset-4">
            little
          </span>{' '}
          background
        </h4>
        <p className="text-base max-w-xl">
          Ahmed Chabayta, Junior Front-end web-developer, specializing in
          ReactJs, NextJs.
        </p>
      </div>
    </motion.div>
  );
}
