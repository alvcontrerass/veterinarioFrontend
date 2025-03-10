import { Link } from "react-router-dom";
import { useState } from "react";
import { Alerta } from "../components/Alerta";

const Registrar = () => {
	const [nombre, setNombre] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repetirPassword, setRepetirPassword] = useState("");
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if ([nombre, email, password, repetirPassword].includes("")) {
			setAlerta({ msg: "Todos los campos son obligatorios", error: true });
			return;
		}
		if (password !== repetirPassword) {
			setAlerta({ msg: "Los password no son iguales", error: true });
			return;
		}
		if (password.length < 6) {
			setAlerta({
				msg: "El password debe tener al menos 6 caracteres",
				error: true,
			});
			return;
		}
		setAlerta({});

		try {
			const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario`;
			const call = await fetch(url, {
				method: "POST",
				body: JSON.stringify({ nombre, email, password }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const response = await call.json();
			if (call.status === 200) {
				setAlerta({
					msg: "Creado correctamente, revisa tu email",
					error: false,
				});
			} else {
				setAlerta({
					msg: response.msg,
					error: true,
				});
			}
		} catch (error) {
			console.log("Hubo un error en la conexion", error);
		}
	};

	const { msg } = alerta;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">
					Crea tu cuenta y Administra tus{" "}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div className="mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{msg && <Alerta alerta={alerta} />}
				<form onSubmit={handleSubmit}>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Nombre
							<input
								type="text"
								placeholder="Francisco Mayol"
								className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							/>
						</label>
					</div>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Email
							<input
								type="email"
								placeholder="email@email.com"
								className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
					</div>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Password
							<input
								type="password"
								placeholder="·········"
								className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
					</div>
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Repetir password
							<input
								type="password"
								placeholder="·········"
								className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
								value={repetirPassword}
								onChange={(e) => setRepetirPassword(e.target.value)}
							/>
						</label>
					</div>
					<input
						type="submit"
						value="registrar"
						className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
					/>
				</form>
				<nav className="mt-10 lg:flex lg:justify-between">
					<Link className="block text-center my-5 text-gray-500" to="/">
						¿Tienes cuenta? Inicia Sesion
					</Link>
					<Link
						className="block text-center my-5 text-gray-500"
						to="/olvide-password"
					>
						Olvide mi contraseña
					</Link>
				</nav>
			</div>
		</>
	);
};

export default Registrar;
