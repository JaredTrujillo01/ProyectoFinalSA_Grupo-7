import React, { useState, useEffect, useContext } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from "@mui/material";
import { EmpleadosContext } from "../../context/empleadoContext";
import { SucursalesContext } from "../../context/sucursalcontext";
import AddEmployeeForm from "../employees/addemployee";

const AdminEmployees = () => {
  const { empleados, loadEmpleados, editEmpleado, removeEmpleado } = useContext(EmpleadosContext);
  const { sucursales } = useContext(SucursalesContext);
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    loadEmpleados();
  }, [loadEmpleados]);

  useEffect(() => {
    console.log('Empleados cargados:', empleados);
  }, [empleados]);

  const filteredEmployees = empleados.filter(emp =>
    emp.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    emp.cargo?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar empleado?")) {
      try {
        await removeEmpleado(id);
        alert("Empleado eliminado exitosamente");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editEmpleado(editingEmployee.empleado_id, editingEmployee);
      alert("Empleado actualizado exitosamente");
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
          Registrar Empleado
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Sucursal</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((emp) => {
              const sucursalName = sucursales.find((s) => s.sucuersal_id === emp.sucursal_id)?.nombre || "N/A";
              return (
                <TableRow key={emp.empleado_id}>
                  <TableCell>{emp.empleado_id}</TableCell>
                  <TableCell>{emp.nombre}</TableCell>
                  <TableCell>{emp.cargo}</TableCell>
                  <TableCell>{sucursalName}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(emp)} sx={{ mr: 1 }}>Editar</Button>
                    <Button onClick={() => handleDelete(emp.empleado_id)} color="error">Eliminar</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para crear */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Registro de Empleado</DialogTitle>
        <DialogContent>
          <AddEmployeeForm onClose={() => setOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para editar */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Empleado</DialogTitle>
        <DialogContent>
          <TextField 
            label="Nombre" 
            value={editingEmployee?.nombre || ""} 
            onChange={(e) => setEditingEmployee({ ...editingEmployee, nombre: e.target.value })} 
            fullWidth 
            sx={{ mt: 2, mb: 2 }} 
          />
          <TextField 
            select
            label="Cargo"
            value={editingEmployee?.cargo || ""} 
            onChange={(e) => setEditingEmployee({ ...editingEmployee, cargo: e.target.value })} 
            fullWidth 
            sx={{ mb: 2 }} 
            SelectProps={{
              native: false,
            }}
          >
            <MenuItem value="">Seleccionar Cargo</MenuItem>
            <MenuItem value="gerente">Gerente</MenuItem>
            <MenuItem value="vendedor">Vendedor</MenuItem>
            <MenuItem value="administrativo">Administrativo</MenuItem>
          </TextField>
          <TextField 
            select
            label="Sucursal" 
            value={editingEmployee?.sucursal_id || ""} 
            onChange={(e) => setEditingEmployee({ ...editingEmployee, sucursal_id: e.target.value })} 
            fullWidth
            SelectProps={{
              native: false,
            }}
          >
            <MenuItem value="">Sin asignar</MenuItem>
            {sucursales.map((suc) => (
              <MenuItem key={suc.sucuersal_id} value={suc.sucuersal_id}>
                {suc.nombre}
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

export default AdminEmployees;
