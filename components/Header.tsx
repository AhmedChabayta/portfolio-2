import { SocialIcon } from 'react-social-icons';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { Social } from '../types/typings';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { canvasStateAtom } from '../atoms/canvasStateAtoms';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { Button, NoSsr, Tooltip } from '@mui/material';

export default function Header({ social }: { social: Social[] }) {
  const [canvas, setCanvas] = useRecoilState(canvasStateAtom);

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
      x: 100,
    },
    animate: {
      x: 0,
    },
  };

  return (
    <NoSsr>
      <header className="sticky top-0 z-[500] mx-auto flex items-center justify-between xs:w-full sm:w-3/4 sm:p-5">
        <motion.div
          variants={leftContainer}
          initial="initial"
          animate="animate"
          className="relative flex items-center justify-center "
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
          className="flex cursor-pointer items-center space-x-2 "
        >
          <Tooltip title={canvas ? 'Hide Canvas' : 'Show Canvas'}>
            <Button
              className="ml-2 flex items-center"
              onClick={() => setCanvas((prev: boolean) => !prev)}
            >
              {canvas ? (
                <EyeSlashIcon className="w-7" />
              ) : (
                <EyeIcon className="w-7" />
              )}
            </Button>
          </Tooltip>

          <Link href="#contact">
            <motion.div variants={rightChild} className="flex items-center">
              <EnvelopeIcon className="mx-2 w-5" />

              <p className="hidden uppercase md:inline-flex">get in touch</p>
            </motion.div>
          </Link>
        </motion.div>
      </header>
    </NoSsr>
  );
}
