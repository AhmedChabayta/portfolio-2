import { motion } from 'framer-motion';
import { GetStaticProps, NextPage } from 'next';
import { Suspense } from 'react';
import { Personal } from '../types/typings';
import dynamic from 'next/dynamic';
import {
  About,
  ContactMe,
  Header,
  Layout,
  ProjectsContainer,
  SectionTitle,
  Hero,
  Skills,
} from '../components';

const DynamicWrapper = dynamic(() => import('../components/DynamicWrapper'), {
  suspense: true,
});
interface Props {
  DATA: {
    data: Personal[];
  };
}
const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const Home: NextPage<Props> = ({ DATA }) => {
  const { data } = DATA;
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
  } = data[0];

  return (
    <Suspense>
      <DynamicWrapper>
        <Layout>
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
        </Layout>
      </DynamicWrapper>
    </Suspense>
  );
};
export const getServerSideProps = async () => {
  const res = await fetch(`${BASE}/api/details`);
  const DATA = await res.json();
  return {
    props: {
      DATA,
    },
  };
};
export default Home;
