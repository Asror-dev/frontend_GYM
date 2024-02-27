import React, {useEffect, useState} from 'react';
import "./TolovTarixi.css"
import Admin from "../adminPage/Admin";
import apiCall from "../../ApiCall";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
function TolovTarixi() {
    const [tolovTarixi, setTolovTarixi] = useState([])
    const navigate=useNavigate()
    const [total, setTotal] = useState('')
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")){
            navigate("/login")
        }else {
            getTolov()
        }
    }, []);
    function getTolov(){
        let userId=   localStorage.getItem("userIdHistoryUser")
       apiCall(`/subscription/get/user?key=${localStorage.getItem("access_token")}&userId=${userId}`)
           .then(res=>{
               setTolovTarixi(res.data.paymentHistoryProjections)
                setTotal(res.data.totalPrice)})
           .catch(()=>navigate("/login"))
    }
    return (
        <div className={"background2"}>

            { localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                <Admin/>
                <div className={"card3 text-white m-4"}>
                    <h5>Keltirilgan daromad : {total} </h5>
                </div>
                <div className={"my-5"}>
                    <table  id={"dd"}>
                        <thead>
                        <tr>
                            <th>T/r</th>
                            <th className={"py-3"}>typeName</th>
                            <th>startTime</th>
                            <th>endTime</th>
                            <th>price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tolovTarixi.map((t,i)=><tr id={"t"} key={t.id}>
                                <td className={"p-3"}>{i+1}</td>
                                <td>{t.typeName}</td>
                                <td>{t.startTime}</td>
                                <td>{t.endTime}</td>
                                <td>{t.price}</td>
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

export default TolovTarixi;