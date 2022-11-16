import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { skills } from "./skillsData";

export default function Skills() {
  const iconRef = useRef(null);
  const isInView = useInView(iconRef, { amount: "all" });
  useEffect(() => {}, [isInView]);
  return (
    <div className="h-screen relative flex flex-col overflow-hidden max-w-full justify-evenly items-center">
      <div className="flex flex-col items-center justify-center">
        <motion.h3
          initial={{ color: "rgb(107,114,128)" }}
          whileInView={{ color: ["#acb3c2", "#000", "#576175", "#fff"] }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="uppercase tracking-[20px] text-white text-2xl "
        >
          Skills
        </motion.h3>
      </div>

      <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto py-10">
        {skills.map(({ name, icon, image }) => (
          <motion.div
            ref={iconRef}
            animate={{
              filter: isInView ? `brightness(1)` : `brightness(0.2)`,
            }}
            transition={{ duration: 0.8 }}
            className="cursor-pointer group flex flex-col place-items-center"
            key={name}
          >
            {icon}
            {image && <Image width={100} height={100} src={image} alt="" />}
            <p className="my-2 uppercase text-white hidden md:inline md:invisible md:group-hover:visible">
              {name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
