import React from 'react';

export default function ProjectSelector({ userProjects, defaultPage, setDefaultPage }) {
    return (
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
                    ))
                }
                <input name="user_portfolio" id="user_portfolio" value={defaultPage || ''} className="hidden" readOnly />
            </div>
        </div>
    );
}
