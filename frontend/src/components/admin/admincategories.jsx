import React, { useState, useEffect, useContext } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { CategoriasContext } from "../../context/categoriaContext";

const AdminCategories = () => {
  const { categorias, loadCategorias, addCategoria, editCategoria, removeCategoria } = useContext(CategoriasContext);
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  const filteredCategories = categorias.filter(cat =>
    cat.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsCreating(false);
    setOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory({ nombre: "", costo_por_dia: "" });
    setIsCreating(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar categoría? Esto puede afectar vehículos asociados.")) {
      try {
        await removeCategoria(id);
        alert("Categoría eliminada exitosamente");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        await addCategoria(editingCategory);
        alert("Categoría creada exitosamente");
      } else {
        await editCategoria(editingCategory.categoria_id, editingCategory);
        alert("Categoría actualizada exitosamente");
      }
      setOpen(false);
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
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Nueva Categoría
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Costo por Día ($)</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((cat) => (
              <TableRow key={cat.categoria_id}>
                <TableCell>{cat.categoria_id}</TableCell>
                <TableCell>{cat.nombre}</TableCell>
                <TableCell>${Number(cat.costo_por_dia).toFixed(2)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(cat)} sx={{ mr: 1 }}>Editar</Button>
                  <Button onClick={() => handleDelete(cat.categoria_id)} color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isCreating ? "Crear Categoría" : "Editar Categoría"}</DialogTitle>
        <DialogContent>
          <TextField 
            label="Nombre" 
            value={editingCategory?.nombre || ""} 
            onChange={(e) => setEditingCategory({ ...editingCategory, nombre: e.target.value })} 
            fullWidth 
            sx={{ mt: 2, mb: 2 }} 
          />
          <TextField 
            label="Costo por Día ($)" 
            type="number"
            value={editingCategory?.costo_por_dia || ""} 
            onChange={(e) => setEditingCategory({ ...editingCategory, costo_por_dia: e.target.value })} 
            fullWidth 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isCreating ? "Crear" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCategories;
