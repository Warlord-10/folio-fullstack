import React, { useState } from "react"
import { fetchClient } from '@/Networking/FetchInstanceClient'
import requests from "@/Networking/Requests"
import { X, Code, Trash2 } from "lucide-react"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'
import UserProfileImage from "@/components/UserProfileImage";
import AvatarUpload from "./AvatarUpload";
import ProjectSelector from "./ProjectSelector";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";
import InputField from "./InputField";
import { usePopUp } from '@/hooks/usePopUp';
import useSettingStore from '@/Stores/settingStore';


function UserProfileEditPanel({ userData, userProjects, toClose, setUserData }) {
    const router = useRouter();

    const [defaultPage, setDefaultPage] = useState(userData.user_portfolio)
    const setSettings = useSettingStore((state) => state.setSettings)
    const { PopUp: DeletePopup, open: openDeleteModal, close: closeDeleteModal } = usePopUp();
    const [avatarPreview, setAvatarPreview] = useState(<UserProfileImage userData={userData} />)


    const updateUser = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)

            const response = await fetchClient(requests.getDeleteUpdateUserById(userData._id), {
                method: "PATCH",
                data: formData,
            })

            toast.success("Profile Updated Successfully")
            setUserData(response.data)
            setDefaultPage(response.data.user_portfolio)
        } catch (error) {
            toast.error("Error Updating Profile")
        }
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(<img src={reader.result} alt="user" className='aspect-square w-full h-full' />)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDeleteAccount = async (e) => {
        if (e) e.preventDefault();
        try {
            await fetchClient(requests.getDeleteUpdateUserById(userData._id), {
                method: "DELETE",
            })
            toast.success("Account Deleted Successfully")
            router.replace("/home")
        } catch (error) {
            toast.error("Error Deleting Account")
        } finally {
            closeDeleteModal()
        }
    }

    const handleTranspileProject = async () => {
        if (!defaultPage) {
            toast.error("No default project selected")
            return
        }

        try {
            // Returns as soon as the build is QUEUED; live progress streams to the Terminal.
            await fetchClient(requests.transpileProject(defaultPage), { method: "POST" });
            setSettings({ isTerminalOpen: true }); // surface the live build log
            toast.success("Build queued — watch the terminal for progress");
        } catch (error) {
            // e.g. 429 "Build limit reached. Try again in N minutes."
            toast.error(error.message || "Failed to start build");
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
                                <AvatarUpload
                                    avatarPreview={avatarPreview}
                                    handleAvatarChange={handleAvatarChange}
                                />
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
                                <ProjectSelector
                                    userProjects={userProjects}
                                    defaultPage={defaultPage}
                                    setDefaultPage={setDefaultPage}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-700 space-y-4">
                        <div className="flex items-center justify-between">
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
                                onClick={() => openDeleteModal()}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 flex items-center"
                            >
                                <Trash2 size={18} className="mr-2" />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <DeletePopup
                onConfirm={handleDeleteAccount}
                title="Confirm Account Deletion"
                confirmTitle="Delete Account"
            >
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-gray-300'>Are you sure you want to delete your account? This action cannot be undone.</p>
                </div>
            </DeletePopup>
        </div>
    )
}

export default UserProfileEditPanel

