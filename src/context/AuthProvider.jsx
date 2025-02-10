import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    
    const [auth, setAuth] = useState({})
    useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')
        if(!token) return;

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
            setAuth(response)
        } catch (error) {
            console.log(error)
        }
      }
    
      autenticarUsuario();
    }, [])

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;