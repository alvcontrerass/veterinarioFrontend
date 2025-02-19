import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { PacienteProvider } from './context/PacienteProvider'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida  from "./layout/RutaProtegida"
import Login from './pages/Login'
import OlvidePassword from './pages/OlvidePassword'
import Registrar from './pages/Registrar'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import ReestablecerPassword from './pages/ReestablecerPassword'
import AdmnistrarPaciente from './pages/AdministrarPaciente'
import EditarPerfil from './pages/EditarPerfil' 
import CambiarPassword from './pages/CambiarPassword' 



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<ReestablecerPassword />} />
              <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/admin" element={<RutaProtegida />} >
              <Route index element={<AdmnistrarPaciente />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
