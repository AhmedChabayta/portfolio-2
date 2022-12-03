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
      className="relative z-10 flex h-screen w-full shrink-0 snap-center flex-col items-center justify-center"
    >
      <Image
        priority
        className="object-cover px-8 lg:px-0"
        width={400}
        height={400}
        src={urlFor(image).url()}
        alt=""
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="mt-20 space-y-16 text-center">
        <Link target="_void" href={`${linkToBuild}`}>
          <h1 className="typography typography-2xl typography-white text-4xl">
            {title}
          </h1>
        </Link>
        <p className="typography typography-white text-xl">{description}</p>
      </div>
    </div>
  );
}
export default Projects;
