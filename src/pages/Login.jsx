import { Link } from "react-router-dom";

const Login = () => {
	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl text-center md:text-left p-5 ">
					Inicia Sesion y Administra tus{" "}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>
			<div className="mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				<form action="">
					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Email
							<input
								type="email"
								placeholder="email@email.com"
								className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
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
