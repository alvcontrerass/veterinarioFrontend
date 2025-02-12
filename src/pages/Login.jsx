import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Alerta } from "../components/Alerta";

const Login = () => {
	useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [alerta, setAlerta] = useState({});
	
	const { setAuth } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault();
		if([email, password].includes("")) {
			setAlerta({
				msg: "Debe ingresar sus credenciales",
				error: true
			})
			return;
		}

		try {
			const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/login`;
			const call = await fetch(url, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const response = await call.json();
			console.log(call)
			if(!call.ok) {
				setAlerta({
					msg: response.msg,
					error: true,
				});
				return
			}
			localStorage.setItem("token", response.token)
			console.log("token guardado en localStorage")
			setAuth(response)
			navigate("/admin")
			
		} catch (error) {
			console.log(error);
		}
	};

	const { msg } = alerta;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl text-center md:text-left p-5 ">
					Inicia Sesion y Administra tus{" "}
					<span className="text-black">Pacientes</span>
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
					<input
						type="submit"
						value="login"
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
						to="/olvide-password"
					>
						Olvide mi contraseña
					</Link>
				</nav>
			</div>
		</>
	);
};

export default Login;
