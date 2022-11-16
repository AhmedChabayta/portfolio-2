import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import me from "../me.png";

export default function About() {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { amount: "all", once: true });

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-center items-center mx-auto"
    >
      <motion.h3
        initial={{ color: "rgb(107,114,128)" }}
        whileInView={{ color: ["#acb3c2", "#000", "#576175", "#fff"] }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="absolute top-24 uppercase tracking-[20px] text-2xl"
      >
        About
      </motion.h3>
      <motion.div
        animate={{
          transform: isInView ? "translateX(0px)" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        ref={imageRef}
      >
        <Image
          src={me}
          alt=""
          className="z-10 w-56 h-56 object-cover rounded-full md:rounded-lg md:w-64 md:h-96 xl:w-[500px] lg:h-[600px] mt-44"
        />
      </motion.div>
      <div className="space-y-10 md:px-10">
        <h4 className="text-4xl font-semibold ">
          Here is a{" "}
          <span className="underline decoration-teal-500 underline-offset-4">
            little
          </span>{" "}
          background
        </h4>
        <p className="text-base max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, possimus quidem. Eos impedit voluptas ipsa enim, quos
          in et sit libero quo assumenda sunt fugit eum consequuntur ad illo
          error!
        </p>
      </div>
    </motion.div>
  );
}
