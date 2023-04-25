import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import 'firebase/firestore';
import { useForm } from 'react-hook-form'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import Web3 from "web3";
import { Web3Storage } from "web3.storage";




export default function Dashboard() {
  const address = useAddress();

  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data: candidate1, isLoading: isLoading1} =  useContractRead(contract, "candidates", [1])
  const { data: candidate2, isLoading: isLoading2} =  useContractRead(contract, "candidates", [2])
  const { data: candidate3, isLoading: isLoading3} =  useContractRead(contract, "candidates", [3])
  const { data: voter, isLoading: loadingVoter} = useContractRead(contract, "voters", address)

  const { mutateAsync: vote } = useContractWrite(contract, "vote")
  
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [cid, setCid] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const client = new Web3Storage({ token: process.env.REACT_APP_TOKEN });
  useEffect(() => {
    if(!localStorage.getItem("userInfo")){
      navigate('/login')
    }
    if(!address){
      navigate('/admin/verifyUser')
    }
    

    if(address){
      const constraints = {
        audio: false,
        video: true
      };
    const handleSuccess = (stream) => {
      const video = document.querySelector("video");
      video.srcObject = stream;
    };

    const handleError = (error) => {
      console.error("Error accessing media devices.", error);
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
  }
      
  }, [address]);
  

  const captureImage = async () => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL();
    setImage(dataUrl);
    // const response = await fetch(dataUrl);
    // const blob = await response.blob();
    const blob = dataUrlToBlob(dataUrl)
    console.log(blob);
    uploadFile(blob);
    
  };

  const castVote = async(imgUrl, id) => {
    console.log(id)
    console.log(imgUrl)
    try {
      const data = await vote([imgUrl, id ]);
      
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }



const uploadFile = async (blob) => {
  console.log("upload function", blob)
  try{
    const file = new File([blob], "image.jpg", {type: "image/jpeg"});

    const cid = await client.put([file], { type: 'image/png' });
 
    setCid(cid);
    const url = `https://${cid}.ipfs.w3s.link/image.jpg`;
    setImgUrl(url);
    console.log(url)
    console.log("imgUrl", imgUrl)
  } catch(error){
    console.log(error)

}
}


const dataUrlToBlob = (dataUrl) => {
  const [, mime, data] = dataUrl.match(/^data:(.+);base64,(.+)$/) || []
  if (!mime || !data) return null
  const bytes = atob(data)
  const buffer = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) {
    buffer[i] = bytes.charCodeAt(i)
  }
  const blob = new Blob([buffer], { type: mime })
  if (blob.size === 0) {
    console.error('Blob is empty')
    return null
  }
  return blob;
}
  console.log(cid)
  console.log(imgUrl)
  return (
    <div>
    <Header admin="admin"/>
    <div className="max-w-5xl mx-auto p-3 text-default">
        <div className="flex flex-col items-center justify-center font-bold">
            <h1 className="text-3xl">Election</h1>
            <p>Your Account: {address}</p>
        </div>
        {isLoading1 && isLoading2 && isLoading3 && loadingVoter ? (
            <p>"Loading...</p>
        ) : (
        <div>
          <h2>Candidates</h2>
          <div className="relative overflow-x-auto">
                <table className="w-full text-xl text-default text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Vote Now
                        </th>
                    </tr>
                </thead>
                <tbody>
              
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                  <td>{candidate1[0].toString()}</td>
                  <td>{candidate1[1].toString()}</td>
                  <td>
                  {!voter[1]? 
                   (
                    <button className="bg-primary px-5 py-3" onClick={() => castVote(imgUrl, candidate1[0].toString())}>
                    vote
                    </button>
                   ) : (
                   
                    <p className="text-default text-xl">You have already voted</p>
                  )}
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                  <td>{candidate2[0].toString()}</td>
                  <td>{candidate2[1].toString()}</td>
                  <td>
                  {!voter[1]? 
                   (
                    <button className="bg-primary px-5 py-3" onClick={() => castVote(imgUrl, candidate2[0].toString())}>
                    vote
                    </button>
                   ) : (
                   
                    <p className="text-default text-xl">You have already voted</p>
                  )}
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                  <td>{candidate3[0].toString()}</td>
                  <td>{candidate3[1].toString()}</td>
                  <td>
                  {!voter[1]? 
                   (
                    <button className="bg-primary px-5 py-3" onClick={() => castVote(imgUrl, candidate3[0].toString())}>
                    vote
                    </button>
                   ) : (
                   
                    <p className="text-default text-xl">You have already voted</p>
                  )}
                  </td>
                </tr>
                
                </tbody>
            </table>

            {!image ? (
                <div className="flex space-x-5 items-center justify-center mx-auto mt-10">
                  <video autoPlay></video>
                  <button className="bg-default p-5 rounded-lg text-white text-2xl font-bold" onClick={captureImage}>Capture</button>
                  {/* <button className="bg-default p-5 rounded-lg text-white text-2xl font-bold" onClick={() => loadResource}>Enable Camera</button> */}
              </div>
          ) : (
            <div>
            <div className="flex space-x-5 items-center justify-center mx-auto mt-10">
              <img src={image} alt="captured" />
             </div>

             <div className="flex space-x-5 items-center justify-center mx-auto mt-10">
                  <video autoPlay></video>
                  <button className="bg-default p-5 rounded-lg text-white text-2xl font-bold" onClick={captureImage}>Capture</button>
                  {/* <button className="bg-default p-5 rounded-lg text-white text-2xl font-bold" onClick={() => loadResource}>Enable Camera</button> */}
              </div>
              </div>
          )}
        </div>
        </div>
        )}
    </div>
  
</div>
)
}




// import React, { useState, useEffect } from "react";
// import Election from "../../abis/Election.json";
// import Web3 from "web3";
// import Header from "../../components/Header";
// import { useStateContext } from "../../context/ContextProvider";
// import { useNavigate } from "react-router-dom";
// import db from "../../firebase";
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import { useForm } from 'react-hook-form'
// import { useContract, useContractEvents, useContractRead } from "@thirdweb-dev/react";

// export default function Dashboard() {
//   const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
//   console.log(contract)
//   const { data: candidate} = useContractRead(contract, "candidates", [3])
//   const { data: candiCount } = useContractRead(contract, "candidatesCount")
//   const { data: name, isLoading } = useContractRead(contract, "name")
//   console.log(candiCount)
//   console.log(name)
//   console.log(candidate)
//   const [candidates, setCandidates] = useState([]);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [election, setElection] = useState({})
//   const [id, setId] = useState(1);
//   const { user, account, setAccount } = useStateContext()
//   const navigate = useNavigate();
//   const [usersData, setUsersData] = useState([]);
//   const { register, handleSubmit, watch, formState: { errors, dirtyFields } } = useForm({})
//   const [validatedUser, setValidatedUser] = useState(false);
//   const [aadhar, setAadhar] = useState("")
//   useEffect(() => {
//     if(!localStorage.getItem("userInfo")){
//       navigate('/login')
//     }
//     const getUsers = async () => {
//       const snapshot = await db.collection('userData').get();
//       const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setUsersData(usersList);
//     }
//     getUsers();

//     if(localStorage.address){
//         setAccount(JSON.parse(localStorage.address));
//         window.web3 = new Web3(window.ethereum)
//         window.web3 = new Web3(window.web3.currentProvider)
//     }
//     loadWeb3();

//     setMetamask();
//     if(account){
//         loadBlockchainData()
//     }
    
//   }, [account]);
//   console.log(aadhar)
//   async function loadWeb3() {
//     if (window.ethereum) {
//         try {
//             const res = await window.ethereum.request({
//                 method: "eth_requestAccounts",
//             })
//             window.web3 = new Web3(window.ethereum)
//             window.web3 = new Web3(window.web3.currentProvider)
//             setAccount(res[0]);
//         } catch (err) {
//             console.error(err);
//             console.log("There was a problem connecting to MetaMask")
//         }
//     } else {
//         console.log("Install MetaMask")
//     }
// }



//   async function loadBlockchainData() {
//     const web3 = window.web3;
//     // if(!account){
//     // const accounts = await web3.eth.getAccounts();
//     // setAccount(accounts[0]);
//     // console.log(account)
//     // }
    
//     const networkId = await web3.eth.net.getId();
//     const networkData = Election.networks[networkId];
    
//     if (networkData) {
//       const electionCopy = new web3.eth.Contract(
//         Election.abi,
//         networkData.address
//       );
//       setElection(electionCopy);
//       console.log(election)
//       const candidatesCount = await electionCopy.methods.candidatesCount().call();
//       setCandidates([]);
//       for (let i = 1; i <= candidatesCount; i++) {
//         const candidate = await electionCopy.methods.candidates(i).call();
//         setCandidates((candidates) => [
//           ...candidates,
//           { id: candidate[0], name: candidate[1], voteCount: candidate[2] },
//         ]);
//       }


//       const hasVoted = await electionCopy.methods.voters(account).call();
//       setHasVoted(hasVoted);
//       setLoading(false);
//     } else {
//       window.alert("Smart contract not deployed to detected network.");
//     }
//     setLoading(false);

//   }

//   async function castVote( candidateId) {


//     let web3 = new Web3(Web3.givenProvider)
       
//         const networkData = Election.networks['5777']
        
//         const electionCopy = new web3.eth.Contract(Election.abi, networkData.address)
//     await electionCopy.methods.vote(Number(candidateId)).send({ from: account });

//       setLoading(true);
//       setCandidates([]);
//       window.location.reload()  
//   }

//   const setMetamask = () => {
//     usersData.map(user => {
//       if(user.metamask === account){
//           setAadhar(user.aadharNo)
//       }
//     })
//   }
 

//   const onSubmit = async (user) => {
//     setMetamask();
//     console.log("useraadhar",user.aadhar);
//     console.log(usersData[0].metamask)
//     try {
//         if((user.aadhar === aadhar ) ){
            
//             setValidatedUser(true);
            
//         } else {
//             alert("Aadhar and Metamsk mismatch")
//         }
//     } catch (error) {
//         console.log(error.response.data.message)
//     }
//   }

//   return (
//     <div>
//         <Header admin="admin"/>
//     {!validatedUser ? (
//       <div className='max-w-3xl mx-auto py-10 px-5'>
//       <div className='bg-amazon_blue text-default rounded-lg'>
//           <div className='border-b-2 border-default flex items-center justify-between'>
//               <h4 className='text-xl p-4'>Your Account: {account}</h4>
//           </div>

//           <div className='flex flex-col p-5'>
//               <form action="" className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
//                   <div className='flex flex-col space-y-2'>
//                       <label className='text-xl' htmlFor="">Enter Aadhar Linked to the Metamask account</label>
//                       <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
//                       {...register("aadhar", { required: true })}
//                       />
//                       {errors.aadhar && <span className='text-red-500'>This field is required</span>}
//                   </div>
//                   <div clssName='flex'>
//                       <button type="submit" className='bg-default flex-1 p-4 px-8 my-3 text-xl font-bold text-amazon_blue rounded-lg' onClick={() =>handleSubmit(onSubmit)}>Verify</button>
//                   </div>
//               </form>
//           </div>
//       </div>
//   </div>
//     ) : (
//     <div className="max-w-5xl mx-auto p-3 text-default">
//         <div className="flex flex-col items-center justify-center font-bold">
//             <h1 className="text-3xl">Election</h1>
//             <p>Your Account: {account}</p>
//         </div>
//         {loading ? (
//             <p>"Loading...</p>
//         ) : (
//         <div>
//           <h2>Candidates</h2>
//           <div className="relative overflow-x-auto">
//                 <table className="w-full text-xl text-default text-left">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                         <th scope="col" className="px-6 py-3">
//                             Id
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Name
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Vote Now
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {candidates.map((candidate) => (
//                 <tr key={candidate.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
//                   <td>{candidate.id}</td>
//                   <td>{candidate.name}</td>
//                   <td>
//                   {!hasVoted ? 
//                    (
//                     <button className="bg-primary px-5 py-3" onClick={() => castVote(candidate.id)}>
//                     vote
//                     </button>
//                    ) : (
                   
//                     <p className="text-default text-xl">You have already voted</p>
//                   )}
//                   </td>
//                 </tr>
//               ))}        
//                 </tbody>
//             </table>
//         </div>
//         </div>
//         )}
//     </div>
//     )}
// </div>
// )
// }
