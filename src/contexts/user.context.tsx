//context y provder para manejar datos glovales del usurio nombre, email y token
"use client"
import{createContext, useState, useContext, useEffect} from "react";

interface UserContextType{
    active: boolean,
    userName: string | null,
    email: string | null,
    token: string | null,
    setUserName: (userName: string | null) => void,
    setEmail: (email: string | null) => void,
    setToken: (token: string | null) => void,
    setActive: (active: boolean) => void
    clearUser: () => void
}

const userContext = createContext<UserContextType | undefined>(undefined);  // creamos el context 


export const UserProvider = ({children}: {children: React.ReactNode}) => {

    
    const [active, setActive] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>( null);
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    //cargar datos desde el localStorage al iniciar la app
    useEffect(() => {
        

        const storagedUser = localStorage.getItem("userData");
        if(storagedUser){
            try{
                const parsed = JSON.parse(storagedUser);
                setActive(parsed.active || false);
                setUserName(parsed.userName || null);
                setEmail(parsed.email || null);
                setToken(parsed.token || null);
            }catch(err){
                console.log("Error al leer los datos", err);

            }
        }
    }, []);

    //actualizar los datos 
     useEffect(() => {
    const userData = JSON.stringify({ userName, email, token, active });
    localStorage.setItem("userData", userData);
  }, [userName, email, token, active]);

    const clearUser = () => {
        setActive(false);
        setUserName(null);
        setEmail(null);
        setToken(null);
    }



    return (
        <userContext.Provider value={{active, userName, email, token, setUserName, setEmail, setToken, setActive, clearUser}}>
            {children}
        </userContext.Provider>
    )
    
}

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};