import {useState, useEffect, createContext } from "react";
import clienteAxios from "../config/ClienteAxios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false);
                return 
            }

            const config = {
                headers: {
                    "Content-Type": "applicacion/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.get(`/perfil`, config)
                setAuth(data)

            } catch (error) {
                setAuth({mensaje: error})
            }

            setCargando(false)
        }
        
        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        setAuth({})
    }
    
    return ( 
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}>
            {children}
        </AuthContext.Provider>
     );
}
 export { AuthProvider }
export default AuthContext;