import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import {app} from "../firebase"
import { updateSuccess,updateFaliure,updateStart,deleteStart,deleteSuccess,deleteFaliure,signOutStart,signOutSuccess,signOutFaliure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { updateData } from '../utils/APIRoutes'
import { Link } from 'react-router-dom'

const Profile = () => {
  const dispatch=useDispatch()
  const {currentUser,loading,error}=useSelector(state=>state.user)
  const fileref=useRef(null)
  const [file,setFile]=useState(undefined)
  const [filePer,setFilePer]=useState(0)
  const [fileUploadError,setFileUploadErr]=useState(false)
  const [formData,setFormData]=useState({})
  const [userupdateSuccess,setUserupdateSuccess]=useState(false)
 // console.log(file)
  // console.log(filePer)
  // console.log(formData)

useEffect(()=>{
  if(file){
    handleFileUpload(file)
  }
},[file])

  const handleFileUpload=(file)=>{
    const storage=getStorage(app)
    const filename=new Date().getTime()+file.name
    const storageRef=ref(storage,filename)
    const uploadTask=uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed',(snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilePer(Math.round(progress))
    },
    (err)=>{
      setFileUploadErr(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({...formData,avatar:downloadURL})
          
      })
    
    }
    )
  }

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      dispatch(updateStart())
     // console.log(updateData(currentUser._id))

      const res=await fetch(updateData(currentUser._id),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data=await res.json()

      if(data.sucess===false){
        dispatch(updateFaliure(data.message))

        return
      }
      dispatch(updateSuccess(data))
      setUserupdateSuccess(true)
    } catch (error) {
      dispatch(updateFaliure(error.message))
    }
  }

const handleDelete=async()=>
{
try {
  dispatch(deleteStart())
  const res= await fetch(`/api/user/delete/${currentUser._id}`,{
    method:"DELETE"
  })
  const data=await res.json()
  if(data.sucess===false){
    dispatch(deleteFaliure(error.message))
    return 
  }
  dispatch(deleteSuccess(data))

} catch (error) {
  dispatch(deleteFaliure(error.message))
}
}

const handleSignout=async()=>{
  try {
  dispatch(signOutStart())
    const res=await fetch('/api/auth/signout');
    const data=await res.json()
    if (data.success === false) {
      dispatch(signOutFaliure(error.message))
      return;
    }
    dispatch(signOutSuccess(data))
  } catch (error) {
    dispatch(signOutFaliure(error.message))
  }
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileref} hidden accept='image/*'/>
        <img onClick={()=>fileref.current.click()} src={formData.avatar || currentUser.avatar} alt='img' className='w-24 h-24 self-center rounded-full object-cover cursor-pointer mt-2'/>
        <p>
          {fileUploadError?(
            <span className='text-red-800'>
              Image Upload Error (Image must be less than 2Mb)
            </span>):filePer>0 && filePer<100?
            (<span className='text-slate-700'>{`Upoading file ${filePer}`}</span>):
            filePer===100?(<span className='text-green-700'>Image Sucessfully Uploaded</span>):""
          }
        </p>

        <input  onChange={handleChange} defaultValue={currentUser.username} type="text" placeholder='username' id='username' className='border p-3 rounded-lg outline-none'/>

        <input  onChange={handleChange} defaultValue={currentUser.email} type="email" placeholder='email' id='email' className='border p-3 rounded-lg outline-none'/>
        <input onChange={handleChange} type="password" placeholder='password' id='password' className='border p-3 rounded-lg outline-none'/>
        <button disabled={loading} className='rounded-lg uppercase bg-slate-700 p-3  text-white hover:opacity-95 disabled:opacity-80'>{loading?"loading":"Update"}</button>
        <Link className='bg-green-700 p-3 rounded-lg hover:opacity-95 text-center text-white  uppercase' to={"/create-listing"}>create listing</Link>
       </form>
       <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer '>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer '>Sign Out</span>
       </div>
       <p className='text-red-700 mt-5'>{error ? error:""}</p>
       <p className='text-green-700 mt-5'>{userupdateSuccess ? "User updated successfully":""}</p>
    </div>
  )
}

export default Profile