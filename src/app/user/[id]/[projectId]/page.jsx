import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import CodeScreen from "@/components/CodeScreen";

export default async function page({params}) {
  
  try {
    const response = await axios.get(requests.getUpdateDeleteProjectById(params.projectId))
    console.log("Project data: ", response.data)
    return (
      <CodeScreen data={response.data.root}/> // passing the root folder id
    )
  } catch (error) {
    <div>error</div>
  }
}