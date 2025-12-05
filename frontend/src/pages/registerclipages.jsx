import { useState } from "react";
import { register } from "../api/auth";

export default function RegisterClientePage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    licencia: "",
    telefono: ""
  });

  const handleRegister = async () => {
    try {
      const usuario = await register({ ...form, rol: "cliente" });
      alert("Cliente registrado exitosamente!");
      console.log(usuario);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Registro Cliente</h2>
      <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
      <input placeholder="Licencia" value={form.licencia} onChange={e => setForm({...form, licencia: e.target.value})} />
      <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
      <button onClick={handleRegister}>Registrar Cliente</button>
    </div>
  );
}
