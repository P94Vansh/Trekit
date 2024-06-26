"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoCartOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from "react-icons/ai";
import { IoBagCheck } from "react-icons/io5";
import { useAppContext } from '../layout';

const Page = () => {
  const { Cart, subTotal, addtoCart, removeFromCart, clearCart } = useAppContext();
 
  return (
    <div className='container  px-2 sm:mx-auto'>
     <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
     <h2 className='font-semibold text-xl'>1.Delivery Details</h2>
     <div className="mx-auto flex my-2">
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-brown focus:ring-2 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-brown focus:ring-2 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      </div>
      <div className="px-2 w-full">
      <div className="mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        
        <textarea name="address" cols="30" rows="2" id="address" className="w-full bg-white rounded border border-gray-300 focus:border-brown focus:ring-2 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
      </div>
     </div>
     <div className="mx-auto flex my-2">
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
        <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-brown focus:ring-2 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-brown focus:ring-2 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      </div>
      <div className="mx-auto flex my-2">
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
        <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-brown focus:ring-2 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <div className="px-2 w-1/2">
      <div className="mb-4">
        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
        <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-brown focus:ring-2 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      </div>
      <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
      <div className="sideCart border-brown border-2  bg-brown-light-light m-2 p-6  ">
          
          <ol className='list-decimal'>
            {Object.keys(Cart).length==0 && <div className='my-4 text-base font-semibold'>Your Cart is Empty...</div>}
            {Object.keys(Cart).filter((k) => Cart[k].qty > 0).map((k)=>{ return <li key={k}>
              <div className="item flex my-5">
                <div className=' font-semibold'>{Cart[k].name}({Cart[k].size}/{Cart[k].variant})</div>
                <div className='w-1/3 flex items-center font-semibold text-lg justify-center'><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,Cart[k].price,Cart[k].name,Cart[k].size,Cart[k].variant)}} className='cursor-pointer text-brown'/> <span className='mx-2 text-sm'>{Cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addtoCart(k,1,Cart[k].price,Cart[k].name,Cart[k].size,Cart[k].variant)}}  className='cursor-pointer text-brown'/></div>
              </div>
            </li>
           })}
          </ol>
           <span className="total font-bold">SubTotal: ₹{subTotal}</span>
          
        </div>
        <div className="mx-4">
        <Link href={"/Checkout"}> <button className="flex items-center mt-5 text-white bg-brown-light border</Link>-0 py-2 px-2 focus:outline-none hover:bg-brown rounded text-sm"><IoBagCheck className='m-1'/> <span>Pay ₹{subTotal} </span> </button></Link>
        </div>
    </div>
  )
}

export default Page
