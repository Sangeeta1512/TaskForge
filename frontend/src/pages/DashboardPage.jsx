import { useEffect, useState } from "react"

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api/tasks"
import DashboardLayout from "../layouts/DashboardLayout"

function DashboardPage() {

    const [tasks, setTasks] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    useEffect(() => {

        fetchTasks()

    }, [])

    const fetchTasks = async () => {

        try {

            const data = await getTasks()

            setTasks(data)

        } catch (error) {

            console.error(error)
        }
    }

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await createTask(formData)

            setFormData({
                title: "",
                description: ""
            })

            fetchTasks()

        } catch (error) {

            console.error(error)
        }
    }

    const toggleComplete = async (task) => {

        try {

            await updateTask(task.id, {
                title: task.title,
                description: task.description,
                completed: !task.completed
            })

            fetchTasks()

        } catch (error) {

            console.error(error)
        }

    }
    const handleDelete = async (taskId) => {

        try {

            await deleteTask(taskId)

            fetchTasks()

        } catch (error) {

            console.error(error)
        }
    }
    return (

        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Task Dashboard 🚀
                </h1>

                {/* Create Task Form */}

                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Create Task
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="title"
                            placeholder="Task title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border p-3 rounded"
                        />

                        <textarea
                            name="description"
                            placeholder="Task description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-3 rounded"
                        />

                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                        >
                            Create Task
                        </button>

                    </form>

                </div>

                {/* Tasks List */}

                <div className="space-y-4">

                    {
                        tasks.length === 0 ? (

                            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                                No tasks yet
                            </div>

                        ) : (

                            tasks.map((task) => (

                                <div
                                    key={task.id}
                                    className="bg-white p-5 rounded-lg shadow"
                                >

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h2 className="text-xl font-semibold">
                                                {task.title}
                                            </h2>

                                            <p className="text-gray-600 mt-2">
                                                {task.description}
                                            </p>

                                        </div>

                                        <div>

                                            {
                                                task.completed ? (

                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                        Completed
                                                    </span>

                                                ) : (

                                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                                                        Pending
                                                    </span>

                                                )
                                            }

                                        </div>
                                        <div className="flex gap-3 mt-5">

                                            <button
                                                onClick={() => toggleComplete(task)}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                            >
                                                {
                                                    task.completed
                                                        ? "Mark Pending"
                                                        : "Mark Complete"
                                                }
                                            </button>

                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>

                                        </div>


                                    </div>

                                </div>

                            ))
                        )
                    }

                </div>

            </div>

        

        </DashboardLayout >
    )
}

export default DashboardPage