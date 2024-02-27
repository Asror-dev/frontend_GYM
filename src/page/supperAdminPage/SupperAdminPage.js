import React, {useEffect} from 'react';
import "./SupperAdmin.css"
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"


function SupperAdminPage() {
    const navigate=useNavigate()
    useEffect(() => {
        if(localStorage.getItem("role")!=="ROLE_SUPER_ADMIN"|| !localStorage.getItem("access_token")){
            navigate("/login")
        }else {
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
        <div className={"background"}>
            {
                localStorage.getItem("role")!=="ROLE_SUPER_ADMIN"|| !localStorage.getItem("access_token")?navigate("/login"):<div>
                    <div className="menu">
                        <div className="container flex">
                            <div className="mobile-btn">
                                <ion-icon name="grid"></ion-icon>
                            </div>
                            <div className="logo">
                            </div>
                            <ul className="nav text-white cursor">
                                <li className="nav-item" onClick={()=>navigate("/zallar")}>Zallar</li>
                                <li className="nav-item" onClick={()=>navigate("/sozlamalar")}>Sozlamalar</li>
                                <li className="nav-item" onClick={logOut}>Exit</li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default SupperAdminPage;