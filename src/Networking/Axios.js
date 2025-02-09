import axios from 'axios';
const user = "hello"


const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
    withCredentials: true,
    headers: {
        Authorization: "Bearer " + user,
    },
});
export default instance;