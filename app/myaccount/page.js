"use client"
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const Page = () => {    
    const router=useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token'))
        router.push('/')
  
  }, [])
  
  return (
    <div>
      Myaccount
    </div>
  )
}

export default Page
