import React from 'react';

export default function InputField({ label, name, defaultValue, type = "text" }) {
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
    );
}
