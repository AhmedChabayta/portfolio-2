import { useInView } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <div className="text-white h-screen z-0 overflow-y-scroll">
      <Head>
        <title>Ahmed&apos;s Portfolio</title>
      </Head>
      <Header />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section className="w-fit h-fit mx-auto relative" id="skills">
        <Skills />
      </section>
      {/* about */}
      {/* experience */}
      {/* skills */}
      {/* projects */}
      {/* contact */}
    </div>
  );
}
