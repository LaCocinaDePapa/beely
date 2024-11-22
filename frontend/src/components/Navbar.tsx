import { FaSquareGithub } from "react-icons/fa6"
import UserBtn from "./UserBtn"
import { ToggleTheme } from "./ToggleTheme"
import { Link } from "react-router-dom"


export const Navbar = () => {

  return (
    <header className="border-b bg-neutral-900 border-zinc-800">
      <nav className="h-16 px-4 m-auto max-w-screen-2xl">
        <ul className="flex items-center justify-between h-full">
          <li>
            <Link
              to="/"
              className="flex items-center justify-center gap-1 transition ease-in-out hover:opacity-70"
            >
              <img className="w-[36px] h-[36px]" src="/bee.svg" alt="beeurl logo" />
              <span className="hidden text-2xl font-semibold lg:flex">bee</span>
            </Link>
          </li>

          <div className="flex items-center gap-4">
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/LaCocinaDePapa/beely"
              >
                <span className="flex items-center gap-2">
                  <FaSquareGithub className="flex size-6" />
                </span>
              </a>
            </li>

            <div>
              <ToggleTheme />
            </div>

            <li>
              <UserBtn />
            </li>

          </div>

        </ul>
      </nav>
    </header>
  )
}
