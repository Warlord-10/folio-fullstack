import axios from 'axios';
// const user = sessionStorage.getItem("JWT")
// console.log(user);
const user = "heoo"

const instance = axios.create({
    baseURL: "http://localhost:3005/",
    withCredentials: true,
    headers: {
        Authorization: "Bearer " + user,
    },
});
export default instance;