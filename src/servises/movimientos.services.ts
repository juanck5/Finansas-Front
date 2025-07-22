import { tr } from "zod/locales";
import apiClient from "./apiClient.services";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { get } from "http";
export{ AxiosError } from "axios"

interface movimiento{
    id: number
    descripcion: string,
    monto: number,
    tipo: string,
    usuarioId: number
    fecha: string
    
}

interface createMovement{
    descripcion: string,
    monto: string | number,
    tipo: string,
   
}

const movimientosServices = {
    // getAll: async () => {
    //     return await apiClient.get("/movimientos");
    // },
    create: async (data: createMovement) => {
       try{
        const response = await apiClient.post("/movimientos", data)
        console.log("movimineto creado", response);
        
        return response

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
              message: "Error inesperado",
            };
          }
       }
    },
    //get all ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAll: async () => {
        try{
            const response = await apiClient.get("/movimientos")
            console.log("todos los moviminetso", response);

            return response

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
                  message: "Error inesperado",
                };
              }
        }
        
    }
}


export default movimientosServices