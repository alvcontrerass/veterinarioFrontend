import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import { Alerta } from "../components/Alerta"


const EditarPerfil = () => {
    const { auth, actualizarDatos } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    },[auth])

    const handleSubmit = e => {
        e.preventDefault();

        const { nombre, email } = perfil
        if([nombre, email].includes("")) {
            setAlerta({
                msg: "Email y Nombre son obligatorios",
                error: true
            })
            return
        }

        actualizarDatos(perfil)
    }

    const { msg } = alerta

  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {" "} <span className="text-indigo-600 font-bold">Informacion</span></p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                        <input 
                            type="text"
                            className="bg-gray-50 w-full p-2 mt-5 rounded-lg border-1 border-gray-300 focus:outline-indigo-500 focus:outline-2 focus:border-0"
                            name="nombre"
                            value= {perfil.nombre || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio Web</label>
                        <input 
                            type="text"
                            className="bg-gray-50 w-full p-2 mt-5 rounded-lg border-1 border-gray-300 focus:outline-indigo-500 focus:outline-2 focus:border-0"
                            name="web"
                            value= {perfil.web || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Telefono</label>
                        <input 
                            type="text"
                            className="bg-gray-50 w-full p-2 mt-5 rounded-lg border-1 border-gray-300 focus:outline-indigo-500 focus:outline-2 focus:border-0"
                            name="telfono"
                            value= {perfil.telfono || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                        <input 
                            type="email"
                            className="bg-gray-50 w-full p-2 mt-5 rounded-lg border-1 border-gray-300 focus:outline-indigo-500 focus:outline-2 focus:border-0"
                            name="email"
                            value= {perfil.email || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <input type="submit" value="Actualizar Datos" className="bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase mt-5 w-full hover:bg-indigo-700 cursor-pointer transition-colors"/>
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil