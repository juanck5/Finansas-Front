//componente donde se encuentra el formulario de login y registro 

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./loginForm"
import RegisterUserForm from "./registerForm"
import * as Icon from "@phosphor-icons/react"

export default function AuthMenu(){
    return (
        <Sheet>
          <SheetTrigger asChild>
           <Icon.UserCircleIcon size={32}/>
          </SheetTrigger>
          <SheetContent className="py-9 bg-[#FAF7F3] border-0 px-5">
          <Tabs defaultValue="login" >
          <TabsList className="w-full">
            <TabsTrigger value="login" >Login </TabsTrigger>
            <TabsTrigger value="register">Registro </TabsTrigger>
          </TabsList>
          <TabsContent value="login"><LoginForm/></TabsContent>
  <TabsContent value="register"><RegisterUserForm/></TabsContent>

        </Tabs>
          </SheetContent>

        </Sheet>




 
    )
}