import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trekit:Style With Sustainability",
  description: "Generated by create next app",
  icons:{
    icon:"/favicon.ico"
  }
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="outer w-100% h-100%">
        <Navbar/>
        {children}
        <Footer/>
        </div>
      </body>
    </html>
  );
}
