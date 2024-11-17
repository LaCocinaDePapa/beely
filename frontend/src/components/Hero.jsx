import { FaSquareGithub } from "react-icons/fa6";

export const Hero = () => {
  return (
    <section className="px-8">
      <div className="flex justify-center mt-16 md:mb-7 lg:mt-40 md:mt-32">
        <h1 className="text-[30px] font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 md:text-[47px] lg:text-[60px]">
          Streamline Your URL Management
        </h1>
      </div>
      <div>
        <div className="flex w-full mx-auto text-lg text-center text-black text-pretty md:max-w-4xl lg:max-w-4xl lg:text-xl dark:text-white">
          BeeURL is a comprehensive, open-source tool specifically crafted to
          transform the way you handle links by providing a seamless and
          efficient approach to creating, organizing, and tracking URLs
        </div>

        <article className="pt-10 mx-auto">
          <a
            href="https://github.com/LaCocinaDePapa/beely"
            rel="noopener"
            target="_blank"
            className="flex items-center justify-center max-w-44 transition mx-auto gap-2 rounded-md px-5 py-1.5 bg-blue-700 hover:bg-blue-800 text-base"
          >
            Star on GitHub
            <FaSquareGithub />
          </a>
        </article>
      </div>
    </section>
  );
};
