import { useState } from "react";
import { Alerta } from "./Alerta";
import usePaciente from "../hooks/usePaciente";

const Formulario = () => {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");
    const [alerta, setAlerta] = useState({});
    const { guardarPaciente } = usePaciente()

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios", 
                error: true
            });
            return;
        }
        setAlerta({});
        guardarPaciente({nombre, propietario, email, fecha, sintomas})

    }

    const { msg } = alerta;

  return (
    <>
        <h2 className="font-bold text-3xl text-center">Formulario de Ingreso</h2>
        <p className="text-xl mt-5 mb-10 text-center">
            Agrega tus Pacientes y {" "}
            <span className="text-indigo-600 font-bold">
                Administralos
            </span>
        </p>
        <form onSubmit={handleSubmit} className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
            <div className="mb-5">
                <label htmlFor="nombre" className="mb-5 text-gray-700 uppercase font-bold">
                    Nombre Mascota
                    <input id="nombre" type="text" placeholder="Bigotes" value={nombre} onChange={e => setNombre(e.target.value)} className="border-1 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-500 focus:outline-2 focus:border-0" />
                </label>
            </div>
            <div className="mb-5">
                <label htmlFor="propietario" className="mb-5 text-gray-700 uppercase font-bold">
                    Propietario
                    <input id="propietario" type="text" placeholder="Juan Alvarado" value={propietario} onChange={e => setPropietario(e.target.value)} className="border-1 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-500 focus:outline-2 focus:border-0" />
                </label>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-5 text-gray-700 uppercase font-bold">
                    email
                    <input id="email" type="email" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} className="border-1 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-500 focus:outline-2 focus:border-0" />
                </label>
            </div>
            <div className="mb-5">
                <label htmlFor="fecha" className="mb-5 text-gray-700 uppercase font-bold">
                    Fecha
                    <input id="fecha" type="date" placeholder="01/01/2025" value={fecha} onChange={e => setFecha(e.target.value)} className="border-1 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-500 focus:outline-2 focus:border-0" />
                </label>
            </div>
            <div className="mb-5">
                <label htmlFor="sintomas" className="mb-5 text-gray-700 uppercase font-bold">
                    Sintomas
                    <textarea id="sintomas" placeholder="Cansancio, +12 horas sin comer, agresivo, etc." value={sintomas} onChange={e => setSintomas(e.target.value)} className="border-1 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-indigo-500 focus:outline-2 focus:border-0" />
                </label>
            </div>
            <input type="submit" value="Agregar Paciente" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" />
            {msg && <Alerta alerta={alerta} />}
        </form>
    </>
  )
}

export default Formulario;
