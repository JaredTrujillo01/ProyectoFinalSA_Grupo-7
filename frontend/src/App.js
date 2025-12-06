import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//                                                     ↑ Añade Navigate
import Login from "./pages/Login";
import RegistroCliente from "./pages/RegistroCliente";
import RegistroEmpleado from "./pages/RegistroEmpleado";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecciona automáticamente de / a /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/registro-cliente" element={<RegistroCliente />} />
        <Route path="/registro-empleado" element={<RegistroEmpleado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;