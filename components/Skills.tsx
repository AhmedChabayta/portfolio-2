import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { urlFor } from '../sanity/sanity';
import { Skill } from '../types/typings';
import SectionTitle from './SectionTitle';

export default function Skills({ skill }: { skill: Skill[] }) {
  const MotionImage = motion(Image);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SectionTitle title="skills" />
      <div className="relative grid w-[90%] grid-cols-4 items-center justify-center gap-8 rounded bg-gray-900/50 p-8 backdrop-blur-3xl xs:gap-8 sm:grid-cols-5 sm:gap-12 md:w-full lg:grid-cols-6">
        {skill.map(({ title, image, index }) => (
          <motion.div
            className="group relative"
            initial={{
              x: index % 2 === 0 ? -200 : 0,
              y: index % 2 === 0 ? 200 : 0,
            }}
            whileInView={{ x: 0, y: 0 }}
            transition={{
              duration: 0.8,
              staggerChildren: 1,
              staggerDirection: -1,
            }}
            key={title}
          >
            <p className="fixed top-0 z-50 text-white"> {index}</p>
            <MotionImage
              initial={{
                x: index % 2 === 0 ? -200 : 0,
                y: index % 2 === 0 ? 200 : 0,
              }}
              whileInView={{
                x: 0,
                y: 0,
              }}
              className="object-contain duration-200 ease-linear"
              height={90}
              width={90}
              src={urlFor(image.asset).url()}
              alt=""
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
