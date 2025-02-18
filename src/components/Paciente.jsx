import usePaciente from "../hooks/usePaciente";

const Paciente = ({ pacientes }) => {
	const { setEdicion, eliminarPaciente } = usePaciente();
	const { nombre, propietario, email, fecha, sintomas, _id } = pacientes;
	const formatearFecha = (fecha) => {
		const nuevaFecha = new Date(fecha);
		return new Intl.DateTimeFormat("es-CL", { dateStyle: "long" }).format(
			nuevaFecha,
		);
	};
	return (
		<div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
			<p className="font-bold uppercase text-indigo-700 my-2">
				Nombre:{" "}
				<span className="font-normal normal-case text-black">{nombre}</span>
			</p>
			<p className="font-bold uppercase text-indigo-700 my-2">
				Propietario:{" "}
				<span className="font-normal normal-case text-black">
					{propietario}
				</span>
			</p>
			<p className="font-bold uppercase text-indigo-700 my-2">
				Email:{" "}
				<span className="font-normal normal-case text-black">{email}</span>
			</p>
			<p className="font-bold uppercase text-indigo-700 my-2">
				fecha:{" "}
				<span className="font-normal normal-case text-black">
					{formatearFecha(fecha)}
				</span>
			</p>
			<p className="font-bold uppercase text-indigo-700 my-2">
				sintomas:{" "}
				<span className="font-normal normal-case text-black">{sintomas}</span>
			</p>
			<div className="flex justify-between my-5">
				<button
					className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-xl cursor-pointer"
					type="button"
					onClick={() => {
						setEdicion(pacientes);
					}}
				>
					Editar
				</button>
				<button
					className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-xl cursor-pointer"
					type="button"
					onClick={() => {
						eliminarPaciente(_id)
					}}
				>
					Eliminar
				</button>
			</div>
		</div>
	);
};

export default Paciente;
