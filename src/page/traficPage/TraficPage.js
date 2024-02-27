import React, {useEffect, useState} from 'react';
import "./Trafic.css"
import Admin from "../adminPage/Admin";
import Rodal from "rodal";
import {IoAddCircleOutline} from "react-icons/io5";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import apiCall from "../../ApiCall";
import {toast, ToastContainer} from "react-toastify";
function TraficPage() {
    const [trafic, setTrafic] = useState([])
    const [open1, setOpen1] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [currentItem, setCurrentItem] = useState('')
    const [title, setTitle] = useState('')
    const [dayCount, setDayCount] = useState('')
    const navigate=useNavigate()
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_ADMIN"){
            navigate("/login")
        }else{
            getTrafic()
        }
    }, []);
    function getTrafic(){
        apiCall(`/admin/get/type`)
            .then(res=>setTrafic(res.data)).catch(()=>navigate("/login"))
    }

    function addTrafic() {
       if(name!==""&&price!==""&&title!==""&&dayCount!==""){
           if(currentItem===""){
               apiCall(`/admin/add/type`,"post",{name,price,title,dayCount})
                   .then(()=>{getTrafic()})
                   .catch(()=>navigate("/login"))
           }else{
               apiCall(`/admin/edit/type?typeId=${currentItem.id}`,"put",{name,price,title,dayCount})
                   .then(()=>{getTrafic()})
                   .catch(()=>navigate("/login"))
           }
           setDayCount("")
           setTitle("")
           setName("")
           setPrice("")
           setOpen1(false)
           setCurrentItem("")
       }
       else{
           toast.warning("inpni toldiring")
       }
    }

    function editTrafic(t) {
        setCurrentItem(t)
        setPrice(t.price)
        setName(t.name)
        setDayCount(t.dayCount)
        setTitle(t.title)
        setOpen1(true)
    }

    function deleteTrafic(id) {
        apiCall(`/admin/delete/type?typeId=${id}`,"delete")
            .then(()=>getTrafic())
            .catch(()=>toast("bu tarif faol !!"))
    }

    function closeRodal() {
        setDayCount("")
        setTitle("")
        setName("")
        setPrice("")
        setOpen1(false)
        setCurrentItem("")
    }

    return (
        <div className={"background2"}>
            {
                localStorage.getItem("role")!=="ROLE_ADMIN"?navigate("/login"):<div>
                    <Admin/>
                    <Rodal height={400} visible={open1} onClose={closeRodal}>
                        <div className={"my-5"}>
                            <input
                                value={name} onChange={(e)=>setName(e.target.value)}
                                type={"text"} placeholder={"Name..."} className={"form-control my-4"}/>
                            <input
                                value={price} onChange={(e)=>setPrice(e.target.value)}
                                type={"number"} placeholder={"price..."} className={"form-control my-4"}/>
                            <input
                                value={title} onChange={(e)=>setTitle(e.target.value)}
                                type={"text"} placeholder={"title..."} className={"form-control my-4 "}/>
                            <input
                                value={dayCount} onChange={(e)=>setDayCount(e.target.value)}
                                type={"number"} placeholder={"dayCount..."} className={"form-control my-4 "}/>
                            <button onClick={addTrafic} className={"btn btn-success float-end"}>save
                            </button>
                        </div>
                    </Rodal>
                    <div className={"my-3"}>
                        <button onClick={()=>setOpen1(true)} className={"btn btn-success my-3 mx-2"}><IoAddCircleOutline  style={{width:20,height:20}} /></button>
                        <table  id={"dd"}>
                            <thead>
                            <tr>
                                <th>t/r</th>
                                <th className={"py-3"}>day count</th>
                                <th>trafic name</th>
                                <th>trafic price</th>
                                <th>title</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                trafic.map((t,i)=><tr id={"t"} key={t.id}>
                                    <td>{i+1}</td>
                                    <th>{t.dayCount}</th>
                                    <td>{t.name}</td>
                                    <td>{t.price}</td>
                                    <td>{t.title}</td>
                                    <th>
                                        <button onClick={()=>editTrafic(t)} className={"btn btn-warning my-2"}><MdOutlineEdit /></button>
                                    </th>
                                    <th>
                                        <button onClick={()=>deleteTrafic(t.id)} className={"btn btn-danger"}> <MdDeleteOutline /></button>
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

export default TraficPage;