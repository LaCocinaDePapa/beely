import { Button } from "./ui/Button"
import { IoMdClose } from "react-icons/io"
import { MdRocketLaunch } from "react-icons/md"
import { useState } from "react"
import { motion } from "framer-motion"

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  console.log(isModalOpen)

  return (
    <section className="flex flex-col items-center">
      <Button
        className="w-48 inline-flex items-center gap-1.5 dark:hover:bg-neutral-800 border-neutral-300 dark:border-neutral-800"
        variant="transparent"
        onClick={openModal}
      >
        <img className="size-4" src="/plus.svg" alt="plus icon" />
        Create new link
      </Button>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
        >
          <div
            className="absolute inset-0 backdrop-blur-xs"
            style={{ background: 'rgba(0, 0, 0, .1)' }}
          />
        </motion.div>
      )}

      {
        isModalOpen && (
          <motion.div
            className="mt-18 w-80 border rounded-md h-[480px] lg:w-[470px] p-4 border-neutral-300 dark:border-neutral-800 z-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >

            <div className="flex justify-between items-center mb-12">
              <h3>Create a new link: </h3>
              <button onClick={closeModal} type="button">
                <IoMdClose />
              </button>
            </div>
            <form>
              <label className="flex flex-col mb-6 text-[15px] text-black dark:text-gray-200">
                Destination URL:
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="px-4 py-2 mt-1 bg-transparent rounded-md border placeholder:text-black border-neutral-300 dark:border-neutral-800 dark:placeholder:text-neutral-400"
                />
              </label>
              <label className="flex flex-col text-[15px] mb-6 text-black dark:text-gray-200">
                Short link (optional):
                <input
                  type="text"
                  placeholder="yourCustomLink"
                  className="px-4 py-2 mt-1 bg-transparent rounded-md border placeholder:text-black border-neutral-300 dark:border-neutral-800 dark:placeholder:text-neutral-400"
                />
              </label>

              <label className="text-[15px] text-black dark:text-gray-200">
                Desc:
                <textarea
                  name="description"
                  className="overflow-auto px-4 py-1 mt-1 w-full h-20 bg-transparent rounded-md border placeholder:text-black border-neutral-300 dark:border-neutral-800 dark:placeholder:text-neutral-400"
                  placeholder="Enter a description"
                />
              </label>

              <div className="inline-flex gap-2 justify-end items-end mt-8 w-full">
                <Button
                  onClick={closeModal}
                  variant="transparent"
                  className="w-24 border border-neutral-300 dark:border-neutral-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="inline-flex gap-1 items-center w-28 border border-neutral-300 dark:border-neutral-800"
                  variant="transparent"
                >
                  <MdRocketLaunch />
                  Create
                </Button>
              </div>
            </form>
          </motion.div>
        )
      }
    </section>
  );
};
