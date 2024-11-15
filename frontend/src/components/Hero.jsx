import { VscGithub } from "react-icons/vsc"

export const Hero = () => {


  return (
    <section className="px-8">
      <div className="flex justify-center mt-16 mb-4 md:mb-9 lg:mt-48 md:mt-40">
        <h1 className="mx-auto text-4xl font-extrabold text-center text-black md:text-5xl lg:text-6xl dark:text-white">Streamline Your URL Management</h1>
      </div>
      <div>
        <div className="flex w-full mx-auto text-lg text-center text-black text-pretty md:max-w-4xl lg:max-w-4xl lg:text-xl dark:text-white">
          BeeURL is a comprehensive, open-source tool specifically crafted to transform the way you handle links by 
          providing a seamless and efficient approach to creating, organizing, and tracking URLs
        </div>

        <article className="pt-10 mx-auto">
          <a 
            href="https://github.com/302founddev/beeurl"
            rel="noopener"
            target="_blank"
            className="flex items-center justify-center max-w-52 transition mx-auto gap-2 rounded-md px-5 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-lg"
          >
            Star on GitHub
            <VscGithub />
          </a>
        </article>

      </div>
    </section>
  )
}
