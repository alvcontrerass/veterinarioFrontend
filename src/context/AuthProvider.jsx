import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/perfil`
            const call = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
                }
            })
            const response = await call.json()
            if(!call.ok) {
                console.log(response.msg)
                setAuth({})
                return
            }
            setAuth(response.perfil)
        } catch (error) {
            console.log(error)
        }
        setCargando(false)
      }
    
      autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarDatos = datos => {
        console.log(datos)
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarDatos
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;