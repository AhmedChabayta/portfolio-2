import Image from "next/image";

function Projects() {
  return (
    <div className="h-screen overflow-x-scroll flex items-center w-full mx-auto space-x-52 snap-x snap-mandatory relative z-50">
      <div className="flex flex-col justify-center items-center shrink-0 w-screen snap-center">
        <Image
          className="relative z-10"
          width={400}
          height={400}
          src="/ecommerce.png"
          alt=""
        />
        <div className="mt-20">
          <h1>CONSUME</h1>
          <p>E-commerce</p>
          <p className="text-xl my-8 max-w-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            magnam assumenda aliquam ullam! At quo dicta a eveniet cumque.
            Reprehenderit atque ipsa voluptates voluptatum, repudiandae iure eos
            officiis mollitia molestias!
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center shrink-0 w-screen snap-center">
        <Image
          className="relative z-10"
          width={400}
          height={400}
          src="/ecommerce.png"
          alt=""
        />
        <div className="mt-20">
          <h1>CONSUME</h1>
          <p>E-commerce</p>
          <p className="text-xl my-8 max-w-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            magnam assumenda aliquam ullam! At quo dicta a eveniet cumque.
            Reprehenderit atque ipsa voluptates voluptatum, repudiandae iure eos
            officiis mollitia molestias!
          </p>
        </div>
      </div>
    </div>
  );
}
export default Projects;
