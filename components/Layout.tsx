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

const NoSsrWrapper = dynamic(() => import('./NoSsr'), {
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
  const [hue, setHue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setHue(Math.ceil(Math.random() * 290));
  }, [router]);

  return (
    <div className="flex relative h-screen w-screen overflow-y-scroll overflow-x-hidden bg-black">
      <NoSsrWrapper>
        <Canvas hue={hue} />
        <div className="lg:pr-32">
          <div className="fixed z-[100] flex pl-8 lg:pl-0 justify-center bg-black/90 bottom-0 left-0 right-0 lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:bg-transparent lg:h-fit lg:w-fit">
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
        </div>
      </NoSsrWrapper>
      <>{children}</>
    </div>
  );
}
