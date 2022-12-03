import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Canvas } from './Canvas';
import {
  HomeModernIcon,
  AcademicCapIcon,
  InformationCircleIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useRecoilValue } from 'recoil';
import {
  canvasShapeAtom,
  canvasStateAtom,
  qualityStateAtom,
} from '../atoms/canvasStateAtoms';
import MetaTags from './MetaTags';
import { NoSsr } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import CanvasSettings from './CanvasSettings';

const links = [
  {
    link: '#home',
    icon: HomeModernIcon,
  },
  {
    link: '#about',
    icon: InformationCircleIcon,
  },
  {
    link: '#skills',
    icon: AcademicCapIcon,
  },
  {
    link: '#projects',
    icon: BuildingLibraryIcon,
  },
  {
    link: '#contact',
    icon: UserCircleIcon,
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [hue, setHue] = useState<number>(0);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const router = useRouter();
  const CANVAS = useRef<HTMLCanvasElement>(null);
  const AUDIO = useRef<HTMLAudioElement>(null);
  const canvas = useRecoilValue(canvasStateAtom);
  const quality = useRecoilValue(qualityStateAtom);
  const shape = useRecoilValue(canvasShapeAtom);

  useEffect(() => {
    let prevHue: number;
    let hues: number;
    hues = Math.ceil(Math.random() * 100);
    prevHue = hues;
    setHue(hues === prevHue ? hues * 2 : hues);
  }, [router]);

  useEffect(() => {
    if (typeof window != 'undefined') {
      window.addEventListener('keypress', (e) => {
        if (e.key === 'f') {
          setFullScreen((prev) => !prev);
        }
      });
    }
    return () => {
      window.removeEventListener('keypress', () => {
        setFullScreen(false);
      });
    };
  }, []);
  return (
    <>
      <MetaTags />
      <div className="flex relative h-screen w-screen overflow-y-scroll overflow-x-hidden bg-white">
        <NoSsr>
          <AnimatePresence>
            {canvas && (
              <motion.div
                initial={{
                  y: -2000,
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  x: 2000,
                }}
                transition={{ duration: 0.8, ease: 'backInOut' }}
              >
                <Canvas
                  canvasRef={CANVAS}
                  audioRef={AUDIO}
                  quality={quality}
                  shape={shape}
                  hue={hue}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!canvas && (
              <motion.div
                initial={{ x: -2000 }}
                animate={{ x: 0 }}
                exit={{ y: 2000 }}
                transition={{ duration: 0.8, ease: 'backInOut' }}
              >
                <CanvasSettings />
              </motion.div>
            )}
          </AnimatePresence>
          {fullScreen || !canvas ? (
            ''
          ) : (
            <div
              className={`hidden ml-2 lg:flex flex-col fixed z-[100] top-[50%] translate-y-[-50%] left-0`}
            >
              {links.map((link) => (
                <React.Fragment key={link.link}>
                  <Link href={link.link}>
                    <button className="heroButton">
                      <link.icon
                        className={`w-8 transition-all duration-150 ease-linear ${
                          router.asPath === `/${link.link}` ? 'w-10 ' : ''
                        }`}
                      />
                      <p
                        className={`hidden lg:inline transition-all duration-150 ease-linear ${
                          router.asPath === `/${link.link}`
                            ? 'font-black typography typography-white'
                            : ''
                        }`}
                      >
                        {link.link.split('#')}
                      </p>
                    </button>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
        </NoSsr>

        {fullScreen || (canvas && <>{children}</>)}
      </div>
    </>
  );
}
