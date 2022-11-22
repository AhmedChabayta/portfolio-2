import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

import { skills } from './skillsData';

export default function Skills() {
  const iconRef = useRef(null);

  return (
    <>
      <div className="h-screen flex flex-col justify-center rounded-lg max-w-[800px] lg:w-[800px] ">
        <motion.h3
          initial={{ color: 'rgb(107,114,128)' }}
          whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="absolute top-24 left-1/2 -translate-x-1/2 uppercase tracking-[20px] text-2xl"
        >
          Skills
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto mt-10 relative items-center lg:bg-white/20 backdrop-blue-2xl p-20  rounded-2xl">
          {skills.map(({ name, icon, image, skill }) => (
            <motion.div
              ref={iconRef}
              className="skill cursor-pointer group flex flex-col place-items-center"
              initial={{ filter: 'brightness(0.2)' }}
              whileInView={{
                filter: 'brightness(1)',
              }}
              transition={{ duration: 0.8 }}
              key={name}
            >
              {icon}

              <p className="numbers_container hidden group-hover:block text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {skill}%
              </p>

              {image && <Image width={100} height={100} src={image} alt="" />}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
