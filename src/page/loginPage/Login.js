import React, {useState} from 'react';
import PhoneInput from "react-phone-input-2";
import {Input} from "antd";
import "./login.css"
import "react-phone-input-2/lib/style.css";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    function loginCheck() {
        if (phone.length === 12 && password.length >= 4) {
           axios.post("http://localhost:8080/login",{phone,password}).then(res => {
                localStorage.setItem("access_token", res.data.access_token)
                localStorage.setItem("fullName", res.data.fullName)
                localStorage.setItem("role", res.data.role)
                localStorage.setItem("phone", res.data.phone)
                localStorage.setItem("user_id", res.data.id)
                localStorage.setItem("refresh_token", res.data.refresh_token)
                if (res.data.role === "ROLE_ADMIN") {
                    navigate("/admin")
                }
                if (res.data.role === "ROLE_SUPER_ADMIN") {
                    navigate("/superAdmin")
                }
            }).catch(() => {
                toast.error("parol yoki telefon raqam noto'g'ri")
            })

        } else {
            toast.warning("parol yoki telefon raqamni to'ldirmadingiz")
        }
    }
    return (
        <div>
            <div className="menu">
                <div className="container flex">
                    <div className="mobile-btn">
                        <ion-icon name="grid"></ion-icon>
                    </div>
                    <div className="logo">
                    </div>

                    <ul className="nav cursor text-white">
                        <li className="nav-item" onClick={() => navigate("/")}>Home</li>
                        <li className="nav-item"><a href="https://t.me/gym_club_bot">Subscribe</a></li>
                    </ul>
                </div>
            </div>

            <header className="header">
                <div className="container flex">
                    <div className="text">
                        <div className={"box7"}>
                            <h4 className={"text-center my-5"}>Log in</h4>
                            <PhoneInput
                                inputStyle={{ width: "100%" }}
                                country={"uz"}
                                value={phone}
                                onChange={(e) => setPhone(e)}
                                className={"phoneInp"}
                            />
                            <Input.Password
                                size={"middle"}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder={"Type a password..."}
                                className={"my-4"}

                            />
                            <button
                                onClick={loginCheck}
                                className={"btnColor"}
                            >
                                Login
                            </button>
                        </div>

                    </div>

                    <div className="visual">
                        <img
                            src="https://raw.githubusercontent.com/programmercloud/pgc-gym/main/img/banner-img.png"
                            alt=""
                        />
                    </div>
                </div>
                <ToastContainer/>
            </header>
        </div>
    );
}

export default Login;