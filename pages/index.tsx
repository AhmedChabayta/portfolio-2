import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { Personal2 } from '../types/typings';
import dynamic from 'next/dynamic';
import {
  About,
  ContactMe,
  Header,
  ProjectsContainer,
  SectionTitle,
  Hero,
  Skills,
} from '../components';
import { sanityClient } from '../sanity/sanity';
import { query } from '../sanity/query';

const DynamicWrapper = dynamic(() => import('../components/DynamicWrapper'), {
  suspense: true,
});
interface Props {
  data: Personal2;
}

export default function Home({ data }: Props) {
  const {
    name,
    title,
    images,
    social,
    skill,
    project,
    phoneNumber,
    email,
    address,
  } = data;

  if (!data) {
    return null;
  }
  return (
    <Suspense>
      <DynamicWrapper>
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className={`z-0 grid h-screen snap-both snap-mandatory grid-cols-1 items-center overflow-y-scroll scroll-smooth text-white scrollbar scrollbar-track-transparent scrollbar-thumb-white`}
        >
          <Header social={social} />

          <section id="home" className="section">
            <Hero name={name} title={title} image={images} />
          </section>

          <section id="about" className="section">
            <About personalImage={images} />
          </section>

          <section
            className="section relative mx-auto h-fit w-fit snap-center"
            id="skills"
          >
            <Skills skill={skill} />
          </section>

          <section id="projects" className="section relative">
            <div className="flex h-screen snap-x snap-mandatory items-center overflow-x-scroll pt-24 overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white">
              <SectionTitle title="Projects" />
              <ProjectsContainer projects={project} />
            </div>
          </section>

          <section id="contact" className="section">
            <ContactMe
              phoneNumber={phoneNumber}
              email={email}
              address={address}
            />
          </section>
        </motion.div>
      </DynamicWrapper>
    </Suspense>
  );
}
export async function getStaticProps() {
  const res = await sanityClient.fetch(query);

  return {
    props: {
      data: res[0],
    },
    revalidate: 10,
  };
}
