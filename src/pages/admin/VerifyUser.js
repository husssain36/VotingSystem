import { useAddress } from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import db from '../../firebase';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';



function VerifyUser() {
    const address = useAddress();
    const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({})
    const [validatedUser, setValidatedUser] = useState(false);
    const [aadhar, setAadhar] = useState("")
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("userInfo")){
          navigate('/login')
        }
        const getUsers = async () => {
          const snapshot = await db.collection('userData').get();
          const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsersData(usersList);
          setMetamask();
        }
        getUsers();

        const setMetamask = () => {
            console.log("setMeta", usersData)
            console.log("setMeta",aadhar)
            usersData.map(user => {
                console.log(user.metamask === address)
              if(user.metamask === address){
                  console.log(user.aadharNo)
                  setAadhar(user.aadharNo)
              }
            })
            console.log("setMetaFter",aadhar)
          }
        setMetamask();
      }, [address]);
      
      const onSubmit = async (user) => {
        console.log("useraadhar",user.aadhar);
        console.log(usersData[0].metamask)
        try {
            if((user.aadhar === aadhar ) ){
                
                navigate('/admin/dashboard')
                
            } else {
                alert("Aadhar and Metamsk mismatch")
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
      }
  return (
    <div>
        <Header/>
        {!address ? (
            <div className='max-w-3xl mx-auto py-10 px-5'>
                <div className='bg-amazon_blue text-default rounded-lg'>
                  <div className='border-b-2 border-default flex items-center justify-between'>
                      <h4 className='text-xl p-4'>Please  Log In to Metamask</h4>
                  </div>
                </div>
            </div>
        ) : (
        <div className='max-w-3xl mx-auto py-10 px-5'>
        <div className='bg-amazon_blue text-default rounded-lg'>
          <div className='border-b-2 border-default flex items-center justify-between'>
              <h4 className='text-xl p-4'>Your Account: {address}</h4>
          </div>

          <div className='flex flex-col p-5'>
              <form action="" className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col space-y-2'>
                      <label className='text-xl' htmlFor="">Enter Aadhar Linked to the Metamask account</label>
                      <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                      {...register("aadhar", { required: true })}
                      />
                      {errors.aadhar && <span className='text-red-500'>This field is required</span>}
                  </div>
                  <div clssName='flex'>
                      <button type="submit" className='bg-default flex-1 p-4 px-8 my-3 text-xl font-bold text-amazon_blue rounded-lg' onClick={() =>handleSubmit(onSubmit)}>Verify</button>
                  </div>
              </form>
          </div>
      </div>
    </div>
    )}
    </div>
  )
}

export default VerifyUser