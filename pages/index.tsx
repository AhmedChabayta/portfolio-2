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
import SectionTitle from '../components/SectionTitle';

interface Props {
  data: Personal[];
}
const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home({ data }: Props) {
  const assets = data[0];
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`scrollbar-rounded-0h-screen z-0 snap-both snap-mandatory  overflow-y-scroll scroll-smooth border-[1px] text-white shadow-[0px_0px_5px_1px_inset_#ffffff] scrollbar scrollbar-track-transparent scrollbar-thumb-white`}
    >
      <Header social={data[0].social} />

      <section id="home" className="section">
        <Hero name={assets.name} title={assets.title} image={assets.images} />
      </section>

      <section ref={sectionRef} id="about" className="section">
        <About personalImage={assets.images} />
      </section>

      <section
        className="section relative mx-auto h-fit w-fit snap-center"
        id="skills"
      >
        <Skills skill={assets.skill} />
      </section>

      <section id="projects" className="section relative">
        <div className="flex h-screen snap-x snap-mandatory items-center overflow-x-scroll pt-24 overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white">
          <SectionTitle title="Projects" />
          <ProjectsContainer projects={assets.project} />
        </div>
      </section>

      <section id="contact" className="section">
        <ContactMe personal={assets} />
      </section>
    </motion.div>
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
