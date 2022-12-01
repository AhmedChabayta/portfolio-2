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
  const [hue, setHue] = useState(0);

  const router = useRouter();
  const CANVAS = useRef<HTMLCanvasElement>(null);
  const AUDIO = useRef<HTMLAudioElement>(null);
  const canvas = useRecoilValue(canvasStateAtom);
  const quality = useRecoilValue(qualityStateAtom);
  const shape = useRecoilValue(canvasShapeAtom);
  useEffect(() => {
    let x = Math.ceil(Math.random() * 360);
    setHue(x >= 100 ? x + 120 : x === 200 ? x + 20 : x);
  }, [router]);

  return (
    <>
      <MetaTags />
      <div className="flex relative h-screen w-screen overflow-y-scroll overflow-x-hidden bg-black">
        <NoSsr>
          {canvas && (
            <Canvas
              canvasRef={CANVAS}
              audioRef={AUDIO}
              quality={quality}
              shape={shape}
              hue={hue}
            />
          )}

          <div className="hidden fixed z-[100] lg:flex justify-center flex-col top-1/2 -translate-y-1/2 left-0 bg-transparent h-fit w-fit ">
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
                          router.asPath === `/${link.link}`
                            ? '#00e7f3'
                            : '#fff',
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
        </NoSsr>

        <>{children}</>
      </div>
    </>
  );
}
