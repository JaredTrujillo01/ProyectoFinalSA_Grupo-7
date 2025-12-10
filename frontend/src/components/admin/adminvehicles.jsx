// src/components/admin/AdminVehicles.jsx
import React, { useState, useContext } from "react";  // Agrega useContext
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { CarrosContext } from "../../context/carroContext";
import AddVehicleForm from "../../components/vehicles/addvehicle";  // Path corregido (asegúrate de que el archivo sea AddVehicleForm.jsx)

const AdminVehicles = () => {
  const { carros } = useContext(CarrosContext);  // Ahora useContext está importado
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Registrar Vehículo
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carros.map((carro) => (  // Ahora se usa 'carros'
              <TableRow key={carro.carro_id}>
                <TableCell>{carro.carro_id}</TableCell>
                <TableCell>{carro.marca}</TableCell>
                <TableCell>{carro.modelo}</TableCell>
                <TableCell>{carro.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Registro de Vehículo</DialogTitle>
        <DialogContent>
          <AddVehicleForm onClose={() => setOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminVehicles;