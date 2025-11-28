import React from 'react';
import { Upload } from "lucide-react";

export default function AvatarUpload({ avatarPreview, handleAvatarChange }) {
    return (
        <div className="flex flex-col items-center">
            <label className="relative group cursor-pointer" htmlFor="avatar-upload">
                <div className="w-40 h-40 rounded-full object-cover border-4 border-purple-600 group-hover:opacity-75 transition-opacity duration-200 overflow-hidden">
                    {avatarPreview}
                </div>

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
    );
}
