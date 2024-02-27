import React, {useEffect, useState} from 'react';
import Admin from "../adminPage/Admin";
import {useNavigate} from "react-router-dom";
import Rodal from "rodal";
import "./User2.css"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {IoAddCircleOutline} from "react-icons/io5";
import apiCall from "../../ApiCall";
import {toast, ToastContainer} from "react-toastify";
import button from "bootstrap/js/src/button";
function User() {
    const navigate=useNavigate()
    const [open1, setOpen1] = useState(false)
    const [phone, setPhone] = useState('998')
    const [trafic, setTrafic] = useState([])
    const [select, setSelect] = useState('')
    const [users, setUsers] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [visible, setVisible] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [select2, setSelect2] = useState('')
    const [phone2, setPhone2] = useState('')
    const [inp, setInp] = useState('')
    const [phone3, setPhone3] = useState('')
    const [phone4, setPhone4] = useState('')
    const [subId, setSubId] = useState('')
    const [aa, setAa] = useState('')
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")){
            navigate("/login")
        }else {
            getTrafic()
            appealGetSearch("")
        }
    }, []);
    function appealGetSearch(value) {
        apiCall(`/subscription/get/check?&searchText=${value}`)
            .then(res => {
                setUsers(res.data)
            }).catch(()=>{navigate("/login")})
        setInp(value)

    }
    function getTrafic() {
        apiCall(`/admin/get/type`)
            .then(res => setTrafic(res.data)).catch(() => navigate("/login"))
            .catch(()=>{navigate("/login")})
    }
    function addUser() {
       if(firstName!==""&&lastName!==""&&phone!==""){
           apiCall(`/register?typeId=${select}`,"POST",{firstName,lastName,phone})
               .then(()=>{appealGetSearch("")
           setOpen1(false)
           setPhone("998")
           setLastName("")
           setFirstName("")
           setSelect("")})
               .catch(()=>{toast.warning("bunaqa telefon raqamli user mavjud !!")})
       }else{
           toast.warning("inputni toldiring")
       }
    }
    // http://192.168.0.117:3000
    function tasdiqlash(subscriptionId,phone,firstName) {
        setAa(firstName)
        setSubId(subscriptionId)
        setPhone4(phone)
       setOpen3(true)
    }

    function tarifAdd(phone) {
        setPhone2(phone)
        setOpen2(true)
    }

    function traficAdd() {
      if(select2===""){
          toast.warning("selectni kim tanlaydi !!")
      }else{
          apiCall(`/subscription/add?phone=${phone2}&typeId=${select2}`,"post")
              .then(()=>{appealGetSearch(inp)})
              .catch(()=>{navigate("/login")})
          setPhone2("")
          setOpen2(false)
          setSelect2("")
      }
    }

    function tasdiqlashRadal() {
        setPhone3(phone4)
        apiCall(`/check/add?subId=${subId}`,"post")
            .then(()=>{appealGetSearch(inp)
                setVisible(true)
                setTimeout(()=>{setPhone3("")},10000)
            }).catch(()=>{navigate("/login")})
        setOpen3(false)
    }

    function editSubscription(subscriptionId) {
        apiCall(`/subscription/edit?subId=${subscriptionId}`,"put").then(res=>{
            appealGetSearch(inp)
        })
    }

    return (
        <div className={"background2"}>
            {
                localStorage.getItem("role")!=="ROLE_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                    <Admin/>
                    <Rodal height={400} visible={open1} onClose={() => setOpen1(false)}>
                        <div >
                            <PhoneInput
                                inputStyle={{ width: "100%" }}
                                country="UZ"
                                value={phone}
                                onChange={setPhone}
                                placeholder="Telefon numarası girin"
                                className="phoneInp my-4"
                            />
                            <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                                   className={"form-control my-4"} type={"text"} placeholder={"firstName"}/>
                            <input value={lastName} onChange={(e)=>setLastName(e.target.value)}
                                className={"form-control my-4"} type={"text"} placeholder={"lastName"}/>

                            <select value={select}  onChange={(e)=>setSelect(e.target.value)} className={"form-select"}>
                                <option value={""} selected={true} disabled={true}>Tariflar....</option>
                                {
                                    trafic.map(t=><option value={t.id} key={t.id}>{t.name}</option>)
                                }
                            </select>
                            <button onClick={addUser} className={"btn btn-success float-end my-3"}>qo'shish</button>
                        </div>
                    </Rodal>
                    <Rodal height={150} visible={open2} onClose={() => setOpen2(false)}>
                        <select value={select2}  onChange={(e)=>setSelect2(e.target.value)} className={"form-select my-3"}>
                            <option value={""}  selected={true} disabled={true}>Tariflar....</option>
                            {
                                trafic.map(t=><option value={t.id} key={t.id}>{t.name}</option>)
                            }
                        </select>
                        <button onClick={traficAdd} className={"btn btn-success float-end"}>qo'shish</button>
                    </Rodal>
                    <Rodal height={150} visible={open3} onClose={() => setOpen3(false)}>
                            <h5 className={"text-center my-3"}>Rostan ham {aa} zalga k  iritmoqchimisiz !!!</h5>
                            <button onClick={tasdiqlashRadal} className={"btn btn-success float-end"}>Tasdiqlash</button>
                    </Rodal>
                    <div className={"searchInput d-flex"}>
                        <button onClick={()=>setOpen1(true)} className={"btn btn-success m-3"}><IoAddCircleOutline  style={{width:20,height:20}} /></button>
                        <input  className={"form-control h-25 my-3 i"} onChange={(e) => appealGetSearch(e.target.value)}
                                type={"number"} placeholder={`search number                               🔍`}/>
                    </div>
                    <div className={"my-3"}>
                        <table id={"dd"}>
                            <thead>
                            <tr>
                                <th>t/r</th>
                                <th className={"py-3"}>firstName</th>
                                <th>phone</th>
                                <th>dayCount</th>
                                <th>endTime</th>
                                <th>subscriptionType</th>
                                <th>action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((u,i)=><tr id={"t"} key={u.id}>
                                    <td>{i+1}</td>
                                    <td className={"py-3"}>{u.firstName}</td>
                                    <td>+{u.phone}</td>
                                    <td>{u.dayCount}</td>
                                    <td>{u.endTime===null?"start ":u.endTime}</td>
                                    <td>{u.subscriptionType}</td>
                                    <td>
                                        {
                                            u.endTime===null?<button onClick={()=>editSubscription(u.subscriptionId)} className={"btn btn-info boshlashBtn"}>Boshlash</button>:u.status===true?<button  disabled={u.phone===phone3} onClick={()=>tasdiqlash(u.subscriptionId,u.phone,u.firstName)} className={"btn btn-success boshlashBtn"}>Tasdiqlash</button>:
                                                <button onClick={()=>tarifAdd(u.phone)} className={"btn btn-danger"}>Tarif qo'shish</button>
                                        }
                                    </td>
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