import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegistroCliente from "./pages/RegistroCliente";
import RegistroEmpleado from "./pages/RegistroEmpleado";
import VehicleList from "./pages/VehicleList";
import HomePage from "./pages/home";
import RegistroVehiculo from "./pages/registrovehiculo";
import AdminPanel from "./pages/panelAdmin";
import { AuthProvider } from "./context/AuthContext";
import { CarrosProvider } from "./context/carroContext";
import { CategoriasProvider } from './context/categoriaContext';
import { ClientesProvider } from './context/clientecontext';  
import { SucursalesProvider } from './context/sucursalcontext';
import ReservationPage from "./pages/ReservationPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <AuthProvider>
      <CarrosProvider>
        <CategoriasProvider>
          <ClientesProvider>  {/* Ahora definido */}
            <SucursalesProvider> 
              <BrowserRouter>
                <Routes>
                   {/* Redirecciona automáticamente de / a /login */}
                    <Route path="/" element={<Navigate to="/login" />} />
            
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/reserva" element={<ReservationPage />} />
                    <Route path="/pago" element={<PaymentPage />} />
                    <Route path="/lista-vehiculos" element={<VehicleList />} />
                    <Route path="/registro-cliente" element={<RegistroCliente />} />
                    <Route path="/registro-empleado" element={<RegistroEmpleado />} />
                    <Route path="/registro-vehiculo" element={<RegistroVehiculo />} />
                    <Route path="/panel-admin" element={<AdminPanel />} />
          </Routes>
        </BrowserRouter>
      </SucursalesProvider>
          </ClientesProvider>
        </CategoriasProvider>
      </CarrosProvider>
    </AuthProvider>
  );
}

export default App;