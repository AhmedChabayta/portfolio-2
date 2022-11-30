import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import { Social } from '../types/typings';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import {
  canvasShapeAtom,
  canvasStateAtom,
  qualityStateAtom,
} from '../atoms/canvasStateAtoms';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import {
  Button,
  FormControl,
  MenuItem,
  NoSsr,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header({ social }: { social: Social[] }) {
  const [quality, setQuality] = useRecoilState(qualityStateAtom);
  const [canvas, setCanvas] = useRecoilState(canvasStateAtom);
  const [changingQuality, setChangingQuality] = useState(false);
  const [shape, setShape] = useRecoilState(canvasShapeAtom);

  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setChangingQuality(true);
    if (changingQuality === true) {
      setCanvas(false);
    }
    router.reload();
    setQuality(event.target.value);
    setChangingQuality(false);
    setCanvas(true);
  };

  const handleShapeChange = () => {
    if (shape === 'rect') {
      setShape('arc');
      router.reload();
    } else if (shape === 'arc') {
      setShape('rect');
      router.reload();
    }
  };

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
      <header className="sticky top-0 p-5 flex items-center justify-between max-w-7xl mx-auto z-[500]">
        <motion.div
          variants={leftContainer}
          initial="initial"
          animate="animate"
          className="flex relative justify-center items-center "
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
          className="flex items-center text-white cursor-pointer "
        >
          <Tooltip title={canvas ? 'Hide Canvas' : 'Show Canvas'}>
            <Button
              className="flex items-center ml-2"
              onClick={() => setCanvas((prev: boolean) => !prev)}
            >
              {canvas ? (
                <EyeSlashIcon className="w-7" />
              ) : (
                <EyeIcon className="w-7" />
              )}
            </Button>
          </Tooltip>
          <Tooltip title="FFT Size" disableInteractive>
            <FormControl
              size="small"
              className="flex items-center text-white lg:mx-3"
            >
              <Select
                size="small"
                variant="standard"
                value={quality?.toString()}
                onChange={handleChange}
                className="text-white bg-transparent"
              >
                <MenuItem value={64}>(64bit)</MenuItem>
                <MenuItem value={1024}>(512bit)</MenuItem>
                <MenuItem value={2048}>(2048bit)</MenuItem>
                <MenuItem value={4096}>(4096bit)</MenuItem>
                <MenuItem value={8192}>(8192bit)</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
          <Tooltip title={shape === 'rect' ? 'Rectangles' : 'Circles'}>
            <div className="flex">
              {shape === 'rect' ? (
                <div
                  onClick={handleShapeChange}
                  className="w-5 h-5 border border-dotted lg:bg-transparent border-sky-500 lg:hover:bg-sky-500 active:scale-[0.9]"
                />
              ) : (
                <div
                  onClick={handleShapeChange}
                  className="w-5 h-5 border border-dotted  lg:bg-transparent border-sky-500 rounded-full lg:hover:bg-sky-500 active:scale-[0.9]"
                />
              )}
            </div>
          </Tooltip>
          <Link href="#contact">
            <div className="flex items-center">
              <motion.div variants={rightChild}>
                <SocialIcon
                  fgColor="white"
                  bgColor="transparent"
                  network="email"
                />
              </motion.div>

              <p className="uppercase hidden md:inline-flex text-sm text-white">
                get in touch
              </p>
            </div>
          </Link>
        </motion.div>
      </header>
    </NoSsr>
  );
}
