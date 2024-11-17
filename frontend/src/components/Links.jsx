import { Modal } from "./Modal"

export const Links = () => {
  const message = "";

  return (
    <main className="mx-auto max-w-screen-2xl text-black dark:text-white">
      <div className="mt-24">
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
      </div>
    </main>
  )
}
