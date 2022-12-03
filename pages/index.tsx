import { Suspense, useEffect, useState } from 'react';
import Stream from '../components/Stream';


export default function Home({ data }: Props) {
  const assets = data[0];
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`z-0 grid h-screen snap-both snap-mandatory grid-cols-1 items-center overflow-y-scroll scroll-smooth text-white scrollbar scrollbar-track-transparent scrollbar-thumb-white`}
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
=======
export default function Home() {
  const [data, setData] = useState();

  console.log(data?.[0]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BASE}/api/details`);
      const { data } = await res.json();
      setData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <Suspense fallback="...Loading">
      {' '}
      {data ? <Stream data={data} /> : <p>Loading</p>}
    </Suspense>
  );
}
