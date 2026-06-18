import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

function Navbar() {

    const navigate = useNavigate()

    const { logout } = useAuth()

    const handleLogout = () => {

        logout()

        navigate("/login")
    }

    return (

        <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold text-blue-600">
                TaskForge
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Logout
            </button>

        </nav>
    )
}

export default Navbar