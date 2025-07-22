

import apiClient from "./apiClient.services";
import { AxiosError } from "axios";
import { toast } from "sonner";



interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

interface LoginData {
  email: string;
  password: string;
}

const authServices = {
  
login: async (data: LoginData) => {
    try{
        
        const response = await apiClient.post("/auth/login", data)
        console.log(response);
        if(response.status === 200){
            console.log("entre al 200");
            console.log(response.data.message)
            
            return response
        }
        
        if(response.status === 400){
            console.log("entre al 400");
            console.log(response.data.message)
        }
        throw new Error(response.data.message)
    }catch(err){
       const axiosError = err as AxiosError<{message: string}>

       if (axiosError.response) {
        console.log("Status:", axiosError.response.status);
        console.log("Mensaje:", axiosError.response.data?.message);
        toast.error(axiosError.response.data?.message)

        // Puedes retornar el error o lanzar uno nuevo con más control
        return {
          status: axiosError.response.status,
          message: axiosError.response.data?.message,
        };
      } else {
        console.error("Error inesperado", err);
        return {
          status: 500,
          message: "Error de red o del servidor",
        };
      }
        // console.log(err?.response?.data?.message)
        
        
    }
},

//logout//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Register////////////////////////////////////////////////////////////////////////////////////////////////////////////////
register: async (data: RegisterData) => {
   try{
    const response = await apiClient.post("/auth/register", data)
    console.log(response);
   
        
        console.log(response.data.message)
        
        return response
    
    
  

   }catch(err){
   const axiosError = err as AxiosError<{message: string}>

       if (axiosError.response) {
        console.log("Status:", axiosError.response.status);
        console.log("Mensaje:", axiosError.response.data?.message);

        // Puedes retornar el error o lanzar uno nuevo con más control
        return {
          status: axiosError.response.status,
          message: axiosError.response.data?.message,
        };
      } else {
        console.error("Error inesperado", err);
        return {
          status: 500,
          message: "Error de red o del servidor al registrarse",
        };
      }
   }  
}

}

export default authServices