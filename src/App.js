import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from "./pages/HomeScreen"
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import Login from "./pages/Login"
import AdDashboard from "./pages/admin/Dashboard"
import AdResult from "./pages/admin/Result"
import LandingPage from "./pages/admin/LandingPage"
import VerifyUser from "./pages/admin/VerifyUser";

const App = () => {
  const { contract, isLoading } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  return (
    <div className='bg-gray-800 h-full min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin/dashboard" element={<AdDashboard/>} exact />
          <Route path="/admin/result" element={<AdResult/>} exact />
          <Route path="/admin/landingPage" element={<LandingPage/>} exact />
          <Route path="/admin/verifyUser" element={<VerifyUser/>} exact />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
