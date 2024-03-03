import axios from 'axios';
const user = "heoo"


const instance = axios.create({
    baseURL: process.env.NODE_ENV==="development" 
        ?process.env.NEXT_PUBLIC_DEV_URL 
        :process.env.NEXT_PUBLIC_PROD_URL,
    withCredentials: true,
    headers: {
        Authorization: "Bearer " + user,
    },
});
export default instance;