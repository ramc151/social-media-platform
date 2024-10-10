import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Create_Post from "./components/Create_Post";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from "./components/ErrorPage";
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setProgress] = useState(0);

  const ProtectedRoute = ({ element, isAuthenticate }) => {
    return isAuthenticate ? element : <Navigate to="/login" />
  }

  const isAuthenticate = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(100)} />
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed setProgress={setProgress} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<ProtectedRoute element={<Create_Post />} isAuthenticate={isAuthenticate} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
