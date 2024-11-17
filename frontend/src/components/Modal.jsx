import { Button } from "./ui/Button";
import { IoMdClose } from "react-icons/io";
import { MdRocketLaunch } from "react-icons/md";

export const Modal = () => {
  return (
    <section className="flex flex-col items-center">
      <Button
        className="w-48 inline-flex items-center gap-1.5 dark:hover:bg-neutral-800"
        variant="transparent"
      >
        <img className="size-4" src="/plus.svg" alt="plus icon" />
        Create new link
      </Button>

      <div className="mt-18 w-80 border rounded-md h-[480px] lg:w-[470px] p-4">
        <div className="flex items-center justify-between mb-12">
          <h3>Create a new link: </h3>
          <button>
            <IoMdClose />
          </button>
        </div>
        <form>
          <label className="flex flex-col mb-8 text-[15px] text-gray-200">
            Destination URL:
            <input
              type="text"
              placeholder="https://example.com"
              className="px-4 py-2 mt-1 rounded-md"
            />
          </label>
          <label className="flex flex-col text-[15px] mb-8 text-gray-200">
            Short link (optional):
            <input
              type="text"
              placeholder="yourCustomLink"
              className="px-4 py-2 mt-1 text-black rounded-md dark:text-neutral-100"
            />
          </label>

          <label className="text-[15px] text-gray-200">
            Desc:
            <textarea name="description" className="w-full px-4 py-2 mt-1" />
          </label>

          <div className="inline-flex gap-2 mt-8">
            <Button variant="transparent">Cancel</Button>
            <Button
              type="submit"
              className="inline-flex items-center gap-1"
              variant="transparent"
            >
              <MdRocketLaunch />
              Create
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
