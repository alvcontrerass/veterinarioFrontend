import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alerta } from "../components/Alerta";

const ReestablecerPassword = () => {
	const [password, setPassword] = useState("");
	const [alerta, setAlerta] = useState({});
	const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
	const params = useParams();
	const { token } = params;

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/olvide-password/${token}`;
				const call = await fetch(url);
				const response = await call.json();
				if (call.status === 200) {
					setAlerta({
						msg: "Ingresa tu Nueva Password",
						error: false,
					});
					setTokenValido(true);
				} else {
					setAlerta({
						msg: "Hubo un problema con tu recuperacion. Vuelve a intentar o comunicate con soporte",
						error: true,
					});
					console.log(response);
				}
			} catch (error) {
				console.log(error);
			}
		};
		comprobarToken();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password < 6) {
			setAlerta({
				msg: "El password debe tener al menos 6 caracteres",
				error: true,
			});
			return;
		}
		try {
			const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/olvide-password/${token}`;
			const call = await fetch(url, {
				method: "POST",
				body: JSON.stringify({ password }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const response = await call.json();
			if (call.status === 200) {
				setAlerta({
					msg: response.msg,
					error: false,
				});
                setPasswordModificado(true);
			} else {
				setAlerta({
					msg: "Hubo un error en el reestablecimiento de tu password. Vuelve a intentar o comunicate con soporte",
					error: true,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const { msg } = alerta;

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
				{tokenValido && (
					<>
						<form onSubmit={handleSubmit}>
							<div className="my-5">
								<label className="uppercase text-gray-600 block text-xl font-bold">
									Ingresa tu nuevo Password
									<input
										type="password"
										placeholder="··········"
										className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</label>
							</div>
							<input
								type="submit"
								value="Reestablecer Password"
								className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
							/>
						</form>
						{passwordModificado && (
                            <Link className="block text-center my-5 text-gray-500" to="/">
							    ¡Prueba tu nuevo password! Inicia sesion
						    </Link>
                        )}
                        
					</>
				)}
			</div>
		</>
	);
};

export default ReestablecerPassword;
