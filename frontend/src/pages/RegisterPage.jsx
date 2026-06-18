import { useState } from "react"

import { registerUser } from "../api/auth"

function RegisterPage() {

    const [formData, setFormData] = useState({
        username: "",
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

            const data = await registerUser(formData)

            console.log(data)

            alert("Registration successful!")

        } catch (error) {

            console.error(error)

            alert("Registration failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-96">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full border p-3 rounded"
                        onChange={handleChange}
                    />

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
                        className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    )
}

export default RegisterPage