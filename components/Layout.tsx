import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import Canvas from './Canvas';
import {
  HomeModernIcon,
  AcademicCapIcon,
  InformationCircleIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
<<<<<<< Updated upstream

const NoSsrWrapper = dynamic(() => import('./NoSsr'), {
  ssr: false,
});
=======
import { useRecoilValue } from 'recoil';
import {
  canvasShapeAtom,
  canvasStateAtom,
  qualityStateAtom,
} from '../atoms/canvasStateAtoms';
import MetaTags from './MetaTags';
import { AnimatePresence, motion } from 'framer-motion';
import CanvasSettings from './CanvasSettings';
import dynamic from 'next/dynamic';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  const [hue, setHue] = useState(0);
  const router = useRouter();
=======
  const [hue, setHue] = useState<number>(0);
  const router = useRouter();
  const canvas = useRecoilValue(canvasStateAtom);
  const quality = useRecoilValue(qualityStateAtom);
  const shape = useRecoilValue(canvasShapeAtom);
>>>>>>> Stashed changes

  useEffect(() => {
    setHue(Math.ceil(Math.random() * 290));
  }, [router]);

  return (
<<<<<<< Updated upstream
    <div className="flex relative h-screen w-screen overflow-y-scroll overflow-x-hidden bg-black">
      <NoSsrWrapper>
        <Canvas hue={hue} />
        <div className="fixed z-[100] flex justify-center flex-col top-1/2 -translate-y-1/2 left-0 bg-transparent h-fit w-fit ">
          {links.map((link) => (
            <React.Fragment key={link.link}>
              <Link href={link.link}>
                <button className="heroButton">
                  <link.icon
                    className={`w-8 ${
                      router.asPath === `/${link.link}`
                        ? ' text-[#00e7f3]'
                        : 'text-white'
                    }`}
                  />
                  <p
                    style={{
                      color:
                        router.asPath === `/${link.link}` ? '#00e7f3' : '#fff',
                    }}
                    className="hidden md:inline"
                  >
                    {link.link.split('#')}
                  </p>
                </button>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </NoSsrWrapper>
      <>{children}</>
    </div>
=======
    <>
      <MetaTags />
      <div className="relative flex h-screen w-screen overflow-x-hidden overflow-y-scroll bg-white">
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
              <Canvas quality={quality} shape={shape} hue={hue} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!canvas && (
            <motion.div
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              exit={{ y: 1000 }}
              transition={{ duration: 0.8, ease: 'backInOut' }}
            >
              <CanvasSettings />
            </motion.div>
          )}
        </AnimatePresence>
        {!canvas ? (
          ''
        ) : (
          <div
            className={`fixed top-[50%] left-0 z-[100] ml-2 hidden w-44 translate-y-[-50%] flex-col lg:flex`}
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
                      className={`hidden transition-all duration-150 ease-linear lg:inline ${
                        router.asPath === `/${link.link}`
                          ? 'typography typography-white font-black'
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

        {canvas && <>{children}</>}
      </div>
    </>
>>>>>>> Stashed changes
  );
}
