import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../sanity/sanity';

interface Props {
  title: string;
  description: string;
  linkToBuild: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

function Projects({ image, title, description, linkToBuild }: Props) {
  return (
    <div
      id="title"
      className="flex flex-col h-screen w-full shrink-0 items-center justify-center relative z-10 snap-center"
    >
      <Image
        priority
        className="object-cover"
        width={400}
        height={400}
        src={urlFor(image).url()}
        alt=""
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="mt-20 text-center">
        <Link target="_void" href={`${linkToBuild}`}>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </Link>
        <p className="text-xl my-8 max-w-lg font-light">{description}</p>
      </div>
    </div>
  );
}
export default Projects;
