import React, { useState, useEffect, useContext } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { ClientesContext } from "../../context/clientecontext";

const AdminClients = () => {
  const { clientes, loadClientes, editCliente, removeCliente } = useContext(ClientesContext);
  const [search, setSearch] = useState("");
  const [editingClient, setEditingClient] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadClientes();
  }, [loadClientes]);

  const filteredClients = clientes.filter(client =>
    client.nombre.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (client) => {
    setEditingClient(client);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar cliente?")) {
      try {
        await removeCliente(id);
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editCliente(editingClient.cliente_id, editingClient);
      alert("Cliente actualizado exitosamente");
      setOpen(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Box>
      <TextField label="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Licencia</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.cliente_id}>
                <TableCell>{client.cliente_id}</TableCell>
                <TableCell>{client.licencia}</TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.telefono}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(client)} sx={{ mr: 1 }}>Editar</Button>
                  <Button onClick={() => handleDelete(client.cliente_id)} color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <TextField 
            label="Licencia" 
            value={editingClient?.licencia || ""} 
            onChange={(e) => setEditingClient({ ...editingClient, licencia: e.target.value })} 
            fullWidth 
            sx={{ mt: 2, mb: 2 }} 
          />
          <TextField 
            label="Nombre" 
            value={editingClient?.nombre || ""} 
            onChange={(e) => setEditingClient({ ...editingClient, nombre: e.target.value })} 
            fullWidth 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Teléfono" 
            value={editingClient?.telefono || ""} 
            onChange={(e) => setEditingClient({ ...editingClient, telefono: e.target.value })} 
            fullWidth 
            sx={{ mb: 2 }} 
          />
          <TextField 
            label="Email" 
            value={editingClient?.email || ""} 
            onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })} 
            fullWidth 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminClients;