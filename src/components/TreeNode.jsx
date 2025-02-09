"use client"
import { useParams, usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, File, Folder, Loader2 } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import requests from "@/Networking/Requests";



export default function TreeNode({ name, level, currPath, redirectUrl }) {
  const pathname = usePathname();
  const params = useParams();

  const parts = pathname.split('/')
  const index = parts.indexOf('main');
  const rest = parts.slice(index + 1).join('/')

  const [isOpen, setIsOpen] = useState((level == 0 || rest.includes(currPath)))
  const [nodeData, setNodeData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function fetchDataload(path) {
    setIsLoading(true)
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + requests.getFolder_v2(params.userId, params.projectName, path),
        {
          method: 'GET',
          next: { revalidate: 60 },
          credentials: "include",
          cache: "force-cache"
        }
      )
      const data = await res.json()
      setNodeData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && !nodeData) {
      fetchDataload(currPath)
    }
  }, [isOpen, nodeData])


  const toggleOpen = () => {
    setIsOpen(!isOpen)
    // if(!nodeData) fetchDataload()
  }


  return (
    <div className="text-sm">
      {/* This is the main clickable button */}
      <div
        className={`flex items-center gap-1 py-1 px-2 hover:bg-gray-700/50 rounded-sm transition-colors ${isOpen && "bg-gray-700/30"}`}
        style={{ paddingLeft: `${level * 12 + 4}px` }}
      >
        <button
          className="p-1 rounded-sm hover:bg-gray-600/50 transition-colors"
          onClick={toggleOpen}
          aria-label={isOpen ? "Collapse folder" : "Expand folder"}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isOpen ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        <Link
          className="flex items-center gap-2 flex-grow py-1"
          href={`${redirectUrl}/tree/main/${nodeData?.data?.absPath || currPath}`}
        >
          <Folder size={16} className="text-blue-400" />
          <span>{name}</span>
        </Link>
      </div>

      {/* This holds the sub directories and files */}
      {isOpen && nodeData && (
        <div className="pl-4">
          {nodeData.folders &&
            nodeData.folders.map((child, index) => (
              <TreeNode
                key={index}
                name={child.name}
                level={level + 1}
                currPath={child.absPath.replace("\\", "/")}
                redirectUrl={redirectUrl}
              />
            ))}

          {nodeData.files &&
            nodeData.files.map((file, index) => {
              const isCurrFile = (rest == file.absPath && parts[3] == "blob")

              return <Link
                key={index}
                className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-700/50 rounded-sm transition-colors ${isCurrFile && "bg-gray-700/30"}`}
                href={`${redirectUrl}/blob/main/${file.absPath}`}
                style={{ paddingLeft: `${(level + 1) * 12 + 4}px` }}
              >
                <File size={16} className="text-gray-400" />
                <span>{file.name}</span>
              </Link>
            })}
        </div>
      )}
    </div>
  )
}

