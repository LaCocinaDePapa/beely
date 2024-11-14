import { Button } from "./ui/Button"

export const Links = () => {

    const message = ''

    return (
        <main className='mx-auto text-black dark:text-white max-w-screen-2xl'>
            <div className='mt-24'>
                {
                   message &&  message !== '' ? (
                        <h4>{message}</h4>
                    ) : (
                        <div className="flex flex-col items-center">
                            <p className='mb-4 opacity-50'>No links shortened, yet...</p>
                            <Button variant="transparent">Create new link</Button>
                        </div>
                    )
                }
            </div>
        </main>
    )
}
