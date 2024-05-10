"use client"
import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoCartOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from "react-icons/ai";
import { IoBagCheck } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({Cart,addtoCart,removeFromCart,clearCart,subTotal}) => {
  const [isopen, setisopen] = useState(false)
  const ref = useRef()
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')

    }
  }
  return (
    <>
      <nav className='w-full bg-brown md:flex md:justify-start md:items-center fixed top-0 shadow-md z-10'>
        <div className="logo mx-4 ">
          <Link href={"/"} className='block w-[100px] md:inline md:w-[90px]'>
            <Image src="/trekit_logo_nav.png" alt="Loading logo" height={100} width={100} priority={true} />
          </Link>
        </div>
        <div onClick={() => { setisopen(!isopen) }} className='text-white font-bold text-3xl absolute right-0 top-8 md:hidden'>
          <IoMenu className={isopen ? "hidden" : "menu"} />
          <IoIosClose className={isopen ? "close" : "hidden"} />
        </div>
        <ul className={`md:flex md:gap-6 hover:underline-offset-2 font-serif font-bold md:static absolute text-white md:m-0 px-5 md:mx-10 pb-2 md:pb-0 md:z-auto left-0 z-[-1] transition-all  ease-in w-full bg-brown ${isopen ? "top-20" : "top-[-450px]"}`}>
          <Link href="/TrekkingPants" ><li className='my-4 underline-offset-[10px] hover:underline decoration-white '>  Trekking Pants</li></Link>
          <Link href="/TrackSuits" ><li className='my-4 underline-offset-[10px] hover:underline decoration-white'>Track Suits</li></Link>
          <Link href="/TrackPants" > <li className='my-4 underline-offset-[10px] hover:underline decoration-white'>Track Pants</li></Link>
          <Link href="/DownJackets" > <li className='my-4 underline-offset-[10px] hover:underline decoration-white'>Down Jackets</li></Link>
          <Link href="/Tights" > <li className='my-4 underline-offset-[10px] hover:underline decoration-white'>Tights</li></Link>
        </ul>
        <div className='text-3xl text-white font-bold mx-5 cursor-pointer absolute top-8 right-4 md:top-5 flex gap-2 md:py-1'>
          <Link href={"/Login"}>
        <MdAccountCircle/></Link>
        <IoCartOutline onClick={toggleCart}  />
        </div>
        <div ref={ref} className={`sideCart border-brown border-2 absolute top-0 right-0 bg-white py-10 px-8 w-72 h-[100vh] transition-transform ${Object.keys(Cart).length!==0?'translate-x-0':'translate-x-full'}`}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-brown"><AiFillCloseCircle /></span>
          <ol className='list-decimal'>
            {Object.keys(Cart).length==0 && <div className='my-4 text-base font-semibold'>Your Cart is Empty...</div>}
            {Object.keys(Cart).filter((k) => Cart[k].qty > 0).map((k)=>{ return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{Cart[k].name}</div>
                <div className='w-1/3 flex items-center font-semibold text-lg justify-center'><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,Cart[k].price,Cart[k].name,Cart[k].size,Cart[k].variant)}} className='cursor-pointer text-brown'/> <span className='mx-2 text-sm'>{Cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addtoCart(k,1,Cart[k].price,Cart[k].name,Cart[k].size,Cart[k].variant)}}  className='cursor-pointer text-brown'/></div>
              </div>
            </li>
           })}
          </ol>
          <div className="total font-bold my-2">SubTotal: ₹{subTotal}</div>
          <div className="flex justify-center items-center gap-2">

          <Link href={"/Checkout"}> <button className="flex items-center mt-5 text-white bg-brown-light border</Link>-0 py-2 px-2 focus:outline-none hover:bg-brown rounded text-sm"><IoBagCheck className='m-1'/> <span>Checkout </span> </button></Link>
          <button className="flex mt-5 text-white bg-brown-light border-0 py-2 px-4 text-md focus:outline-none hover:bg-brown rounded text-sm" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      </nav>
      <div className={`md:pt-20 ${isopen ? 'transition-all  pt-[270px]' : 'pt-[100px]'}`}>
      </div>
    </>
  )
}

export default Navbar
