import { SocialIcon } from 'react-social-icons';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { Social } from '../types/typings';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { canvasStateAtom, trackNameAtom } from '../atoms/canvasAtoms';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { Button, Tooltip } from '@mui/material';

export default function Header({ social }: { social: Social[] }) {
  const [canvas, setCanvas] = useRecoilState(canvasStateAtom);
  const trackName = useRecoilValue(trackNameAtom);
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
    <div className="lg:h-[60px]">
      <header className="fixed left-1/2 top-0 z-[500] mx-auto flex h-[60px] w-4/5 translate-x-[-50%] items-center justify-between rounded xs:h-[40px] xs:w-full sm:p-5 lg:top-2">
        <motion.div
          variants={leftContainer}
          initial="initial"
          animate="animate"
          className="relative flex w-fit items-center justify-center"
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
          className="flex cursor-pointer items-center justify-center rounded px-4"
        >
          <p className="whitespace-nowrap rounded  xs:text-xs">
            {trackName && trackName}
          </p>
          <Tooltip title={canvas ? 'Hide Canvas' : 'Show Canvas'}>
            <Button
              className="flex items-center"
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
              <EnvelopeIcon className="mx-2 w-7" />

              <p className="hidden text-xl uppercase md:inline-flex">
                get in touch
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </header>
    </div>
  );
}
