import React from 'react'
import Link from 'next/link'
import { NextResponse } from 'next/server'
import Product from '@/app/models/Product'
import mongoose from "mongoose"
const Page = async() => {

  const products= await getData()
  
  return (
    <div>
     <section   className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex justify-center flex-wrap -m-4">
    {Object.keys(products).length===0 && <p>Sorry,All the DownJackets currently are out of stock. New Stock Will be available soon. Stay Tuned</p>}  
    {Object.keys(products).map((item)=>{ 
        return  <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
      <Link passHref={true} href={`/product/${products[item].slug}`} className="block relative rounded overflow-hidden ">
          <img alt="ecommerce" className="h-[30vh] m-auto md:h-[36vh] block" src={products[item].img}/>
        <div className="mt-4 text-center ">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Down Jacket</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
          <p className="mt-1">{products[item].price}</p>
          <div className="mt-1">
          {products[item].size.includes('S')&&<span className='border border-gray-300 px-1 mx-1'> S</span>}
           {products[item].size.includes('M')&&<span className='border border-gray-300 px-1 mx-1'> M</span>}
           {products[item].size.includes('L')&&<span className='border border-gray-300 px-1 mx-1'>L</span>}
            {products[item].size.includes('XL')&&<span className='border border-gray-300 px-1 mx-1'>XL</span>}
            {products[item].size.includes('XXL')&&<span className='border border-gray-300 px-1 mx-1'>XXL</span>}</div>
          <div className="mt-1">
          {products[item].color.includes('red')&&<button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('blue')&&<button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('black')&&<button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('purple')&&<button className="border-2 border-gray-300 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          
          {products[item].color.includes('green')&&<button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('yellow')&&<button className="border-2 border-gray-300 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
          
          </div>
        </div>
        </Link>
      </div> })}
    </div>
  </div>
</section>
    </div>
  )
}
async function getData() {
  if(!mongoose.connection.readyState){

    await mongoose.connect(process.env.MONGO_URI)
}
let products= await Product.find({category:'DownJackets'})
let DownJackets={}
for(let item of products){
        if(item.title in DownJackets){
               if(!DownJackets[item.title].color.includes(item.color) && item.availableQty>0){
                DownJackets[item.title].color.push(item.color)
               }
               if(!DownJackets[item.title].size.includes(item.size) && item.availableQty>0){
                DownJackets[item.title].size.push(item.size)
               }
        }
        else{
              DownJackets[item.title]=JSON.parse(JSON.stringify(item))  
              if(item.availableQty>0){
                DownJackets[item.title].color=[item.color]
                DownJackets[item.title].size=[item.size]
              }
        }
}
return JSON.parse(JSON.stringify(DownJackets))
}

export default Page
