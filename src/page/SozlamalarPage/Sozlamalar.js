import React, {useEffect, useState} from 'react';
import "./Sozlamalar.css"
import SupperAdminPage from "../supperAdminPage/SupperAdminPage";
import apiCall from "../../ApiCall";
import Rodal from "rodal";
import {IoAddCircleOutline} from "react-icons/io5";
import PhoneInput from "react-phone-number-input";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
function Sozlamalar() {
    const [superAdmin, setSuperAdmin] = useState('')
    const [open1, setOpen1] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate()
    useEffect(() => {
       if(localStorage.getItem("role")!=="ROLE_SUPER_ADMIN"|| !localStorage.getItem("access_token")){
           navigate("/login")
       }else{
           getSuperAdmin()
       }
    }, []);
    function getSuperAdmin(){
        apiCall(`/super/admin/get?id=${localStorage.getItem("user_id")}`)
            .then(res=>{setSuperAdmin(res.data)})
            .catch(()=>navigate("/login"))
    }

    function edit() {
        setFirstName(superAdmin.firstName)
        setLastName(superAdmin.lastName)
        setPhone(superAdmin.phone)
        setOpen1(true)
    }

    function editSuperAdmin() {
        apiCall(`/super/admin/edit?id=${localStorage.getItem("user_id")}`,"put",{phone,password,firstName,lastName})
            .then(()=>getSuperAdmin())
            .catch(()=>navigate("/login"))
        setPhone("")
        setFirstName("")
        setLastName("")
        setPhone("")
        setOpen1(false)
        navigate("/login")
    }

    return (
        <div className={"background2"}>
            {
                localStorage.getItem("role")!=="ROLE_SUPER_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                    <SupperAdminPage/>
                    <Rodal height={400} visible={open1} onClose={() => setOpen1(false)}>
                        <div className={"my-5"}>
                            <input
                                value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                                type={"text"} placeholder={"FirstName..."} className={"form-control my-4"}/>
                            <input
                                value={lastName} onChange={(e)=>setLastName(e.target.value)}
                                type={"text"} placeholder={"Country..."} className={"form-control my-4"}/>
                            <PhoneInput
                                className={"w-100"}
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="UZ"
                                value={phone}
                                onChange={setPhone}
                                id={'a'}
                            />
                            <input
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                type={"password"} placeholder={"password..."} className={"form-control my-4"}/>
                            <button onClick={editSuperAdmin} className={"btn btn-success float-end"}><IoAddCircleOutline  style={{width:20,height:20}} /></button>
                        </div>
                    </Rodal>
                    <div className={"eee"}>
                        <div className={"settingsDiv"}>
                            <h4 className={"text-center my-2"}>Setting</h4>
                            <ul className={"list-group p-3 gap-3"}>
                                <li className={"list-group-item"}>FirstName : {superAdmin.firstName}</li>
                                <li className={"list-group-item"}>LastName : {superAdmin.lastName}</li>
                                <li className={"list-group-item"}>Phone : {superAdmin.phone}</li>
                                <li className={"list-group-item"}>Password : *******</li>
                            </ul>
                            <button onClick={edit} className={"btn btn-success float-end mx-3"}>Edit</button>
                        </div>

                    </div>
                    <ToastContainer/>
                </div>
            }
        </div>
    );
}

export default Sozlamalar;