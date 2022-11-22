import Image from 'next/image';

function Projects({
  image,
  title,
  text,
  type,
}: {
  image: any;
  title: string;
  text: string;
  type: string;
}) {
  return (
    <div
      id="title"
      className="flex flex-col h-screen w-screen shrink-0 items-center justify-center relative z-10 snap-center"
    >
      <Image
        placeholder="blur"
        priority
        className=""
        width={400}
        height={400}
        src={image}
        alt=""
      />
      <div className="mt-20">
        <h1>{title}</h1>
        <p>{type}</p>
        <p className="text-xl my-8 max-w-lg">{text}</p>
      </div>
    </div>
  );
}
export default Projects;
