import mongoose from "mongoose";
import { connectDB } from "@/app/libs/mongodbconnect";
import Clientcomponentforproduct from "./clientcomponentforproduct";
import Product from "@/app/models/Product";
const Page=async({params})=> {
  const {product,variants}= await getData(params.slug)
  return <>

   <Clientcomponentforproduct params={params.slug} product={product} variants={variants}/>
  </>
}
async function getData(params) {
if(!mongoose.connections[0].readyState){
  await mongoose.connect(process.env.MONGO_URI)
}
let product= await Product.findOne({slug:params})
let variants=await Product.find({title:product.title})
let colorSizeSlug={}
for (let item of variants){
  if(Object.keys(colorSizeSlug).includes(item.color)){
    colorSizeSlug[item.color][item.size]={slug:item.slug}
}
else{
  colorSizeSlug[item.color]={}
  colorSizeSlug[item.color][item.size]={slug:item.slug}
}
}
return {product: JSON.parse(JSON.stringify(product)),variants: JSON.parse(JSON.stringify(colorSizeSlug))}
}

export default Page