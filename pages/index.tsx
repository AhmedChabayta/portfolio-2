import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { useRef } from 'react';
import About from '../components/About';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import ContactMe from '../components/ContactMe';
import { Personal } from '../types/typings';
import ProjectsContainer from '../components/ProjectsContainer';

interface Props {
  data: Personal[];
}
const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home({ data }: Props) {
  const assets = data[0];
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="text-white h-screen z-0 snap-mandatory snap-both overflow-y-scroll scroll-smooth scrollbar scrollbar-thumb-white scrollbar-track-transparent scrollbar-rounded-0">
      <Header social={data[0].social} />
      <section id="home" className="section">
        <Hero name={assets.name} title={assets.title} image={assets.images} />
      </section>
      <section ref={sectionRef} id="about" className="section">
        <About personalImage={assets.images} />
      </section>
      <section
        className="w-fit h-fit mx-auto relative snap-center section"
        id="skills"
      >
        <Skills skill={assets.skill} />
      </section>

      <section id="projects" className="relative section">
        <div className="flex items-center mt-24 overflow-scroll snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
          <motion.h3
            initial={{ color: 'rgb(107,114,128)' }}
            whileInView={{ color: ['#acb3c2', '#576175', '#fff'] }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="absolute top-24 left-1/2 -translate-x-1/2 uppercase tracking-[20px] text-2xl z-50"
          >
            Projects
          </motion.h3>

          <ProjectsContainer projects={assets.project} />
        </div>
      </section>
      <section id="contact" className="section">
        <ContactMe personal={assets} />
      </section>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(`${BASE}/api/details`);

  const { data } = await res.json();
  return {
    props: {
      data,
    },
  };
};
