import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Canvas from "./Canvas";

const NoSsrWrapper = dynamic(() => import("./NoSsr"), {
  ssr: false,
});

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="relative h-screen overflow-y-scroll overflow-x-hidden">
      <NoSsrWrapper>
        <Canvas />
        <div className="flex flex-col top-1/2 -translate-y-1/2 fixed left-0 z-[100] w-fit h-fit">
          <Link href="#home">
            <button
              style={{
                color: router.asPath === "/#home" ? "#ae00f3" : "#fff",
              }}
              className="heroButton"
            >
              Home
            </button>
          </Link>
          <Link href="#about">
            <button
              style={{
                color: router.asPath === "/#about" ? "#ae00f3" : "#fff",
              }}
              className="heroButton"
            >
              About
            </button>
          </Link>
          <Link href="#skills">
            <button
              style={{
                color: router.asPath === "/#skills" ? "#ae00f3" : "#fff",
              }}
              className="heroButton"
            >
              Skills
            </button>
          </Link>
          <Link href="#projects">
            <button
              style={{
                color: router.asPath === "/#projects" ? "#ae00f3" : "#fff",
              }}
              className="heroButton"
            >
              Projects
            </button>
          </Link>
        </div>
      </NoSsrWrapper>
      <>{children}</>
    </div>
  );
}
