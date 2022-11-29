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
import { useRecoilValue } from 'recoil';
import { canvasShape, canvasState, qualityState } from '../atoms/canvasState';
import Head from 'next/head';
import MetaTags from './MetaTags';

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

  const canvas = useRecoilValue(canvasState);
  const quality = useRecoilValue(qualityState);
  const shape = useRecoilValue(canvasShape);
  useEffect(() => {
    setHue(Math.ceil(Math.random() * 290));
  }, [router]);

  return (
    <>
      <MetaTags />
      <div className="flex relative h-screen w-screen overflow-y-scroll overflow-x-hidden bg-black">
        {canvas && <Canvas quality={quality} shape={shape} hue={hue} />}

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

        <>{children}</>
      </div>
    </>
  );
}
