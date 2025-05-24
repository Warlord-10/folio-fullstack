import requests from "@/Networking/Requests";
import React from 'react'
import { format, set } from 'date-fns';
import { CircleIcon, User } from "lucide-react";
import Link from "next/link";
import { Settings } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


// On every load it will fetch the project data and user permission
function makeGraph(data) {
    const totalBytes = data.bytes;
    const results = data.results;

    return (
        Object.keys(results).map(key => {
            const val = results[key];
            const percentage = (val.bytes / totalBytes) * 100;

            return (
                <div key={key} style={{
                    backgroundColor: val.color, width: `${percentage}%`, height: '100%'
                }}>
                </div>
            );

        })
    )
}

function ProjectPageDetailSection({ owner_data, project_data, metadata }) {
    return (
        <div>
            <div className="border-b-2 border-gray-800 pb-4">
                <h1 className="text-2xl font-semibold mb-4 border-b-2 border-gray-800 pb-2">Details {/* <Settings size={16} /> */}</h1>
                <HoverCard>
                    <HoverCardTrigger className="text-lg flex items-center gap-2 m-0 cursor-pointer">
                        <User size={20} strokeWidth={3} />
                        <h1 className="text-lg"> {owner_data.name}</h1>
                    </HoverCardTrigger>
                    <HoverCardContent className="p-2 w-full bg-gray-800">
                        <Link href={`/profile/${owner_data._id}`} className="flex items-center gap-2 justify-between hover:text-blue-400">
                            <h1 className="text-lg font-semibold"> {owner_data.name}</h1>
                            <img className="w-10 h-10 rounded-full border-black border-2" src={requests.publicFiles(`${owner_data._id}/avatar.jpeg`) || "#"} alt="profile pic" />
                        </Link>
                    </HoverCardContent>
                </HoverCard>

                <h1>Created: {format(new Date(project_data.createdAt), "dd/MM/yy")}</h1>
                <h1>Updated: {format(new Date(project_data.updatedAt), "dd/MM/yy")}</h1>
            </div>
            <div className="border-b-2 border-gray-800 pb-4">
                <h1 className="text-lg font-semibold mb-2">Description</h1>
                <h1>{project_data.description}</h1>
            </div>
            <div>
                <h1 className="text-lg font-semibold mb-2">
                    Languages
                </h1>
                <div className="overflow-hidden flex rounded-full h-3 border-2">
                    {makeGraph(metadata)}
                </div>
                <div className="flex flex-col mt-2">{
                    Object.keys(metadata.results).map(key => {
                        const val = metadata.results[key];
                        return (
                            <div key={key} className="flex items-center gap-2">
                                <CircleIcon fill={`${val.color}`} className="p-1.5" />
                                <span>{key}</span>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default ProjectPageDetailSection