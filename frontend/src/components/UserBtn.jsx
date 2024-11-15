import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaArrowRight } from "react-icons/fa6"

function UserBtn() {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) 
        return (
            <>
                <Link to='signin' className="flex text-sm items-center gap-2 border px-4 py-1.5 rounded-md transition border-gray-800 bg-indigo-700 hover:bg-indigo-800 lg:text-base">
                    Get started
                    <FaArrowRight className="w-3" />
                </Link>
            </>
        )
    
    if (isAuthenticated)
        return (
            <>
                <h2>Bienvenido, {user?.name}</h2>
            </>
        )
}

export default UserBtn
