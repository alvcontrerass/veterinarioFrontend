import { createContext, useState, useEffect } from "react";

const PacienteContext = createContext();

export const PacienteProvider = ({children}) => {
    const [paciente, setPaciente] = useState([])
    const [pacienteUnico, setPacienteUnico] = useState({})

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
        const token = localStorage.getItem("token")
        if(pacienteUnico._id) {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/paciente/${pacienteParams.id}`
                const call = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(pacienteParams),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                const response = await call.json();
                if(!call.ok) {
                    console.log(response)
                    return
                }
                console.log(response)
                const pacienteActualizado = paciente.map(pacienteState => pacienteState._id === response._id ? response : pacienteState)
                setPaciente(pacienteActualizado);
                console.log("actualizacion lograda")
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
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
    }

    const setEdicion = pacienteHook => {
        setPacienteUnico(pacienteHook)
    }

    return(
        <PacienteContext.Provider 
        value={{
            paciente,
            guardarPaciente,
            setEdicion,
            pacienteUnico
        }} >
            {children}
        </PacienteContext.Provider>
    )
}

export default PacienteContext;