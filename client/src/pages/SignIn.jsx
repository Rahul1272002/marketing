import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signinRoute } from '../utils/APIRoutes'
import { useDispatch, useSelector } from 'react-redux'
import {signInStart,signInSuccess, signInFaliure} from "../redux/user/userSlice"
import OAuth from '../components/OAuth'
const Signin = () => {
   
    const dispatch=useDispatch()
    const [formdata,setFormdata]=useState({})
    // const [err,setErr]=useState(null)
    // const [loading,setLoading]=useState(false)
    const {loading,error}=useSelector((state)=>state.user)
    const navigate=useNavigate()
    const handelChange=(e)=>{
      setFormdata({
        ...formdata,
        [e.target.id]:e.target.value
      })
  
    }
    const handelSubmit=async(e)=>{
      e.preventDefault()
     try{
        dispatch(signInStart())
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formdata)
        });
       
        const data = await response.json();
 
        if(data.sucess===false){
          dispatch(signInFaliure(data.message))
          return 
        }
        
dispatch(signInSuccess(data))

    navigate("/")
     }catch(error){
      dispatch(signInFaliure(error.message))
     }
    }

    return (
      <div className='max-w-lg p-3 mx-auto'>
         <h1 className='font-semibold text-3xl text-center my-7'>Sign In</h1>
         <form action="" className='flex flex-col gap-4' onSubmit={handelSubmit}>
         
          <input type="email" placeholder='email' id="email" className='border p-3 rounded-lg focus:outline-none' onChange={handelChange}/>
          <input type="password" placeholder='password' id="password" className='focus:outline-none border p-3 rounded-lg' onChange={handelChange}/>
          <button disabled={loading} className='bg-slate-700 p-3 rounded-lg hover:opacity-95 text-white disabled:opacity-80'>
           {loading?"loadding": "SIGN IN"}
          </button>
          <OAuth/>
         </form> 
         <div className='flex gap-2 mt-5'>
          <p>Don't have an account?</p>
          <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span></Link>
         </div>
         {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    )
}

export default Signin