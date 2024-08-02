"use client"
import { React, useRef, useState, useEffect } from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from 'next/link';
import "./SearchBar.css"

const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [lastApiCall, setLastApiCall] = useState(Date.now());
    const [isListVisible, setIsListVisible] = useState(false);
    
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsExpanded(false);
                setIsListVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setIsExpanded(true);
        setIsListVisible(true);
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        searchUser(e.target.value);
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchData(null);
        setIsExpanded(false);
        setIsListVisible(false);
        inputRef.current.focus();
    };

    const searchUser = async (name) => {
        const now = Date.now();
        const timeSinceLastCall = now - lastApiCall;
        if (timeSinceLastCall < 1000 || !name || name.trim() === '') {
            return;
        }
        setLastApiCall(now);
        const response = await axios.get(requests.getSearchUser(name));
        setSearchData(response.data);
        setIsListVisible(true);
    }

    return (
        <div
            ref={containerRef}
            className={`search-bar-parent flex flex-col relative transition-all duration-300 ease-in-out text-[1rem] ${isExpanded ? 'w-1/2' : 'w-64'}`}
        >
            <div className='flex rounded-md overflow-hidden bg-gray-900 border border-gray-700'>
                <input
                    ref={inputRef}
                    className='search-bar py-2 px-3 text-sm text-white bg-transparent font-mono w-full outline-none transition-all duration-300 ease-in-out placeholder-gray-500'
                    type='text'
                    name='search'
                    placeholder='Discover creative minds...'
                    autoComplete='off'
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                />
                <button
                    className='text-gray-400 bg-transparent px-3 hover:text-white transition-colors duration-200'
                    onClick={handleClear}
                >
                    {searchValue ? 'X' : 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                </button>
            </div>
            {searchData && isListVisible && (
                <div className="search-list backdrop-blur-md top-full absolute flex flex-col w-full rounded-md p-1 mt-1 border border-gray-700 gap-y-1 max-h-[200px] overflow-y-scroll bg-gray-900 bg-opacity-90">
                    {searchData.map((user) => (
                        <Link
                            href={`/profile/${user._id}`}
                            key={user._id}
                            className='flex justify-between items-center hover:bg-gray-800 p-1.5 rounded text-sm transition-colors duration-200'
                            onClick={() => setIsExpanded(true)}
                        >
                            <span className='text-white'>{user.name}</span>
                            <span className='text-xs text-gray-400'>{user._id}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;