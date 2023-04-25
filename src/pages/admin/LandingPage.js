import React from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
  return (
    <div className>
      <Header/>
      <div className='flex flex-col max-w-5xl mx-auto items-center justify-center text-2xl font-semibold pb-10'>
        <div>
            <button className='bg-default p-10 my-10 text-amazon_blue rounded-lg' onClick={ () => navigate('/admin/verifyUser')}>
                Go To Vote
            </button>
        </div>

        <div>
            <button className='bg-default p-10 my-10 text-amazon_blue rounded-lg' onClick={ () => navigate('/admin/result')}>
                Go To Result
            </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
