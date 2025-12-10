import React, { useState, useEffect } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { getSucursales, createSucursal } from "../../api/sucursale";


const AdminBranches = () => {
  const [sucursales, setSucursales] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", ubicacion: "" });

  useEffect(() => {
    const loadSucursales = async () => {
      try {
        const data = await getSucursales();
        setSucursales(data);
      } catch (error) {
        console.error("Error cargando sucursales:", error);
      }
    };
    loadSucursales();
  }, []);

  const handleSubmit = async () => {
    try {
      await createSucursal(formData);
      alert("Sucursal registrada");
      setOpen(false);
      // Recarga lista
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Agregar Sucursal
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Ubicación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sucursales.map((suc) => (
              <TableRow key={suc.id}>
                <TableCell>{suc.id}</TableCell>
                <TableCell>{suc.nombre}</TableCell>
                <TableCell>{suc.ubicacion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Sucursal</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Ubicación" value={formData.ubicacion} onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminBranches;