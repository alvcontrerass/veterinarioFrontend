import { createContext, useState, useEffect } from "react";

const PacienteContext = createContext();

export const PacienteProvider = ({children}) => {
    const [paciente, setPaciente] = useState([])

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem("token")
                if(!token) return
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/paciente`
                const call = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                const response = await call.json();
                setPaciente(response)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [])
    
    const guardarPaciente = async pacienteParams => {
        try {
            const token = localStorage.getItem("token")
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/paciente`
            const call = await fetch(url, {
                method: "POST",
                body: JSON.stringify(pacienteParams),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const response = await call.json()

            if(!call.ok) {
                console.log(response)
                return
            }
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = response;
            setPaciente([pacienteAlmacenado, ...paciente])
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <PacienteContext.Provider 
        value={{
            paciente,
            guardarPaciente
        }} >
            {children}
        </PacienteContext.Provider>
    )
}

export default PacienteContext;