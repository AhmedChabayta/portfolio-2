import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRef } from 'react';
import About from '../components/About';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import spotifyDummy from '../assets/spotify.png';
import netflix from '../assets/netflix.png';
import ecommerce from '../assets/consume.png';
import palestine from '../assets/palestine.png';
import ContactMe from '../components/ContactMe';

export default function Home() {
  const sectionRef = useRef(null);

  return (
    <div className="text-white h-screen z-0 snap-mandatory snap-both overflow-y-scroll scrollbar scrollbar-thumb-white scrollbar-track-transparent scrollbar-rounded-0">
      <Head>
        <title>Ahmed&apos;s Portfolio</title>
      </Head>
      <Header />
      <section id="home" className="section">
        <Hero />
      </section>
      <section ref={sectionRef} id="about" className="section">
        <About />
      </section>
      <section
        className="w-fit h-fit mx-auto relative snap-center section"
        id="skills"
      >
        <Skills />
      </section>

      <section id="projects" className="relative section">
        <div className="flex items-center mt-24 overflow-scroll snap-x snap-mandatory scrollbar scrollbar-thumb-white scrollbar-track-transparent">
          <motion.h3
            initial={{ color: 'rgb(107,114,128)' }}
            whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="absolute top-24 left-1/2 -translate-x-1/2 uppercase tracking-[20px] text-2xl z-50"
          >
            Projects
          </motion.h3>

          <Projects
            text="spotify"
            title="spotify"
            image={spotifyDummy}
            type="multimedia"
          />
          <Projects
            text="spotify"
            title="spotify"
            image={netflix}
            type="multimedia"
          />
          <Projects
            text="spotify"
            title="spotify"
            image={ecommerce}
            type="multimedia"
          />
          <Projects
            text="spotify"
            title="spotify"
            image={palestine}
            type="multimedia"
          />
        </div>
      </section>
      <section id="contact" className="section">
        <ContactMe />
      </section>
    </div>
  );
}
