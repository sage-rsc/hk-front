import React from 'react';
import Form from '../components/Form';
import {ToastContainer} from "react-toastify";

const HomePage = () => (
    <div>
        <div className="cover">
            <h1>Coding Challenge</h1>
            <Form/>
        </div>
        <ToastContainer/>
    </div>
);

export default HomePage;
