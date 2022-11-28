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
      <div className="h-screen flex justify-center items-center rounded-lg max-w-[800px] lg:w-[800px] ">
        <SectionTitle title="skills" />

        <div className="flex flex-wrap gap-12 mx-auto relative items-center p-20">
          {skill.map(({ title, image, progress }) => (
            <motion.div
              ref={iconRef}
              className="cursor-pointer group will-change-transform"
              initial={{ filter: 'brightness(0.2)' }}
              whileInView={{
                filter: 'brightness(1)',
              }}
              transition={{ duration: 0.8 }}
              key={title}
            >
              <Image
                className="group-hover:rotate-[360deg] group-hover:-translate-x-[50%] group-hover:-translate-y-[50%] group-hover:scale-[0.5] transition-transform duration-200 ease-linear object-contain w-[60px] md:w-[80px]"
                height={100}
                width={100}
                src={urlFor(image.asset).url()}
                alt=""
              />
              <p className="numbers_container hidden group-hover:block text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {progress}%
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
