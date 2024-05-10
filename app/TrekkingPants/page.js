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
    {products.map((item)=>{ 
        return  <div key={item._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
      <Link passHref={true} href={`/product/${item.slug}`} className="block relative rounded overflow-hidden ">
          <img alt="ecommerce" className="h-[30vh] m-auto md:h-[36vh] block" src={item.img}/>
        <div className="mt-4 text-center ">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Trekking Pant</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
          <p className="mt-1">{item.price}</p>
          <p className="mt-1">S,M,L,XL,XXL</p>
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
let products= await Product.find({category:'Trekking Pants'})
return JSON.parse(JSON.stringify(products))
}

export default Page
