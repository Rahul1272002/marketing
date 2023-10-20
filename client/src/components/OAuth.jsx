import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import {app} from "../firebase"
import { signinGoogle } from '../utils/APIRoutes'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../redux/user/userSlice'
const OAuth = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const submitGHandle=async()=>{
        try {
            const provider=new GoogleAuthProvider()
            const auth =getAuth(app)
            const result=await signInWithPopup(auth,provider)
            console.log(result)

        
        const res=await fetch(signinGoogle,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
        })
        const data=await res.json()
        dispatch(signInSuccess(data))
        navigate("/");
    } catch (error) {
        console.log(error)
    }
    }
  return (
    <button onClick={submitGHandle} type='button' className='bg-red-700 p-3 text-transform-uppercase rounded-lg hover:opacity-95 text-white disabled:opacity-80'>
       contineu with google
          </button>
  )
}

export default OAuth
