"use client"
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import CodeScreen from "@/components/CodeScreen";
import { useEffect, useState } from "react";

export default function Page({params}) {
  const [projectData, setProjectData] = useState(null);
  const [userPermission, setUserPermission] = useState(null);

  useEffect(()=>{
    const fetchProjectData = async ()=>{
      const response = await axios.get(requests.getUpdateDeleteProjectById(params.projectId))
      setProjectData(response.data.data)
      setUserPermission(response.data.PERMISSION)
    }
    fetchProjectData()
  }, [params.projectId])

  try {
    return (
      <div className="bg-gray-950">
        { projectData &&
          <CodeScreen 
            projectData={projectData} 
            data={projectData.root} 
            permission={userPermission}
          /> // passing the root folder id
        }
      </div>
    )
  } catch (error) {

  }
}
