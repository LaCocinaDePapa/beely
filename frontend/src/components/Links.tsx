import { Modal } from "./Modal"
import { motion } from "framer-motion"

export const Links = () => {
  const message = ""

  return (
    <main className="mx-auto max-w-screen-2xl text-black dark:text-white">
      <motion.div
        className="mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        {message && message !== "" ? (
          <h4>{message}</h4>
        ) : (
          <div className="flex flex-col items-center">
            <div>
              <img
                className="mx-auto size-14"
                src="/empty-box.svg"
                alt="empty box"
              />
              <p className="mt-2 mb-4 opacity-50">No links shortened, yet...</p>
            </div>

            <div>
              <Modal />
            </div>
          </div>
        )}
      </motion.div>
    </main>
  )
}
