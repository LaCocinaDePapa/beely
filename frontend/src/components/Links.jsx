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
                        <div className='flex flex-col items-center'>
                            <div>
                                <img className="mx-auto size-14" src='/empty-box.svg' alt='empty box' />
                                <p className='mt-2 mb-4 opacity-50'>No links shortened, yet...</p>
                            </div>
                            <Button data-modal-target="default-modal" data-modal-toggle="default-modal" className='flex items-center gap-1.5 dark:hover:bg-neutral-800' variant='transparent'>
                                <img className="size-4" src="/plus.svg" alt="plus icon" />
                                Create new link
                            </Button>

                            <div>
                                
                            </div>

                        </div>
                    )
                }
            </div>
        </main>
    )
}
