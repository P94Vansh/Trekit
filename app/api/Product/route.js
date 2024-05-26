import { NextResponse } from 'next/server'
import { connectDB } from '@/app/libs/mongodbconnect'
import Product from '@/app/models/Product'
export async function GET(request) {
       await connectDB()
        let products= await Product.find()
        let TrekkingPants={}
        try{
        for(let item of products){
                if(item.title in TrekkingPants){
                       if(!TrekkingPants[item.title].color.includes(item.color) && item.availableQty>0){
                        TrekkingPants[item.title].color.push(item.color)
                       }
                       if(!TrekkingPants[item.title].size.includes(item.size) && item.availableQty>0){
                        TrekkingPants[item.title].size.push(item.size)
                       }
                }
                else{
                      TrekkingPants[item.title]=JSON.parse(JSON.stringify(item))  
                      if(item.availableQty>0){
                        TrekkingPants[item.title].color=[item.color]
                        TrekkingPants[item.title].size=[item.size]
                      }
                }
        }
}
catch(e){
        console.log(e.message)
}
        return NextResponse.json({ TrekkingPants })
}
export async function POST(request) {
        try {
                
                const requestBodyText = await request.text();
                const productData=JSON.parse(requestBodyText)
                
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