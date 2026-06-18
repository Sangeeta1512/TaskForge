import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { loginUser } from "../api/auth"

function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const data = await loginUser(formData)

            login(data.access_token)

            alert("Login successful!")

            navigate("/dashboard")

        } catch (error) {

            console.error(error)

            alert("Invalid credentials")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-96">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded"
                        onChange={handleChange}
                    />

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    )
}

export default LoginPage