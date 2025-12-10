import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sucursales from "./pages/Sucursales";
import Carros from "./pages/Carros";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sucursales" replace />} />
        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/carros" element={<Carros />} />
      </Routes>
    </BrowserRouter>
  );
}
