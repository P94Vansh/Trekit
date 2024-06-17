"use client"
import React from "react";
import { Inter } from "next/font/google";
import { useEffect,useState } from "react";
import { store } from '../app/redux/store'
import { Provider } from 'react-redux'
import "./globals.css";
import { useRouter } from 'next/navigation'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });
import LoadingBar from 'react-top-loading-bar'
import { metadata } from "./metadata";
import { createContext,useContext } from "react";
import { stringify } from "postcss";
const AppContext = createContext()
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
export const useAppContext = () => useContext(AppContext)


export default function RootLayout({ children}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [Cart, setCart] = useState({})
  const [user, setuser] = useState({value:null})
  const [key, setKey] = useState(0)
      const [subTotal, setsubTotal] = useState(0)
      const [progress, setProgress] = useState(0)
      useEffect(() => {
        setProgress(40)
        setTimeout(() => {
          
          setProgress(100)
        }, 400);
      }, [searchParams])
      
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
       const token=localStorage.getItem('token')
       if(token){
         setuser({value:token})
         setKey(Math.random())
       }
      }, [useParams()])
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
      const logout=()=>{
        localStorage.removeItem('token')
        setuser({value:null})
        setKey(Math.random())
        router.push("/")
      }
      const buyNow=(itemCode,qty,price,name,size,variant)=>{
        let newcart={itemCode:{qty:1,price,name,size,variant}}
        setCart(newcart)
        saveCarttols(newcart)
        router.push('/Checkout')
      }
      const contextValues = {
        Cart,
        subTotal,
        
        addtoCart,
        removeFromCart,
        clearCart,
        buyNow
      };
  return (
    <Provider store={store}>

    <AppContext.Provider value={contextValues}>
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <metadata/>
        <div className="outer w-100% h-100%">
        <LoadingBar
        color='white'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}/>
        <Navbar logout={logout} user={user} key={key} Cart={Cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
        {React.Children.map(children, (child) => {
              return React.cloneElement(child, { ...contextValues });
            })}
        <Footer/>
        </div>
      </body>
    </html>
    </AppContext.Provider>
    </Provider>
  );
}
