import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import { urlFor } from '../sanity/sanity';
import { Skill } from '../types/typings';
import SectionTitle from './SectionTitle';

export default function Skills({ skill }: { skill: Skill[] }) {
  const iconRef = useRef(null);

  return (
    <>
      <div className="flex min-h-screen max-w-[800px] items-center justify-center rounded-lg lg:w-[800px] ">
        <SectionTitle title="skills" />

        <div className="relative grid w-[90%] grid-cols-4 gap-8 xs:gap-8 sm:grid-cols-5 sm:gap-12 lg:grid-cols-6">
          {skill.map(({ title, image, progress }) => (
            <motion.div
              ref={iconRef}
              className="group relative h-16 w-16 cursor-pointer will-change-transform xs:h-12 xs:w-12 md:h-20 md:w-20"
              initial={{ filter: 'brightness(0.2)' }}
              whileInView={{
                filter: 'brightness(1)',
              }}
              transition={{ duration: 0.8 }}
              key={title}
            >
              <Image
                className="object-contain transition-transform duration-200 ease-linear group-hover:-translate-x-[50%] group-hover:-translate-y-[50%] group-hover:scale-[0.5] "
                fill
                src={urlFor(image.asset).url()}
                alt=""
              />
              <p className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-2xl group-hover:block">
                {progress}%
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
