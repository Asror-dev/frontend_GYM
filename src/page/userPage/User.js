import React, {useEffect, useState} from 'react';
import "./user.css"
import Admin from "../adminPage/Admin";
import {useNavigate} from "react-router-dom";
import {MdDeleteOutline} from "react-icons/md";
import apiCall from "../../ApiCall";
import Rodal from "rodal";
import {ToastContainer} from "react-toastify";
function User() {
    const navigate=useNavigate()
    const [users, setUsers] = useState([])
    const [open1, setOpen1] = useState(false)
    const [id2, setId2] = useState('')
    const [name, setName] = useState('')
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")){
            navigate("/login")
        }else {
            getUser()
        }
    }, []);

    function getUser(){
        apiCall(`/subscription/get`)
            .then(res=>setUsers(res.data))
            .catch(()=>navigate("/login"))
    }

    function deleteUser(user) {
        setId2(user.userId)
        setName(user.firstName)
        setOpen1(true)
    }

    function deleteUser2() {
        apiCall(`/user/delete?userId=${id2}`,"delete")
            .then(()=>getUser())
            .catch(()=>navigate("/login"))
        setOpen1(false)
    }

    function navigateUserHistory(t) {
        navigate("/history")
        localStorage.setItem("userIdHistory",t.userId)
        localStorage.setItem("firstNameHistoryUser",t.firstName)
        localStorage.setItem("phoneHistoryUser",t.phone)
        localStorage.setItem("userIdHistoryUser",t.userId)
    }

    return (
        <div className={"background2"}>
            {
                localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                    <Admin/>
                    <Rodal height={200} visible={open1} onClose={() => setOpen1(false)}>
                        <div className={"card my-4"}>
                            <h5 className={"text-center"}>Siz shu "{name}" userni o'chirmoqchimisiz</h5>
                        </div>
                        <button onClick={deleteUser2} className={"btn btn-danger float-end "}> <MdDeleteOutline /></button>
                    </Rodal>
                    <div className={"my-5"}>
                        <table  id={"dd"}>
                            <thead>
                            <tr>
                                <th>T/r</th>
                                <th className={"py-3"}>Ism</th>
                                <th>Obuna tugash vaqti</th>
                                <th>Tarif</th>
                                <th>phone</th>
                                <th>Qolgan kunlar</th>
                                <th>History</th>
                                <th>delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((t,i)=><tr id={"t"} key={t.id}>
                                    <td>{i+1}</td>
                                    <td>{t.firstName}</td>
                                    <td>{t.endTime}</td>
                                    <td>{t.subscriptionType}</td>
                                    <td>{t.phone}</td>
                                    <td>{t.dayCount}</td>
                                    <td>
                                        <button onClick={()=>navigateUserHistory(t)} className={"btn btn-info my-2"}>History</button>
                                    </td>
                                    <th>
                                        <button onClick={()=>deleteUser(t)} className={"btn btn-danger"}> <MdDeleteOutline /></button>
                                    </th>
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

export default User;