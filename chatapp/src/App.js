import React from 'react';
import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import {BrowserRouter,  Router, Routes, Route, Link, Navigate} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="Register" element={<Register/>}/>
                {/*<Route path="/" element={<Login/>}/>*/}
                <Route path="Login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
