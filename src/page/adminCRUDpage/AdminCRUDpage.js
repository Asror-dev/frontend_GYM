import React, {useEffect, useState} from 'react';
import "./AdminCRUDpage.css"
import SupperAdminPage from "../supperAdminPage/SupperAdminPage";
import apiCall from "../../ApiCall";
import {IoAddCircleOutline} from "react-icons/io5";
import Rodal from "rodal";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-input-2";
import {MdDeleteOutline} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-phone-input-2/lib/style.css";


function AdminCruDpage() {
    const [admins, setAdmins] = useState([])
    const [open1, setOpen1] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('998')
    const [password, setPassword] = useState([])
    const navigate=useNavigate()
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_SUPER_ADMIN"|| !localStorage.getItem("access_token")){
            navigate("/login")
        }else{
            getAdmin()
        }
    }, []);
    function getAdmin(){
        apiCall(`/super/get/admin?key=${localStorage.getItem("access_token")}&companyId=${localStorage.getItem("companyId")}`)
            .then(res=>setAdmins(res.data)).catch(()=>navigate("/login"))
    }
    function addAdmin() {
        if(phone.length===12 && password.length>=4) {
            setPhone(phone.substring(1))
            apiCall(`/super/add/admin?key=${localStorage.getItem("access_token")}&companyId=${localStorage.getItem("companyId")}`, "post", {
                phone,
                firstName,
                lastName,
                password
            })
                .then(() => getAdmin()).catch(() => toast.warning("bunaqa telefon raqamli admin mavjud !!"))
            setOpen1(false)
            setFirstName("")
            setLastName("")
            setPassword("")
            setPhone("998")
        }else{
            toast.warning("siz parol yoki telefon raqamda xato qildingiz !!!!!")
        }
    }

    function deleteAdmin(id) {
        apiCall(`/super/delete/admin?key=${localStorage.getItem("access_token")}&adminId=${id}`,"delete")
            .then(()=>getAdmin())
            .catch(()=>navigate("/login"))
    }

    return (
        <div className={"background2"}>
            {
                localStorage.getItem("role")!=="ROLE_SUPER_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                    <SupperAdminPage/>
                    <Rodal height={400} visible={open1} onClose={() => setOpen1(false)}>
                        <div className={"my-5"}>
                            <PhoneInput
                                inputStyle={{ width: "100%" }}
                                country={"uz"}
                                value={phone}
                                onChange={(e) => setPhone(e)}
                                className={"phoneInp"}
                            />
                            <input
                                value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                                type={"text"} placeholder={"firstName..."} className={"form-control my-4 "}/>
                            <input
                                value={lastName} onChange={(e)=>setLastName(e.target.value)}
                                type={"text"} placeholder={"lastName..."} className={"form-control my-4 "}/>
                            <input
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                type={"password"} placeholder={"password..."} className={"form-control my-4 "}/>
                            <button onClick={addAdmin} className={"btn btn-success float-end"}><IoAddCircleOutline  style={{width:20,height:20}} /></button>
                        </div>
                    </Rodal>
                    <div className={""}>
                        <button onClick={()=>setOpen1(true)} className={"btn btn-success m-3"}><IoAddCircleOutline  style={{width:20,height:20}} /></button>
                        <table  id={"dd"}>
                            <thead>
                            <tr>
                                <th>t/r</th>
                                <th className={"py-3"}>firstName</th>
                                <th>lastName</th>
                                <th>phone</th>
                                <th>delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                admins.map((a,i)=><tr id={"t"} key={a.id}>
                                    <th className={"py-3"}>{i+1}</th>
                                    <th className={"py-3"}>{a.firstName}</th>
                                    <th className={"py-3"}>{a.lastName}</th>
                                    <th className={"py-3"}>{a.phone}</th>
                                    <th>
                                        <button onClick={()=>deleteAdmin(a.id)} className={"btn btn-danger"}> <MdDeleteOutline /></button>
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

export default AdminCruDpage;