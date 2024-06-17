"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router=useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  
  const handleChange=(e)=>{
     if(e.target.name=='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name=='password'){
      setPassword(e.target.value)
    }
  }
  const handleSubmit=async(e)=>{
    try{
    e.preventDefault()
    const data={email,password}
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if(result.responseData.message==="You are Now Logged In"){
        localStorage.setItem('token',result.token)
        toast.success('You are Successfully Logged In!', {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          
          router.push("http://localhost:3000/")
        }, 1000);
      }
      else{
        toast.error('Please Enter valid Credentials!', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      setEmail("")
      setPassword("")
      console.log(result)
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <>
    <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            src="/Trekitbg.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <div className="text-center">
          Or     
          <Link href={"/signup"} className='text-brown font-bold ml-3'>                Signup</Link>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  placeholder='Email'
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href={"/forgot"} className="font-semibold text-brown hover:text-brown">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  placeholder='Password'
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-brown px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown"
              >
                Sign in
              </button>
            </div>
          </form>

          
        </div>
      </div>
      </>
  )
}

export default Page
