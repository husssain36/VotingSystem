import React, { useEffect, useState } from 'react'
import logo from '../images/logo-01.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';
import { ConnectWallet } from "@thirdweb-dev/react";


function Header({ connectHandler}) {
  const { user, setUser, account } = useStateContext()
  const [admin, setAdmin] = useState("");

  const navigate = useNavigate() 
  useEffect(() => {
    if(localStorage.getItem("userInfo")){
    setAdmin(localStorage.getItem("userInfo"))
    }
  }, [admin])
  const logOut = () => {
    localStorage.removeItem("userInfo")
    setAdmin("")
    navigate('/login')
  }

 
  

  return (
    <div className='bg-amazon_blue flex flex-grow border-b-2 border-default items-center justify-between'>
        <div className='p-2 mx-2 lg:mx-10 cursor-pointer'>
          {/* <Link to='/'>
            <img src={logo} height={50} width={120} alt="" />
          </Link> */}
          <p className='text-default font-bold text-5xl'>kVote</p>
        </div>


        <div className={`${admin  ? "flex" : "hidden"} text-default text-lg mx-6 lg:mx-10 space-x-5 lg:space-x-10 items-center`}>
              <ConnectWallet />
              <p onClick={logOut} className='hover:underline hover:text-teal-300 cursor-pointer '>Log Out</p>
        </div>

        <div className={`${admin === "dashboard" ? "flex" : "hidden"} text-default text-lg mx-10 space-x-10 items-center`}>
            <div className='hidden md:inline'><h4 className='text-2xl'>Welcome to Admin Panel {user.email}</h4></div>
        </div>  


        {/* <div className={`${admin  ? "hidden" : "flex"} text-default text-lg mx-6 lg:mx-10 space-x-5 lg:space-x-10 items-center`}>
            <Link to='/instruction'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Instructions</p>
            </Link>
            <Link to='/about'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>About Vidyalankar</p>
            </Link>
            {!user && (
              <Link to='/register'>
                <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline '>Sign Up</p>
              </Link>
            )}
            {user && !account && (
              <>
              <p className='hover:underline hover:text-teal-300 cursor-pointer' onClick={connectHandler}>Login With Metamask</p>
              
              <p onClick={logOut} className='hover:underline hover:text-teal-300 cursor-pointer '>Log Out</p>
              
              </>
            )}

            {user && account && (
              <p onClick={logOut} className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>{`${account.substring(0,5)}... ${account.substring(20, 24)}`}</p>
            )}
        </div>



        <div className={`${admin === "login" ? "flex" : "hidden"} text-default text-lg mx-10 space-x-10 items-center`}>
            <Link to='/instruction'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Welcome To Admin Panel</p>
            </Link>
        </div>

        <div className={`${admin === "dashboard" ? "flex" : "hidden"} text-default text-lg mx-10 space-x-10 items-center`}>
            <div className='hidden md:inline'><h4 className='text-2xl'>Welcome to Admin Panel {user.email}</h4></div>
        </div> */}

        {/* <div className={`${admin === "dashboard" ? "flex" : "hidden"} text-default text-lg mx-10 space-x-10 items-center`}>

            <Link to='/instruction'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Modify Users</p>
            </Link>  

            <Link to='/'>
              <p onClick={logOut} className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Log Out</p>
            </Link>
        </div> */}
    </div>
  )
}

export default Header