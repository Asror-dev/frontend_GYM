import React, {useEffect, useState} from 'react';
import "./History.css"
import Admin from "../adminPage/Admin";
import apiCall from "../../ApiCall";
import {MdDeleteOutline} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
function History() {
    const [historyUser, setHistoryUser] = useState([])
    const navigate=useNavigate()
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")){
            navigate("/login")
        }else {
            getHistory()
        }
    }, []);
    function getHistory(){
        let userId=localStorage.getItem("userIdHistory")
        apiCall(`/check/get/${userId}`)
            .then(res=>setHistoryUser(res.data)).catch(()=>navigate("/login"))
    }
    return (
        <div className={"background2"}>
            {
                localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                    <Admin/>
                    <div className={"g"}>
                        <div className={"text-white card3 m-3 d-flex "}>
                            <div>
                                <h5>Name : {localStorage.getItem("firstNameHistoryUser")}</h5>
                            </div>
                            <div className={"mx-3 float-end"}>
                                <h5>Phone : {localStorage.getItem("phoneHistoryUser")}</h5>
                            </div>
                        </div>
                    </div>
                    <button className={"btn btn-dark k float-end mx-2 "} onClick={()=>navigate("/tolovTarixi")}>To'lov tarixi</button>

                    <div className={"p-2 rr row justify-content-center "}>

                        <table id={"dd"}>
                            <thead>
                            <tr>
                                <th className={"py-3"}>t/r</th>
                                <th>date</th>
                                <th>time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                historyUser.map((h,i)=><tr id={"t"} key={h.id}>
                                    <td className={"py-3"}>{i+1}</td>
                                    <td>{h.date}</td>
                                    <td>{h.time}</td>
                                </tr>)
                            }
                            </tbody>
                        </table>


                    </div>
                    <ToastContainer/>
                </div>
            }
        </div>
    );
}

export default History;