import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

export default function Dashboard() {
  const address = useAddress();
  console.log(address)
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data: candidate1, isLoading: isLoading1 } =  useContractRead(contract, "candidates", [1])
  const { data: candidate2, isLoading: isLoading2} =  useContractRead(contract, "candidates", [2])
  const { data: candidate3, isLoading: isLoading3} =  useContractRead(contract, "candidates", [3])
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("userInfo")){
      navigate('/login')
    }
  },[]);

  return (
    <div>
        <Header admin="admin"/>
    
    <div className="max-w-5xl mx-auto p-3 text-default">
        <div className="flex flex-col items-center justify-center font-bold">
            <h1 className="text-3xl">Election Result</h1>
            
        </div>
        {isLoading1 && isLoading2 && isLoading3 ? (
            <p>"Loading...</p>
        ) : (
        <div>
          <h2>Candidates</h2>
          <div className="relative overflow-x-auto">
                <table className="w-full  text-left text-default text-xl">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Votes
                        </th>
                    </tr>
                </thead>
                <tbody>
                
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                  <td>{candidate1[0]?.toString()}</td>
                  <td>{candidate1[1]}</td>
                  <td>{candidate1[2]?.toString()}</td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                  <td>{candidate2[0]?.toString()}</td>
                  <td>{candidate2[1]?.toString()}</td>
                  <td>{candidate2[2]?.toString()}</td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                  <td>{candidate3[0]?.toString()}</td>
                  <td>{candidate3[1]?.toString()}</td>
                  <td>{candidate3[2]?.toString()}</td>
                </tr>
                    
                </tbody>
            </table>
        </div>

        </div>
        )}
    </div>
</div>
)
}