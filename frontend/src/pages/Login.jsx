import { useState } from "react";
import { login } from "../api/auth";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const user = await login(email, password);

      if (user.rol === "admin") {
        window.location.href = "/panel-admin";
      } else if (user.rol === "cliente") {
        window.location.href = "/home";
      } else {
        window.location.href = "/dashboard-empleado";
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Iniciar Sesión
          </Typography>

          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            label="Contraseña"
            value={password}
            onChange={setPassword}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Entrar
          </Button>

          <Typography textAlign="center" mt={2}>
            ¿No tienes cuenta?{" "}
            <Link href="/registro-cliente" underline="hover">
              Crear cuenta
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
