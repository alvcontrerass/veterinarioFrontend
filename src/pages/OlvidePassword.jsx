import {Link} from "react-router-dom"
import { useState } from "react";
import { Alerta } from "../components/Alerta";

const OlvidePassword = () => {
	const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async e => {
		e.preventDefault()
		if(email === '') {
			setAlerta({
				msg: 'El email es obligatorio',
				error: true
			})
		}

		try {
			const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/olvide-password`
			const call =await fetch(url, {
			method: "POST",
			body: JSON.stringify({email}),
			headers: {
			"Content-Type": "application/json"
			}
		})
			const response = await call.json()
			if (call.status === 200) {
				setAlerta({
					msg: "Hemos enviado un email para que puedas reestablecer tu password",
					error: false
				})
			} else {
				setAlerta({
					msg: response.msg,
					error: true
				})
			}
		} catch (error) {
			console.log("Hubo un error en la conexion", error)
		}
	}

	const {msg} = alerta
  

  return (
    <>
        <div>
				<h1 className="text-indigo-600 font-black text-6xl text-center md:text-left p-5 ">
					Reestablece tu Password y Recupera tu{" "}
					<span className="text-black">Acceso</span>
				</h1>
			</div>
			<div className="mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{msg && <Alerta alerta={alerta} />}
				<form onSubmit={handleSubmit}>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Email
							<input
								type="email"
								placeholder="email@email.com"
								className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
								value={email}
                                onChange={e => setEmail(e.target.value)}
							/>
						</label>
					</div>
					<input
						type="submit"
						value="recuperar"
						className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
					/>
				</form>
				<nav className="mt-10 lg:flex lg:justify-between">
					<Link
						className="block text-center my-5 text-gray-500"
						to="/registrar"
					>
						¿No tienes una cuenta? Registrate
					</Link>
					<Link
						className="block text-center my-5 text-gray-500"
						to="/"
					>
						¿Tienes cuenta? Inicia Sesion
					</Link>
				</nav>
			</div>
    </>
  )
}

export default OlvidePassword