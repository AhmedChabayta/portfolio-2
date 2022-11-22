import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';


export default function Header() {
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

  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 ">
      <motion.div
        variants={leftContainer}
        initial="initial"
        animate="animate"
        className="flex items-center"
      >
        <motion.div variants={leftChild}>
          <SocialIcon
            fgColor="white"
            bgColor="transparent"
            network="instagram"
            url="https://www.instagram.com/salatinata/"
          />
        </motion.div>
        <motion.div variants={leftChild}>
          <SocialIcon
            fgColor="white"
            bgColor="transparent"
            url="https://twitter.com/nerdyDevelopurr"
          />
        </motion.div>
        <motion.div variants={leftChild}>
          <SocialIcon
            fgColor="white"
            bgColor="transparent"
            url="https://twitter.com/nerdyDevelopurr"
          />
        </motion.div>
      </motion.div>
      <motion.div
        variants={rightContainer}
        initial="initial"
        animate="animate"
        className="flex items-center text-white cursor-pointer"
      >
        <motion.div variants={rightChild}>
          <SocialIcon fgColor="white" bgColor="transparent" network="email" />
        </motion.div>
        <p className="uppercase hidden md:inline-flex text-sm text-white">
          get in touch
        </p>
      </motion.div>
    </header>
  );
}
