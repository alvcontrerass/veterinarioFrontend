import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import OlvidePassword from './pages/OlvidePassword'
import Registrar from './pages/Registrar'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import ReestablecerPassword from './pages/ReestablecerPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<ReestablecerPassword />} />
          <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
