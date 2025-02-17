import usePaciente from "../hooks/usePaciente";
import Paciente from "./Paciente";

const ListadoPaciente = () => {
	const { paciente } = usePaciente();
	return (
		<>
			{paciente.length ? (
				<>
					<h2 className="font-bold text-3xl text-center">
						Listado de pacientes
					</h2>
					<p className="text-xl mt-5 mb-10 text-center">
						Administra tus {""}
						<span className="text-indigo-600 font-bold">Pacientes y Citas</span>
					</p>
					{paciente.map((pacientes) => (
						<Paciente key={pacientes._id} pacientes={pacientes} />
					))}
				</>
			) : (
				<>
					<h2 className="font-bold text-3xl text-center">No hay pacientes</h2>
					<p>
						Comienza agreganod pacientes{" "}
						<span className="text-indigo-600 font-bold">
							y apareceran en este lugar
						</span>
					</p>
				</>
			)}
		</>
	);
};

export default ListadoPaciente;
