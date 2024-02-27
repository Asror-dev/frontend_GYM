import axios from "axios";

export default function (url,method="GET",data){
    return axios({
        baseURL:"http://localhost:8080",
        url,
        method,
        data,
        headers :{
            key:localStorage.getItem("access_token")
        }
    })
}