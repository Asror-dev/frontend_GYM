import React, { useEffect, useState } from 'react';
import './Hisobot.css';
import Admin from '../adminPage/Admin';
import { useNavigate } from 'react-router-dom';
import apiCall from '../../ApiCall';
import {ToastContainer} from "react-toastify";


function HisobotPage() {
    const navigate = useNavigate();
    const [month, setMonth] = useState([]);
    const [subscribers, setSubscribers] = useState('');
    const [usersToday, setUsersToday] = useState('');
    useEffect(() => {
        if (localStorage.getItem('role') !== 'ROLE_ADMIN'|| !localStorage.getItem("access_token")) {
            navigate('/login');
        } else {
            getHisobot();
        }
    }, []);

    function getHisobot() {
        apiCall(`/admin/report?key=${localStorage.getItem('access_token')}&adminId=${localStorage.getItem('user_id')}`).then(
            (res) => {
                setMonth(res.data.monthIncome);
                setSubscribers(res.data.subscribers);
                setUsersToday(res.data.usersToday);
            }
        ).catch(()=>navigate("/login"))
    }

    return (
        <div className={"background2"}>
            {localStorage.getItem('role') !== 'ROLE_ADMIN'|| !localStorage.getItem("access_token") ? (
                navigate('/login')
            ) : (
                <div>
                    <Admin />
                    <div className={'hisbotHeaderDiv'}>
                        <div className={'card4'}>
                            <div>
                                <h5>Bugungi kun uchun obunasi bor bo'lgan userlar soni : {subscribers}</h5>
                            </div>
                        </div>
                        <div className={'card4'}>
                            <div>
                                <h5>Bugun zaldan foydalangan userlar soni : {usersToday}</h5>
                            </div>
                        </div>
                    </div>
                    <table id={'dd'} className={'my-5'}>
                        <thead>
                        <tr>
                            <th className={"py-3"}>t/r</th>
                            <th>total price</th>
                            <th>month name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {month.map((m, i) => (
                            <tr key={m.id}>
                                <td className={'p-3'}>{i + 1}</td>
                                <td>{m.totalPrice}</td>
                                <td>{m.monthName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <ToastContainer/>
                </div>
            )}
        </div>
    );
}

export default HisobotPage;
