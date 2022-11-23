import Projects from './Projects';

interface Props {
  description: string;
  linkToBuild: string;
  title: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export default function ProjectsContainer({ projects }: { projects: Props[] }) {
  return (
    <>
      {projects.map((project: Props) => (
        <Projects
          key={project.title}
          image={project.image}
          description={project.description}
          title={project.title}
          linkToBuild={project.linkToBuild}
        />
      ))}
    </>
  );
}
