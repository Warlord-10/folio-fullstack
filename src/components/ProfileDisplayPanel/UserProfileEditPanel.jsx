import React, { useContext, useState } from "react"
import axios from "@/Networking/Axios"
import requests from "@/Networking/Requests"
import { X, Upload, Trash2, Code } from "lucide-react"
import { useRouter } from 'next/navigation';


function UserProfileEditPanel({ userData, userProjects, toClose, setUserData }) {
    const router = useRouter();

    const [defaultPage, setDefaultPage] = useState(userData.user_portfolio)
    const [res, setRes] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(
        userData.avatar_path
            ? requests.publicFiles(userData.avatar_path)
            : "/default.jpg",
    )
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    
    const updateUser = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const dataToSend = Object.fromEntries(formData);
            dataToSend.user_portfolio = defaultPage
            const response = await axios.patch(requests.getDeleteUpdateUserById(userData._id), dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setRes(<span className="text-green-400 font-semibold">Updated Successfully</span>)
            setUserData(response.data)
            setDefaultPage(response.data.user_portfolio)
        } catch (error) {
            setRes(<span className="text-red-400 font-semibold">Error Occurred</span>)
        } finally {
            setTimeout(() => {
                setRes(null)
                // toClose()
            }, 2000)
        }
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(requests.getDeleteUpdateUserById(userData._id))
            setRes(<span className="text-green-400 font-semibold">Account Deleted Successfully</span>)
            // Handle post-deletion logic (e.g., logout, redirect)
            router.replace("/home")
        } catch (error) {
            setRes(<span className="text-red-400 font-semibold">Error Deleting Account</span>)
        } finally {
            setIsDeleteModalOpen(false)
        }
    }

    const handleTranspileProject = async () => {
        if (!defaultPage) {
            setRes(<span className="text-yellow-400 font-semibold">No default project selected</span>)
            return
        }
        try {
            await axios.post(requests.transpileProject(defaultPage))
            setRes(<span className="text-green-400 font-semibold">Project Transpiled Successfully</span>)
        } catch (error) {
            setRes(<span className="text-red-400 font-semibold">Error Transpiling Project</span>)
        }
    }

    return (
        <div className="fixed inset-0 bg-zinc-950 bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg shadow-xl border border-purple-500 w-full max-w-4xl max-h-[90vh] overflow-y-auto">

                <form onSubmit={updateUser} className="flex flex-col h-full">
                    <div className="sticky top-0 z-10 bg-gray-900 flex justify-between items-center p-6 border-b border-gray-700">
                        <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                        <button type="button" onClick={toClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="relative z-0 flex-grow overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1 space-y-6">
                                <div className="flex flex-col items-center">
                                    <label className="relative group cursor-pointer" htmlFor="avatar-upload">
                                        <img
                                            className="w-40 h-40 rounded-full object-cover border-4 border-purple-600 group-hover:opacity-75 transition-opacity duration-200"
                                            src={avatarPreview || "/placeholder.svg"}
                                            alt={userData.name}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <div className=" bg-purple-600 text-white p-2 rounded-full">
                                                <Upload size={24} />
                                            </div>
                                        </div>
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        className="hidden"
                                        name="avatar_path"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                                <InputField label="Name" name="name" defaultValue={userData.name} />
                                <InputField label="Email" name="email" defaultValue={userData.email} type="email" />
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-300 mb-2">
                                        About
                                    </label>
                                    <textarea
                                        id="about"
                                        className="w-full px-3 py-2 text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition duration-200"
                                        name="about"
                                        defaultValue={userData.about}
                                        rows={5}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Default portfolio</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-3 bg-gray-800 rounded-md border border-gray-700">
                                        {userProjects &&
                                            userProjects.map((p) => (
                                                <button
                                                    type="button"
                                                    key={p._id}
                                                    onClick={() => setDefaultPage(defaultPage === p._id ? null : p._id)}
                                                    className={`w-full text-left px-3 py-2 rounded-md transition duration-200 ${p._id === defaultPage
                                                        ? "bg-purple-600 text-white"
                                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                        }`}
                                                >
                                                    {p.title}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-700 space-y-4">
                        <div className="flex items-center justify-between">
                            {res && <div className="text-sm">{res}</div>}
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={handleTranspileProject}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 flex items-center"
                                >
                                    <Code size={18} className="mr-2" />
                                    Transpile Project
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-4">
                            <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 flex items-center"
                            >
                                <Trash2 size={18} className="mr-2" />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {isDeleteModalOpen && (
                <DeleteConfirmationModal onConfirm={handleDeleteAccount} onCancel={() => setIsDeleteModalOpen(false)} />
            )}
        </div>
    )
}

function InputField({ label, name, defaultValue, type = "text" }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <input
                id={name}
                className="w-full px-3 py-2 text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition duration-200"
                name={name}
                defaultValue={defaultValue}
                type={type}
            />
        </div>
    )
}

function DeleteConfirmationModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-xl font-bold text-white mb-4">Confirm Account Deletion</h3>
                <p className="text-gray-300 mb-6">
                    Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserProfileEditPanel

