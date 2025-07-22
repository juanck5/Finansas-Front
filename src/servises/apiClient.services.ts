import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const apiClient = axios.create({
    baseURL: apiURL,
});

//Interceptar peticiones al servidor para agregar la cabecera de autenticación
apiClient.interceptors.request.use(
    (config) => {
        //leer el token desde el local storage
        const storagedUser = localStorage.getItem("userData");
        if(storagedUser){
            const { token } = JSON.parse(storagedUser);
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
        
    },
    (error) => Promise.reject(error)
)

export default apiClient;