import React, {useEffect, useState} from 'react';
import "./Zallar.css"
import SupperAdminPage from "../supperAdminPage/SupperAdminPage";
import apiCall from "../../ApiCall";
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import Rodal from "rodal";
import {toast, ToastContainer} from "react-toastify";
function Zallar() {
    const [company, setCompany] = useState([])
    const [open1, setOpen1] = useState(false)
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const navigate=useNavigate()
    const [currentItem, setCurrentItem] = useState("")
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_SUPER_ADMIN" || !localStorage.getItem("access_token")){
            navigate("/login")
        }
        else{
            getSuperAdminZal()
        }
    }, []);
    function getSuperAdminZal(){
        apiCall(`/super/get/company`).then(res=>setCompany(res.data))
            .catch(()=>navigate("/login"))
    }

    function addCompany() {
        if (name!==""&&country!=="") {
            if (currentItem === "") {
                apiCall(`/super/add/company`, "post", {
                    name,
                    cityName: country
                }).then(() => {
                    getSuperAdminZal()
                }).catch(()=>navigate("/login"))
            } else {
                apiCall(`/super/edit/company?companyId=${currentItem.id}`, "put", {
                    name,
                    cityName: country
                }).then(() => {
                    getSuperAdminZal()
                }).catch(()=>navigate("/login"))
            }
            setName("")
            setCountry("")
            setOpen1(false)
            setCurrentItem("")
        }else{
            toast.warning("inputni toldiring")
        }
    }

    function deleteCompany(id) {
        apiCall(`/super/delete/company?companyId=${id}`,"delete")
            .then(()=>getSuperAdminZal())
            .catch(()=>navigate("/login"))
    }

    function editCompany(c) {
        setCurrentItem(c)
        setName(c.name)
        setCountry(c.cityName)
        setOpen1(true)

    }

    function getCompanyId(id) {
        localStorage.setItem("companyId",id)
        navigate("/adminCRUDpage")
    }

    function rodalClose() {
        setName("")
        setCountry("")
        setOpen1(false)
        setCurrentItem("")
    }

    return (
        <div className={"background2"}>
            {
                localStorage.getItem("role")!=="ROLE_SUPER_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                    <Rodal height={300} visible={open1} onClose={rodalClose}>
                        <div className={"my-5"}>
                            <input
                                value={name} onChange={(e)=>setName(e.target.value)}
                                type={"text"} placeholder={"Name..."} className={"form-control my-4"}/>
                            <input
                                value={country} onChange={(e)=>setCountry(e.target.value)}
                                type={"text"} placeholder={"Country..."} className={"form-control my-4 "}/>
                            <button onClick={addCompany} className={"btn btn-success float-end "}><IoAddCircleOutline  style={{width:20,height:20}} /></button>
                        </div>
                    </Rodal>
                    <SupperAdminPage />
                    <div className={""}>
                        <button onClick={()=>setOpen1(true)} className={"btn btn-success m-3"}><IoAddCircleOutline  style={{width:20,height:20}} /></button>
                        <table id={"dd"}>
                            <thead>
                            <tr>
                                <th>t/r</th>
                                <th className={"py-3"}>name</th>
                                <th>country</th>
                                <th>add admin</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                company.map((c,i)=><tr id={"t"} key={c.id}>
                                    <td className={"py-3"}>{i+1}</td>
                                    <td className={"py-3"}>{c.name}</td>
                                    <td className={"py-3"}>{c.cityName}</td>
                                    <td>
                                        <button onClick={()=>getCompanyId(c.id)} className={"btn btn-info"}>admin<CiCirclePlus style={{width:20,height:20,marginLeft:5}} /></button>
                                    </td>
                                    <th>
                                        <button onClick={()=>editCompany(c)} className={"btn btn-warning "}><MdOutlineEdit /></button>
                                    </th>
                                    <th>
                                        <button onClick={()=>deleteCompany(c.id)} className={"btn btn-danger    "}> <MdDeleteOutline /></button>
                                    </th>

                                </tr>)
                            }
                            </tbody>
                        </table>
                        <ToastContainer/>

                    </div>
                </div>
            }
        </div>
    );
}

export default Zallar;

