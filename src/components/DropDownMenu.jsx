"use client"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useRef, useState } from "react";

function DropdownMenu({ title, children, isOpen, toOpen }) {
    const DropdownRef = useRef(null)

    const handleBlur = (e) => {
        if (DropdownRef.current && !DropdownRef.current.contains(e.relatedTarget)) {
            toOpen(false)
        }
    }

    return (
        <div className="relative" onBlur={handleBlur}>
            <button 
                className='flex gap-4 justify-between items-center border-2 border-gray-800 p-2 rounded-md hover:bg-gray-800 transition duration-300' 
                type='button' 
                onClick={toOpen}
            >
                <h1>{title}</h1>
                {isOpen ? <ChevronDownIcon size={24} /> : <ChevronRightIcon size={24} />}
            </button>

            {isOpen && (
                <div className="absolute flex flex-col gap-2 mt-1 p-2 border-2 border-gray-950 bg-gray-800 rounded-lg top-full right-0 w-max" ref={DropdownRef}>
                    {children}
                </div>
            )}
        </div>
    )
}

export default DropdownMenu;
