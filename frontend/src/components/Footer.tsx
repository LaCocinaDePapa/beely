import { FaSquareXTwitter, FaLink, FaHeart } from "react-icons/fa6"

export const Footer = () => {

  return (
    <section className="w-full text-black border-t border-zinc-800 dark:text-neutral-100">
      <footer className="flex flex-col justify-between gap-2 px-4 py-6 mx-auto opacity-75 max-w-screen-2xl lg:flex-row md:flex-row">
        <div className="inline-flex items-center gap-1">
          Made with <span className="text-red-600"><FaHeart /></span> by <a className="hover:underline hover:opacity-85" href="https://github.com/LaCocinaDePapa" target='_blank' rel='noopener noreferer'>LaCocinaDePapa</a>
        </div>
        <div>
          © 2024
          <a 
            href="https://github.com/302FoundDev" 
            className="hover:underline hover:opacity-85" 
            rel="noopener"
            target="_blank"
          >
            302foundev
          </a>
          . Almost all rights reserved
        </div>
        <div>
          <a
            href="https://x.com/302founddev"
            rel="noopener"
            target="_blank"
          >
            <span className="flex items-center gap-1 hover:opacity-75">
              <FaSquareXTwitter />
              Twitter
              <FaLink />
            </span>
          </a>
        </div>
      </footer>
    </section>
  )
}

