import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useStateContext } from '../context/ContextProvider'

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors, dirtyFields } } = useForm({})
  const { user, setUser } = useStateContext()

  const navigate = useNavigate() 
//   useEffect(() => {
     
//     if(user){
//         navigate('/admin/dashboard')
//     }
//   }, [user])
  

  const onSubmit = async (user) => {
    try {
        if((user.email === process.env.REACT_APP_ADMIN_EMAIL1 && user.password === process.env.REACT_APP_ADMIN_PASS1) || (user.email === process.env.REACT_APP_ADMIN_EMAIL2 && user.password === process.env.REACT_APP_ADMIN_PASS2) ){
            localStorage.setItem('userInfo', JSON.stringify(user.email));
            setUser(user.email)
            navigate('/admin/landingPage')
        } else {
            alert("Invalid Login Credentials")
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
  }
  
  return (
    <div>
        <Header/>

        <div className='max-w-3xl mx-auto py-10 px-5'>
            <div className='bg-amazon_blue text-default rounded-lg'>
                <div className='border-b-2 border-default flex items-center justify-between'>
                    <h4 className='text-4xl p-4'>Login To kVote</h4>
                </div>

                <div className='flex flex-col p-5'>
                    <form action="" className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter Email</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("email", { required: true })}
                            />
                            {errors.email && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter Password</label>
                            <input type="password" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("password", { required: true })}
                            />
                            {errors.password && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex'>
                            <button type="submit" className='bg-default flex-1 p-4 px-8 my-3 text-xl font-bold text-amazon_blue rounded-lg' onClick={() =>handleSubmit(onSubmit)}>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login