import React from 'react';
import { EditIcon, TrashIcon, X, Check } from 'lucide-react';

function EditorToolbar({ isEditing, setIsEditing, onSave, onDelete, permission }) {
    if (isEditing) {
        return (
            <div className='flex divide-x border-2 border-gray-600 rounded-md'>
                <button className='p-2 hover:bg-gray-700 text-white' onClick={() => setIsEditing(false)}>
                    <X size={24} />
                </button>
                <button className='p-2 hover:bg-green-700 text-white' onClick={onSave}>
                    <Check size={24} />
                </button>
            </div>
        );
    }

    return permission === "OWNER" ? (
        <div className='flex border-2 border-gray-600 rounded-md items-center divide-x'>
            <button className='flex gap-1 p-2 items-center hover:bg-gray-600' onClick={() => setIsEditing(true)}>
                <span>Edit</span><EditIcon size={20} />
            </button>
            <button className='flex gap-1 p-2 items-center hover:bg-gray-600' onClick={onDelete}>
                <span>Delete</span><TrashIcon size={20} />
            </button>
        </div>
    ) : null;
}

export default EditorToolbar;
