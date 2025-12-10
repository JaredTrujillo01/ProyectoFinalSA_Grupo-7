import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Card, CardMedia, MenuItem } from "@mui/material";
import { CarrosContext } from "../../context/carroContext";
import { CategoriasContext } from "../../context/categoriaContext";
import { availableImages } from "../../utils/carimages";
import { VehicleValidationStrategy } from "../../utils/patterns";


const AddVehicleForm = () => {
  const { addCarro } = useContext(CarrosContext);
  const { categorias } = useContext(CategoriasContext);
  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    modelo: "",
    estado: "disponible",
    categoria_id: "",
    anio: "",
    precioDia: "",
    imagen: ""
  });
  const [previewImage, setPreviewImage] = useState("/images/placeholder.jpg");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.categoria_id) {
      const selectedCategoria = categorias.find(c => c.categoria_id === Number(formData.categoria_id));
      if (selectedCategoria) {
        setFormData(prev => ({ ...prev, precioDia: selectedCategoria.costo_por_dia }));
      }
    } else {
      setFormData(prev => ({ ...prev, precioDia: "" }));
    }
  }, [formData.categoria_id, categorias]);

  useEffect(() => {
    const newImage = formData.imagen || "/images/placeholder.jpg";
    setPreviewImage(newImage);
    console.log("Preview image updated to:", newImage);  // Debug: Verifica en consola
  }, [formData.imagen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = new VehicleValidationStrategy().validate(formData);
    setErrors(validation.errors);
    if (validation.isValid) {
      const { imagen, ...dataToSend } = formData;
      try {
        await addCarro(dataToSend);
        alert("Vehículo registrado exitosamente");
        setFormData({
          placa: "",
          marca: "",
          modelo: "",
          estado: "disponible",
          categoria_id: "",
          anio: "",
          precioDia: "",
          imagen: ""
        });
        setPreviewImage("/images/placeholder.jpg");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardMedia
          component="img"
          height="150"  // Reducido para probar (cambia a 200 si quieres)
          image={previewImage}
          alt="Preview del vehículo"
          onError={() => console.log("Error loading image:", previewImage)}  // Debug si falla la carga
          sx={{ objectFit: "cover" }}  // Asegura que se ajuste
        />
      </Card>
      <form onSubmit={handleSubmit}>
        <TextField label="Placa" name="placa" value={formData.placa} onChange={handleChange} fullWidth required error={!!errors.placa} helperText={errors.placa} sx={{ mb: 2 }} />
        <TextField label="Marca" name="marca" value={formData.marca} onChange={handleChange} fullWidth required error={!!errors.marca} helperText={errors.marca} sx={{ mb: 2 }} />
        <TextField label="Modelo" name="modelo" value={formData.modelo} onChange={handleChange} fullWidth required error={!!errors.modelo} helperText={errors.modelo} sx={{ mb: 2 }} />
        <TextField select label="Imagen" name="imagen" value={formData.imagen} onChange={handleChange} fullWidth sx={{ mb: 2 }}>
          <MenuItem value="">Seleccionar Imagen</MenuItem>
          {availableImages.map((img) => (
            <MenuItem key={img.value} value={img.value}>
              {img.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField select label="Categoría" name="categoria_id" value={formData.categoria_id} onChange={handleChange} fullWidth required sx={{ mb: 2 }}>
          <MenuItem value="">Seleccionar Categoría</MenuItem>
          {categorias.map((cat) => (
            <MenuItem key={cat.categoria_id} value={cat.categoria_id}>
              {cat.nombre} - ${cat.costo_por_dia}/día
            </MenuItem>
          ))}
        </TextField>
        <TextField select label="Estado" name="estado" value={formData.estado} onChange={handleChange} fullWidth sx={{ mb: 2 }}>
            <MenuItem value="disponible">Disponible</MenuItem>
            <MenuItem value="alquilado">Alquilado</MenuItem>
            <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
        </TextField>
        <TextField label="Año" name="anio" value={formData.anio} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="Precio por Día" name="precioDia" value={formData.precioDia} onChange={handleChange} fullWidth disabled sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Registrar Vehículo</Button>
      </form>
    </Box>
  );
};

export default AddVehicleForm;