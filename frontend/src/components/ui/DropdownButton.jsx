export const Dropdown = () => {
    return (
        <div>
            <button type="button" className="inline-flex justify-center w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-gray-700 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all ease-in-out hover:bg-gray-300" aria-expanded="true" aria-haspopup="true">
                dark
                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

