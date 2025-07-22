"use client"

import AuthMenu from "@/components/auth/authMenu"
import { useUser } from "@/contexts/user.context"
import UserDropDown from "../auth/userDropDown"
import CreateMovementDialog from "../movimientos/createDialog"

export default function Header(){
    const { active } = useUser();
    return (
       <div className="w-full h-16 flex items-center justify-end bg-[#FAF7F3] sticky top-0 py-2 px-4 gap-2.5">
        {/* <Button onClick={() => {
            console.log("clicked");
        }}>
        Login</Button> */}
        {active == true && <CreateMovementDialog/>}
        {active == true ? (
            
            <UserDropDown/>
        ):  <AuthMenu/>}
       
        

       </div>
    )
}