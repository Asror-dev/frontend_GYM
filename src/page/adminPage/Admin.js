import React, { useEffect } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('role') !== 'ROLE_ADMIN'|| !localStorage.getItem("access_token")) {
            navigate('/login');
        }
    }, []);

    function logOut() {
        localStorage.removeItem("phone")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("fullName")
        localStorage.removeItem("role")
        navigate("/login")
    }

    return (
        <div className={""}>
            {localStorage.getItem('role') !== 'ROLE_ADMIN'|| !localStorage.getItem("access_token") ? (
                navigate('/login')
            ) : (
                <div>
                    <div className="menu">
                        <div className="container flex">
                            <div className="mobile-btn">
                                <ion-icon name="grid"></ion-icon>
                            </div>
                            <div className="logo">
                               <div className={"nameDiv"}>
                                   <img
                                       style={{ width: 30, height: 30, borderRadius: 50, marginLeft: 10,marginTop:6 }}
                                       src={'https://kafyrkumux-r82.gosweb.gosuslugi.ru/netcat_files/9/261/2gEf8_agn8U_0.jpg'}
                                   />
                                   <h4 className={'text-white my-2 mx-5'}>{localStorage.getItem('fullName')}</h4>

                               </div>
                            </div>

                            <ul className="nav cursor text-white">
                                <li className="nav-item" onClick={()=>navigate("/users")}>Userlar tarixi</li>
                                <li className="nav-item" onClick={()=>navigate("/users2")}>Userlar</li>
                                <li className="nav-item" onClick={()=>navigate("/trafic")}>Tariflar</li>
                                <li className="nav-item" onClick={()=>navigate("/hisobot")}>Hisobot</li>
                                <li className="nav-item" onClick={logOut}>Exit</li>
                            </ul>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            )}
        </div>
    );
}

export default Admin;
