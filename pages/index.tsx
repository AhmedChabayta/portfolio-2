import { useInView } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function Home() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: "all" });

  useEffect(()=> {
    if (isInView) {
      
    }
  })

  console.log(isInView);

  return (
    <div className="text-white h-screen z-0 snap-mandatory snap-y overflow-y-scroll">
      <Head>
        <title>Ahmed&apos;s Portfolio</title>
      </Head>
      <Header />
      <section id="home" className="snap-center">
        <Hero />
      </section>
      <section ref={sectionRef} id="about" className="snap-center">
        <About />
      </section>
      <section className="w-fit h-fit mx-auto relative snap-center" id="skills">
        <Skills />
      </section>
      <section id="projects" className="snap-center">
        <Projects />
      </section>
      {/* about */}
      {/* experience */}
      {/* skills */}
      {/* projects */}
      {/* contact */}
    </div>
  );
}
