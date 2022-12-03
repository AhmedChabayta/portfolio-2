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
      className={`text-white h-screen z-0 snap-mandatory snap-both overflow-y-scroll scroll-smooth scrollbar scrollbar-thumb-white scrollbar-track-transparent scrollbar-rounded-0 shadow-[0px_0px_5px_1px_inset_#ffffff] border-[1px]`}
    >
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
        <div className="flex h-screen items-center overflow-y-hidden overflow-x-scroll snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pt-24">
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
