"use client"
import React from "react";
import { Inter } from "next/font/google";
import { useEffect,useState } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });
import { metadata } from "./metadata";
import { createContext,useContext } from "react";
import { stringify } from "postcss";
const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)


export default function RootLayout({ children}) {
  const [Cart, setCart] = useState({})
      const [subTotal, setsubTotal] = useState(0)
      useEffect(() => {
       try {
           if(localStorage.getItem("cart")){
               setCart(JSON.parse(localStorage.getItem("cart")))
               saveCarttols(JSON.parse(localStorage.getItem("cart")))
           }
       } catch (error) {
          console.error(error)
          localStorage.clear()
       }
      }, [])
      const saveCarttols=(mycart)=>{
        localStorage.setItem("cart",JSON.stringify(mycart))
        let subt=0
        let keys=Object.keys(mycart)
        for(let i=0; i<keys.length;i++){
          subt+=mycart[keys[i]].price*mycart[keys[i]].qty
        }
        setsubTotal(subt)
      }
      const addtoCart=(itemCode,qty,price,name,size,variant)=>{
        let newcart=Cart
        if(itemCode in Cart){
          newcart[itemCode].qty=Cart[itemCode].qty+qty
        }
        else{
          newcart[itemCode]={qty:1,price,name,size,variant}
      
        }
        setCart(newcart)
        saveCarttols(newcart)
      }
      const removeFromCart=(itemCode,qty,price,name,size,variant)=>{
        let newcart=Cart
        if(itemCode in Cart){
          newcart[itemCode].qty=Cart[itemCode].qty-qty
        }
        
       if( newcart[itemCode].qty<=0){
        delete newcart[itemCode]
       }
        setCart(newcart)
        saveCarttols(newcart)
      }
      const clearCart=()=>{
        setCart({})
        saveCarttols({})
      }
      const contextValues = {
        Cart,
        subTotal,
        addtoCart,
        removeFromCart,
        clearCart,
      };
  return (
    <AppContext.Provider value={contextValues}>
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <metadata/>
        <div className="outer w-100% h-100%">
        <Navbar key={subTotal} Cart={Cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
        {React.Children.map(children, (child) => {
              return React.cloneElement(child, { ...contextValues });
            })}
        <Footer/>
        </div>
      </body>
    </html>
    </AppContext.Provider>
  );
}
