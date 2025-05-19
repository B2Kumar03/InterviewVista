import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InterviewRoom from './pages/InterviewRoom';
import { Toaster } from 'react-hot-toast';
import Login from './components/authComponents/Login';
import Register from './components/authComponents/Register';
import SpeechToText from './components/Interview/SpeechToText';


function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <SpeechToText/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<InterviewRoom />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

