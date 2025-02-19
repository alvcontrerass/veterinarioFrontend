import { useState } from "react"
import AdminNav from "../components/AdminNav"
import { Alerta } from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    passwordActual: "",
    passwordNuevo: ""
  })
  const { actualizarPassword } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault();
    if(Object.values(password).some( campo => campo === "")) {
      setAlerta({
        msg:"Todos los campos son obligatorios",
        error: true
      })
      console.log(alerta)
      return
    }

    if(password.passwordNuevo.length < 6) {
      setAlerta({
        msg:"El password nuevo debe tener al menos 6 caracteres",
        error: true
      })
      return
    }

    const resultado = await actualizarPassword(password);
    setAlerta(resultado)
  }

  const { msg } = alerta;

  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {" "} <span className="text-indigo-600 font-bold">Password</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="passwordActual" className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input 
                            type="password"
                            className="bg-gray-50 w-full p-2 mt-5 rounded-lg border-1 border-gray-300 focus:outline-indigo-500 focus:outline-2 focus:border-0"
                            name="passwordActual"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="passwordNuevo" className="uppercase font-bold text-gray-600">Password nueva</label>
                        <input 
                            type="password"
                            className="bg-gray-50 w-full p-2 mt-5 rounded-lg border-1 border-gray-300 focus:outline-indigo-500 focus:outline-2 focus:border-0"
                            name="passwordNuevo"
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <input type="submit" value="Cambiar Password" className="bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase mt-5 w-full hover:bg-indigo-700 cursor-pointer transition-colors"/>
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword