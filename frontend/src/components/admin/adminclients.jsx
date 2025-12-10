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
      await editCliente(editingClient.id, editingClient);
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
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.estado}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(client)}>Editar</Button>
                  <Button onClick={() => handleDelete(client.id)} color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" value={editingClient?.nombre || ""} onChange={(e) => setEditingClient({ ...editingClient, nombre: e.target.value })} fullWidth sx={{ mb: 2 }} />
          <TextField label="Email" value={editingClient?.email || ""} onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminClients;