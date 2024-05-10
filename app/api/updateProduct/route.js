import { NextResponse } from 'next/server'
import { connectDB } from '@/app/libs/mongodbconnect'
import Product from '@/app/models/Product'
export async function POST(request) {
    try {
            
            const requestBodyText = await request.text();
            const productData=JSON.parse(requestBodyText)
            
            for(let i=0;i<productData.length;i++){
           let p= await Product.findByIdAndUpdate(productData[i]._id,productData[i])
    }
            const data={message:"success"}
            const status=200
            return NextResponse.json(data,{status})
    } 
    catch (error) {
            const data={message:error.message}
            const status=200

            return NextResponse.json(data,{status})
    }

}