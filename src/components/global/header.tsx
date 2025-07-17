"use client"
import { Button } from "../ui/button"
import AuthMenu from "@/components/auth/authMenu"

export default function Header(){
    return (
       <div className="w-full h-16 flex items-center justify-end bg-[#FAF7F3] sticky top-0 py-2 px-4">
        {/* <Button onClick={() => {
            console.log("clicked");
        }}>
        Login</Button> */}
        <AuthMenu/>
        

       </div>
    )
}