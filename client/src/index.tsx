import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomeScreen from './HomeScreen';
import Quiz from './components/Quiz';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/example-quiz-1" element={<Quiz name="Ex Quiz 1" date="April 4th, 2023" first={1} last={1}/>}></Route>
        <Route path="/example-quiz-2" element={<Quiz name="Ex Quiz 2" date="April 5th, 2023" first={1} last={1}/>}></Route>
        <Route path="/example-quiz-3" element={<Quiz name="Ex Quiz 3" date="April 6th, 2023" first={1} last={1}/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);