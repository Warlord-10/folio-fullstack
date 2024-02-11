import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import UserEditScreen from "@/components/UserEditScreen";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Page() {
    const cookieStore = cookies();
    try {
        const jwt = cookieStore.get("accessToken");
        const response = await axios.get(requests.getDeleteUpdateUserById(null), {
            headers: {
                "Cookie": `${jwt.name}=${jwt.value}`
            }
        });
    
        return <UserEditScreen data = {await response.data}/>
    } catch (error) {
        return redirect("/auth/login")
    }
}

