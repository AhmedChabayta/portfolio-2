import { animate, motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState, Fragment } from "react";
import AnimatingNumber from "./AnimatingNumber";
import { skills } from "./skillsData";

export default function Skills() {
  const [num, setNum] = useState(100);
  const [showSkills, setShowSkills] = useState<boolean>();
  const iconRef = useRef(null);
  const isInView = useInView(iconRef, { amount: "some" });

  useEffect(() => {
    if (isInView) {
      setShowSkills(true);
    }
  }, [isInView]);

  return (
    <>
      <div className="h-screen flex flex-col justify-center lg:bg-white/20 backdrop-blue-2xl p-8 rounded-lg max-w-[800px] lg:w-[800px]">
        <div className="flex flex-col items-center justify-center">
          <motion.h3
            initial={{ color: "rgb(107,114,128)" }}
            whileInView={{ color: ["#acb3c2", "#576175", "#fff"] }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="absolute top-24 uppercase tracking-[20px] text-2xl"
          >
            Skills
          </motion.h3>
        </div>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto py-10 relative items-center">
          {skills.map(({ name, icon, image, skill }) => (
            <motion.div
              ref={iconRef}
              className="skill cursor-pointer group flex flex-col place-items-center"
              initial={{ filter: "brightness(0.2)" }}
              whileInView={{
                filter: "brightness(1)",
              }}
              transition={{ duration: 0.8 }}
              key={name}
            >
              {icon}
              <AnimatingNumber value={skill} />
              {image && <Image width={100} height={100} src={image} alt="" />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
