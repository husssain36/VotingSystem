import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import asset from '../images/Asset-1.png'

const HomeScreen = () => {
  const navigate = useNavigate()
  
  return (
    <div>
      <Header/>

      <main className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-5'>
        
        <div className='items-center justify-center mt-16 md:mt-36 max-w-lg mr-3'>
          <p className='text-default text-xl text-justify my-3'>
          A <span className='font-extrabold'>blockchain</span> based voting system for the   
          <span className='font-extrabold'> Electoral Commission of India</span></p>
          <p className='text-default text-xl text-justify'>
          In recent times we hear the mishappenings and falls cases filed by opposition about manipulating the votes, this issue can be solved using blockchain since it is secure and immutable
          </p>
          <div className='flex justify-between mt-10 space-x-10'>
            <button className='bg-default h-14 w-32 rounded-lg flex-grow font-bold text-xl text-gray-800'>
                <Link to="/login">Log In</Link>
            </button>
          </div>
        </div>

        <div className='items-center justify-center mt-36 mr-20'>
          <img src={asset} height={300} width={300} alt="" />
        </div>
      </main>
    </div>
  )
}

export default HomeScreen