import { VscGithub } from "react-icons/vsc"
import UserBtn from "./UserBtn"
import { ToggleTheme } from "./ToggleTheme"


export const Navbar = () => {

  return (
    <header className="border-b bg-neutral-900 border-zinc-800">
      <nav className="h-16 px-4 m-auto max-w-screen-2xl">
        <ul className="flex items-center justify-between h-full gap-32">
          <li>
            <a className="flex items-center justify-center gap-1 transition ease-in-out hover:opacity-70" href="/">
              <img className="size-9" src="/bee.svg" alt="beeurl logo" />
              <span className="hidden text-2xl font-semibold lg:flex">bee.ly</span>
            </a>
          </li>

          <div className="flex items-center gap-4">
            <li>
              <a 
                target="_blank"
                rel="noopener" 
                href="https://github.com/302founddev/beeurl"
              >
                <span>
                  <VscGithub className="flex w-6 h-7" />
                </span>
              </a>
            </li>

            <div class="flex flex-col justify-center">
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
