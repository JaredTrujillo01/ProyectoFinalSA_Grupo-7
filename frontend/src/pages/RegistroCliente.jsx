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
  Link,
} from "@mui/material";

const RegistroCliente = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    licencia: "",
    rol: "cliente"
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await register(form);
      alert("Cuenta creada exitosamente");
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
            Registro de Cliente
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
            fullWidth
            margin="normal"
            label="Número de Teléfono"
            value={form.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Licencia"
            value={form.licencia}
            onChange={(e) => handleChange("licencia", e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Crear Cuenta
          </Button>

          <Typography textAlign="center" mt={2}>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" underline="hover">Inicia sesión</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistroCliente;
