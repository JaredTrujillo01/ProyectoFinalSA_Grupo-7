import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem } from "@mui/material";
import { CarrosContext } from "../../context/carroContext";
import { CategoriasContext } from "../../context/categoriaContext";
import AddVehicleForm from "../../components/vehicles/addvehicle";

const AdminVehicles = () => {
  const { carros, loadCarros, editCarro, removeCarro } = useContext(CarrosContext);
  const { categorias } = useContext(CategoriasContext);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCarros();
  }, [loadCarros]);

  const filteredVehicles = carros.filter(car =>
    car.marca.toLowerCase().includes(search.toLowerCase()) ||
    car.modelo.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar vehículo?")) {
      try {
        await removeCarro(id);
        alert("Vehículo eliminado exitosamente");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editCarro(editingVehicle.carro_id, editingVehicle);
      alert("Vehículo actualizado exitosamente");
      setEditOpen(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField 
          label="Buscar" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          sx={{ width: '300px' }} 
        />
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Registrar Vehículo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map((carro) => (
              <TableRow key={carro.carro_id}>
                <TableCell>{carro.carro_id}</TableCell>
                <TableCell>{carro.placa}</TableCell>
                <TableCell>{carro.marca}</TableCell>
                <TableCell>{carro.modelo}</TableCell>
                <TableCell>{carro.anio}</TableCell>
                <TableCell>{carro.categoria?.nombre || "N/A"}</TableCell>
                <TableCell>{carro.estado}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(carro)} sx={{ mr: 1 }}>Editar</Button>
                  <Button onClick={() => handleDelete(carro.carro_id)} color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para crear */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Registro de Vehículo</DialogTitle>
        <DialogContent>
          <AddVehicleForm onClose={() => setOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para editar */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Vehículo</DialogTitle>
        <DialogContent>
          <TextField 
            label="Placa" 
            value={editingVehicle?.placa || ""} 
            onChange={(e) => setEditingVehicle({ ...editingVehicle, placa: e.target.value })} 
            fullWidth 
            sx={{ mt: 2, mb: 2 }} 
          />
          <TextField 
            label="Marca" 
            value={editingVehicle?.marca || ""} 
            onChange={(e) => setEditingVehicle({ ...editingVehicle, marca: e.target.value })} 
            fullWidth 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Modelo" 
            value={editingVehicle?.modelo || ""} 
            onChange={(e) => setEditingVehicle({ ...editingVehicle, modelo: e.target.value })} 
            fullWidth 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Año" 
            type="number"
            value={editingVehicle?.anio || ""} 
            onChange={(e) => setEditingVehicle({ ...editingVehicle, anio: e.target.value })} 
            fullWidth 
            sx={{ mb: 2 }} 
          />
          <TextField 
            select
            label="Estado" 
            value={editingVehicle?.estado || ""} 
            onChange={(e) => setEditingVehicle({ ...editingVehicle, estado: e.target.value })} 
            fullWidth 
            sx={{ mb: 2 }} 
          >
            <MenuItem value="disponible">Disponible</MenuItem>
            <MenuItem value="alquilado">Alquilado</MenuItem>
            <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
          </TextField>
          <TextField 
            select
            label="Categoría" 
            value={editingVehicle?.categoria_id || ""} 
            onChange={(e) => setEditingVehicle({ ...editingVehicle, categoria_id: e.target.value })} 
            fullWidth 
          >
            {categorias.map((cat) => (
              <MenuItem key={cat.categoria_id} value={cat.categoria_id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminVehicles;