import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
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
} from '../atoms/canvasAtoms';
import MetaTags from './MetaTags';
import { AnimatePresence, motion } from 'framer-motion';
import CanvasSettings from './CanvasSettings';
import dynamic from 'next/dynamic';

const DynamicWrapper = dynamic(() => import('../components/DynamicWrapper'), {
  ssr: false,
});
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
  const [colors, setColors] = useState({ red: 0, green: 0, blue: 0 });
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const router = useRouter();
  const canvas = useRecoilValue(canvasStateAtom);
  const quality = useRecoilValue(qualityStateAtom);
  const shape = useRecoilValue(canvasShapeAtom);

  useEffect(() => {
    setColors({
      red: Math.floor(Math.random() * 127.5),
      green: Math.floor(Math.random() * 127.5),
      blue: Math.floor(Math.random() * 127.5),
    });
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
      window.removeEventListener('keypress', (e) => {
        if (e.key === 'f') {
          setFullScreen((prev) => !prev);
        }
      });
    };
  }, []);
  return (
    <>
      <div className="w-[64px]">
        <motion.div className="fixed left-2 top-2 z-40 hidden h-[98%] w-[60px] bg-gray-900/50 backdrop-blur-md lg:block" />
      </div>

      <MetaTags />
      <div className="relative flex h-screen w-screen overflow-y-scroll bg-white overflow-x-hidden">
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
              <Canvas colors={colors} quality={quality} shape={shape} />
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
          <div className="group fixed top-[50%] left-0 z-[100] ml-3 hidden w-fit translate-y-[-50%] flex-col lg:flex">
            {links.map((link) => (
              <DynamicWrapper key={link.link}>
                <Link href={link.link}>
                  <button className="heroButton group ml-2 ">
                    <link.icon
                      className={`w-8 object-cover transition-all duration-150 ease-linear`}
                    />
                    <p
                      className={`invisible hidden pl-6 transition-all duration-150 ease-linear group-hover:visible lg:inline ${
                        router.asPath === `/${link.link}` ? 'font-black' : ''
                      }`}
                    >
                      {link.link.split('#')}
                    </p>
                  </button>
                </Link>
              </DynamicWrapper>
            ))}
          </div>
        )}

        {fullScreen || (canvas && <>{children}</>)}
      </div>
    </>
  );
}
