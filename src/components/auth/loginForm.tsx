"use client"
import {useForm, SubmitHandler} from "react-hook-form"; // react hook form sirve para manejar formularios
import {z} from "zod"; // zod
import { zodResolver } from "@hookform/resolvers/zod";  // zod resolver sirve para resolver los formularios
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CustomPasswordInput from "./customPasswordInput";
import authServices from "@/servises/auth.services";
import { useUser } from "@/contexts/user.context"; //
import { tr } from "zod/locales";


const loginSchema = z.object({
    email: z.string().email("El correo no es válido").nonempty("El correo es requerido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").nonempty("La contraseña es requerida"),

})

type Logintype = z.infer<typeof loginSchema>

export default function LoginForm(){

    
    const { setUserName, setEmail, setToken, setActive, active, userName, email, token } = useUser();
    

    // se declaran los formularios con react hook form 
    const { 
        register,  // sirve para registrar los formularios
        handleSubmit, // sirve para manejar los formularios
        formState: { 
            errors // sirve para manejar los errores
        },
         
 } = useForm<Logintype>({
        resolver: zodResolver(loginSchema)
    })


    const  onSubmit:  SubmitHandler<Logintype> = async (data) => {
        
       const registeredUser = await authServices.login(data)
       console.log("registeredUser", registeredUser)
        if ('data' in registeredUser && registeredUser.status === 200) {
        console.log("entre al 200");
        console.log(registeredUser.data.message)
        setUserName(registeredUser.data.user.userName);
        setEmail(registeredUser.data.user.email);
        setToken(registeredUser.data.token);
        setActive(true);
    } 
        if("data" in registeredUser && registeredUser.status === 400){
            console.log("entre al 400");
            console.log(registeredUser.data.message)
        }

        console.log("datos del provider", active, userName, email, token);
      
       return registeredUser;
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Input {...register("email")} placeholder="Email" className=""/>
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            {/* <Input {...register("password")} placeholder="Password" type={showPassword ? "text" : "password"} /> */}
            <CustomPasswordInput inputPlaceholder="Password" register={register("password")}/>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            <Button type="submit">Login</Button>

            
        </form>
    )
}