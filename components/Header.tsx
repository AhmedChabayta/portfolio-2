import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import { Social } from '../types/typings';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { canvasState } from '../atoms/canvasState';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';

export default function Header({ social }: { social: Social[] }) {
  const leftContainer = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };
  const leftChild = {
    initial: {
      x: -500,
    },
    animate: {
      x: 0,
    },
  };
  const rightContainer = {
    initial: {
      x: 500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };
  const rightChild = {
    initial: {
      x: 500,
    },
    animate: {
      x: 0,
    },
  };
  const [canvas, setCanvas] = useRecoilState(canvasState);
  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 ">
      <motion.div
        variants={leftContainer}
        initial="initial"
        animate="animate"
        className="flex relative justify-center items-center z-[500]"
      >
        {social.map((social: Social) => (
          <motion.div
            className="relative z-[900]"
            key={social.title}
            variants={leftChild}
          >
            <SocialIcon
              fgColor="white"
              bgColor="transparent"
              url={social.url}
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={rightContainer}
        initial="initial"
        animate="animate"
        className="flex items-center text-white cursor-pointer"
      >
        <button
          className="flex items-center"
          onClick={() => setCanvas((prev) => !prev)}
        >
          {canvas ? (
            <EyeSlashIcon className="w-8 ml-2" />
          ) : (
            <EyeIcon className="w-8 ml-2" />
          )}
        </button>

        <motion.div variants={rightChild}>
          <SocialIcon fgColor="white" bgColor="transparent" network="email" />
        </motion.div>
        <Link href="#contact">
          <p className="uppercase hidden md:inline-flex text-sm text-white">
            get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}
