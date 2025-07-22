import {z}  from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import CustomPasswordInput from "./customPasswordInput";
import { Button } from "../ui/button";
import authServices from "@/servises/auth.services";
import { toast } from "sonner";

const registerSchema = z.object({
    email: z.string().email("El correo no es válido").nonempty("El correo es requerido"),
    userName: z.string().nonempty("El nombre de usuario es requerido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").nonempty("La contraseña es requerida"),
    confirmPassword: z.string().nonempty("La confirmación de contraseña es requerida").min(6, "La confirmación de contraseña debe tener al menos 6 caracteres")
})


type RegisterType = z.infer<typeof registerSchema>

export default function RegisterUserForm(){
    const { 
        register,  // sirve para registrar los formularios
        handleSubmit,
        reset, // sirve para manejar los formularios
        formState: { 
            errors // sirve para manejar los errores
        },
        watch 
     } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema)
    });

    
    const onSubmit: SubmitHandler<RegisterType> = async(data) => {
        // console.log(data);
      const usuarioRegistradoActual =  await authServices.register(data);

      if(usuarioRegistradoActual?.status === 201){
        toast.success("Usuario registrado exitosamente");
        reset();
          
      }

      console.log("usuarioRegistradoActual", usuarioRegistradoActual);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Input {...register("email")} placeholder="Email" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            <Input {...register("userName")} placeholder="Username" />
            {errors.userName && <p className="text-red-500 text-xs">{errors.userName.message}</p>}
            <CustomPasswordInput inputPlaceholder="Password" register={register("password")}/>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            <CustomPasswordInput inputPlaceholder="Confirm Password" register={register("confirmPassword")}/>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            <Button type="submit">Register</Button>
            </form>
        
    )
}