import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import { Social } from '../types/typings';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { canvasState, qualityState } from '../atoms/canvasState';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header({ social }: { social: Social[] }) {
  const [quality, setQuality] = useRecoilState(qualityState);
  const [canvas, setCanvas] = useRecoilState(canvasState);
  const [changingQuality, setChangingQuality] = useState(false);

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
    <header className="sticky top-0 p-5 flex items-center justify-between max-w-7xl mx-auto z-20 ">
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
        className="flex items-center text-white cursor-pointer "
      >
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
        <FormControl className="flex items-center text-white lg:mx-3">
          <InputLabel className="text-white">Canvas Quality</InputLabel>
          <Select
            variant="standard"
            value={quality?.toString()}
            onChange={handleChange}
            className="text-white bg-transparent w-full lg:w-44"
          >
            <MenuItem value={64}>Low Quality(64bit)</MenuItem>
            <MenuItem value={1024}>Medium Quality(512bit)</MenuItem>
            <MenuItem value={2048}>High Quality(2048bit)</MenuItem>
            <MenuItem value={4096}>Extreme Quality(4096bit)</MenuItem>
            <MenuItem value={8192}>Crazy Quality(8192bit)</MenuItem>
          </Select>
        </FormControl>
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
