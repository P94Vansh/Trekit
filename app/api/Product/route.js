import { NextResponse } from 'next/server'
import { connectDB } from '@/app/libs/mongodbconnect'
import Product from '@/app/models/Product'
export async function GET(request) {
       await connectDB()
        let products= await Product.find()
        return NextResponse.json({ products })
}
export async function POST(request) {
        try {
                
                const requestBodyText = await request.text();
                const productData=JSON.parse(requestBodyText)
                console.log(productData)
                
                for(let i=0;i<productData.length;i++){
                let p=new Product({
                        title: productData[i].title,
                        slug: productData[i].slug,
                        desc: productData[i].desc,
                        img: productData[i].img,
                        category: productData[i].category,
                        size: productData[i].size,
                        color: productData[i].color,
                        price: productData[i].price,
                        availableQty: productData[i].availableQty,
                })
                await p.save()
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