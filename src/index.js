import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'rodal/lib/rodal.css';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(

    <BrowserRouter>
            <App />
    </BrowserRouter>
);

