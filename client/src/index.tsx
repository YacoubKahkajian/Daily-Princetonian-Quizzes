import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomeScreen from './HomeScreen';
import Quiz from './components/Quiz';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path=":shortName" element={<Quiz/>}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);