import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";

const ConfirmarCuenta = () => {
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
	const [cargando, setCargando] = useState(true);
	const [alerta, setAlerta] = useState({});
	const params = useParams();
	const { token } = params;

	useEffect(() => {
		const confirmarCuenta = async () => {
			try {
				const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/confirmar/${token}`;
				const call = await fetch(url);
				const response = await call.json();
				console.log(call.ok);
				console.log(response);
				if (!call.ok) {
					setAlerta({
						msg: response.msg,
						error: true,
					});
				} else {
					setCuentaConfirmada(true);
					setAlerta({
						msg: response.msg,
						error: false,
					});
				}
			} catch (error) {
				console.log(error);
			}

			setCargando(false);
		};
		confirmarCuenta();
	}, []);

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl text-center md:text-left p-5 ">
					Confirma tu Cuenta y Administra tus{" "}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div className="mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{!cargando && <Alerta alerta={alerta} />}
				{cuentaConfirmada && (
					<Link className="block text-center my-5 text-gray-500" to="/">
						Inicia Sesion
					</Link>
				)}
			</div>
		</>
	);
};

export default ConfirmarCuenta;
