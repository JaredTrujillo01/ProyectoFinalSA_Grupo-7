import { useState } from "react";
import { register } from "../api/auth";

export default function RegisterEmpleadoPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    cargo: "",
    sucursal_id: ""
  });

  const handleRegister = async () => {
    try {
      const usuario = await register({ ...form, rol: "empleado" });
      alert("Empleado registrado exitosamente!");
      console.log(usuario);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Registro Empleado</h2>
      <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
      <input placeholder="Cargo" value={form.cargo} onChange={e => setForm({...form, cargo: e.target.value})} />
      <input placeholder="Sucursal ID" value={form.sucursal_id} onChange={e => setForm({...form, sucursal_id: e.target.value})} />
      <button onClick={handleRegister}>Registrar Empleado</button>
    </div>
  );
}
