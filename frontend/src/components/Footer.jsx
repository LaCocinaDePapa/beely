import { FaSquareXTwitter, FaLink } from "react-icons/fa6"

export const Footer = () => {

  return (
    <section className="w-full text-black border-t border-zinc-800 dark:text-neutral-100">
      <footer className="flex justify-between px-4 py-6 mx-auto opacity-75 max-w-screen-2xl">
        <div>
          Made with <span className="text-red-600">:love</span> by <a className="hover:underline hover:opacity-85" href="https://github.com/302founddev" target='_blank' rel='noopener noreferer'>302FoundDev</a>
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

