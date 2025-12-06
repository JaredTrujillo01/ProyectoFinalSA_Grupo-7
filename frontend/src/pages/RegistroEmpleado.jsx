import { useState } from "react";
import { register } from "../api/auth";
import PasswordField from "../components/PasswordField";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";

const RegistroEmpleado = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    cargo: "",
    rol: "empleado"
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await register(form);
      alert("Empleado registrado");
      window.location.href = "/login";
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Registro de Empleado
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={form.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Correo"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <PasswordField
            label="Contraseña"
            value={form.password}
            onChange={(v) => handleChange("password", v)}
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Cargo"
            value={form.cargo}
            onChange={(e) => handleChange("cargo", e.target.value)}
          >
            <MenuItem value="gerente">Gerente</MenuItem>
            <MenuItem value="vendedor">Vendedor</MenuItem>
            <MenuItem value="administrativo">Administrativo</MenuItem>
          </TextField>

          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
            Registrar Empleado
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistroEmpleado;
