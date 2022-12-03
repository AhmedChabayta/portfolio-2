import { motion } from 'framer-motion';
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
export default function Stream({ data }: Props) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`z-0 grid h-screen snap-both snap-mandatory grid-cols-1 items-center justify-center overflow-y-scroll scroll-smooth text-white scrollbar scrollbar-track-transparent scrollbar-thumb-white`}
    >
      * <Header social={data[0].social} />
      <section id="home" className="section">
        <Hero
          name={data[0].name}
          title={data[0].title}
          image={data[0].images}
        />
      </section>
      <section id="about" className="section">
        <About personalImage={data[0].images} />
      </section>
      <section
        className="section relative mx-auto h-fit w-fit snap-center"
        id="skills"
      >
        <Skills skill={data[0].skill} />
      </section>
      <section id="projects" className="section relative">
        <div className="flex h-screen snap-x snap-mandatory items-center overflow-x-scroll pt-24 overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white">
          <SectionTitle title="Projects" />
          <ProjectsContainer projects={data[0].project} />
        </div>
      </section>
      <section id="contact" className="section">
        <ContactMe personal={data[0]} />
      </section>
    </motion.div>
  );
}
