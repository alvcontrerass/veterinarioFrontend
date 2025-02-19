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

    const actualizarDatos = async datos => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/perfil/${datos._id}`
            const call = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const response = await call.json();
            if(!call.ok) {
                return {
                    msg: response.msg,
                    error: true
                }
            }
            return {
                msg: "Los datos fueron actualizados",
                error: false
            }
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarPassword = async datos => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/actualizar-password`
            const call = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const response = await call.json();
            if(!call.ok) {
                console.log(response)
                return {
                    msg: response.msg,
                    error: true
                }
            }
            console.log(response)
            return {
                msg: response.msg,
                error: false
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarDatos,
                actualizarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;