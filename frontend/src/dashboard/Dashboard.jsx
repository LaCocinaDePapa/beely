import { Link } from "react-router-dom"

export const Dashboard = () => {

    const message = ''

    return (
        <main className='mx-auto text-black dark:text-white max-w-screen-2xl'>
            <div className='mt-24'>
                {
                   message &&  message !== '' ? (
                        <h4>{message}</h4>
                    ) : (
                        <div className="flex flex-col items-center">
                            <p className='opacity-50'>No links shortened, yet...</p>
                            <Link className='' to='#'>Create a new link</Link>
                        </div>
                    )
                }
            </div>
        </main>
    )
}
