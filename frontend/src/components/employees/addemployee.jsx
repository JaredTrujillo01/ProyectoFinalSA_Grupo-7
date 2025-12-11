import React, { useState, useContext } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { EmpleadosContext } from "../../context/empleadoContext";
import { SucursalesContext } from "../../context/sucursalcontext";
import { register } from "../../api/auth";
import PasswordField from "../PasswordField";

const AddEmployeeForm = ({ onClose }) => {
  const { loadEmpleados } = useContext(EmpleadosContext);
  const { sucursales } = useContext(SucursalesContext);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    cargo: "",
    sucursal_id: "",
    rol: "empleado"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (value) => {
    setFormData({ ...formData, password: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.email) newErrors.email = "El correo es requerido";
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    if (!formData.cargo) newErrors.cargo = "El cargo es requerido";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        await register(formData);
        alert("Empleado registrado exitosamente");
        setFormData({
          nombre: "",
          email: "",
          password: "",
          cargo: "",
          sucursal_id: "",
          rol: "empleado"
        });
        setErrors({});
        await loadEmpleados();
        if (onClose) onClose();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.nombre}
          helperText={errors.nombre}
          sx={{ mb: 2, mt: 2 }}
        />

        <TextField
          label="Correo"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />

        <PasswordField
          label="Contraseña"
          value={formData.password}
          onChange={handlePasswordChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          select
          label="Cargo"
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.cargo}
          helperText={errors.cargo}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Seleccionar Cargo</MenuItem>
          <MenuItem value="gerente">Gerente</MenuItem>
          <MenuItem value="vendedor">Vendedor</MenuItem>
          <MenuItem value="administrativo">Administrativo</MenuItem>
        </TextField>

        <TextField
          select
          label="Sucursal"
          name="sucursal_id"
          value={formData.sucursal_id}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Seleccionar Sucursal</MenuItem>
          {sucursales.map((suc) => (
            <MenuItem key={suc.sucuersal_id} value={suc.sucuersal_id}>
              {suc.nombre}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrar Empleado
        </Button>
      </form>
    </Box>
  );
};

export default AddEmployeeForm;
