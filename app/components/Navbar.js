"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart } from "react-icons/fa";
const Navbar = () => {
  return (
    <>
    <nav className='flex flex-col lg:flex-row justify-start md:items-center bg-brown '>
        <div className="logo cursor-pointer mx-5">
          <Link href="/">
          <Image src="/Trekit.png" width={80} height={40}  priority={true} alt='Loading Image'/>
          </Link>
        </div>
        <ul className='flex gap-8 md:mr-4 text-white font-bold hover:transition-all hover:duration-200 cursor-pointer  md:text-base md:mx-10 '>
            <Link href={'/'}> <li className='hover:font-extrabold text-center hover:bg-red-500'>Trekking Pants</li></Link>
            <Link href={'/'}> <li className='hover:font-extrabold text-center'>Track suits</li></Link>
            <Link href={'/'}> <li className='hover:font-extrabold text-center'>Track pants</li></Link>
            <Link href={'/'}> <li className='hover:font-extrabold text-center'>Down jackets</li></Link>
            <Link href={'/'}> <li className='hover:font-extrabold text-center'>Tights</li></Link>
        </ul>
        <div className='logincartbtn md:flex md:items-center md:gap-4 md:m-5 absolute right-0 top-4 md:absolute md:my-auto md:ml-4'>
          <button className='bg-white p-3 px-6 font-bold rounded-xl '><FaShoppingCart className='text-xl'/></button>
          <button className='bg-white p-3 px-6 font-bold text-sm rounded-xl mx-5 '>Login</button>
        </div>
        </nav>
        </>
  )
}

export default Navbar
