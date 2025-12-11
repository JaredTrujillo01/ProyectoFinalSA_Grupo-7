import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import { SucursalesContext } from "../../context/sucursalcontext";

const AdminBranches = () => {
  const { sucursales, loadSucursales, addSucursal, editSucursal, removeSucursal } = useContext(SucursalesContext);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", direccion: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSucursales();
  }, [loadSucursales]);

  const filteredSucursales = sucursales.filter(suc =>
    suc.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    try {
      await addSucursal(formData);
      alert("Sucursal registrada exitosamente");
      setFormData({ nombre: "", direccion: "" });
      setOpen(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = (sucursal) => {
    setEditingSucursal(sucursal);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar sucursal?")) {
      try {
        await removeSucursal(id);
        alert("Sucursal eliminada exitosamente");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editSucursal(editingSucursal.sucuersal_id, editingSucursal);
      alert("Sucursal actualizada exitosamente");
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
          Registrar Sucursal
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSucursales.map((suc) => (
              <TableRow key={suc.sucuersal_id}>
                <TableCell>{suc.sucuersal_id}</TableCell>
                <TableCell>{suc.nombre}</TableCell>
                <TableCell>{suc.direccion || "N/A"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(suc)} sx={{ mr: 1 }}>Editar</Button>
                  <Button onClick={() => handleDelete(suc.sucuersal_id)} color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para crear */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Registro de Sucursal</DialogTitle>
        <DialogContent>
          <TextField 
            label="Nombre" 
            value={formData.nombre} 
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
            fullWidth 
            sx={{ mt: 2, mb: 2 }} 
          />
          <TextField 
            label="Dirección" 
            value={formData.direccion} 
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} 
            fullWidth 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para editar */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Sucursal</DialogTitle>
        <DialogContent>
          <TextField 
            label="Nombre" 
            value={editingSucursal?.nombre || ""} 
            onChange={(e) => setEditingSucursal({ ...editingSucursal, nombre: e.target.value })} 
            fullWidth 
            sx={{ mt: 2, mb: 2 }} 
          />
          <TextField 
            label="Dirección" 
            value={editingSucursal?.direccion || ""} 
            onChange={(e) => setEditingSucursal({ ...editingSucursal, direccion: e.target.value })} 
            fullWidth 
          />
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

export default AdminBranches;