"use server"
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

export async function loginFormFunction(formData) {
    try {
        const dataToSend = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        // Make a PUT request using Axios
        const response = await axios.post(requests.userLogin(), dataToSend);
        // setCookie('token', response.data.token, {
        //     maxAge: 30 * 24 * 60 * 60,
        //     path: '/'
        // });
        // setCookie('user', response.data.user, {
        //     maxAge: 30 * 24 * 60 * 60,          
        // });

        return response;
    } catch (error) {
        return response;
    }
}
