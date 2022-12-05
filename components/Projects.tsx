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
      className="relative z-10 flex min-h-screen w-full shrink-0 snap-center flex-col items-center justify-center "
    >
      <Image
        className="object-cover px-8 lg:px-0 "
        width={400}
        height={400}
        src={urlFor(image).url()}
        alt=""
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="mt-20 space-y-16 text-center">
        <Link target="_void" href={`${linkToBuild}`}>
          <h1 className=" text-4xl font-bold md:text-5xl">{title}</h1>
        </Link>
        <p className="mx-auto max-w-[80%] text-sm sm:text-lg ">{description}</p>
      </div>
    </div>
  );
}
export default Projects;
