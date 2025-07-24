import { useContext } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import InterviewRoom from './pages/InterviewRoom';
import { Toaster } from 'react-hot-toast';
import Login from './components/authComponents/Login';
import Register from './components/authComponents/Register';
import { ToastContainer } from 'react-toastify';
import Instructions from './pages/Instructions';
import InterviewDetails from './components/Interview/InterviewDetails';
import Navbar from './components/Layout/Navbar';
import { ModelCloseContext } from './components/context/ModalClose';

function App() {
  const { navClose } = useContext(ModelCloseContext);
  const location = useLocation();

  const hideNavbarRoutes = ['/interview/', '/interviews/'];
  const showNavbar = !hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {showNavbar && !navClose && <Navbar />}
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview/:id" element={<InterviewRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/interviews/instruction/:id" element={<Instructions />} />
        <Route path="/interview/details/:id" element={<InterviewDetails />} />
      </Routes>
    </>
  );
}

export default App;

