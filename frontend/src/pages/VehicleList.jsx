import { Grid, Box, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import VehicleCard from "../components/vehicles/VehicleCard";
import FilterPanel from "../components/vehicles/FilterPanel";
import { reservationService } from "../services/reservationService";

const VehicleList = () => {
  const [filters, setFilters] = useState({
    branch: "",
    category: "",
    brand: "",
    priceMin: "",
    priceMax: "",
    startDate: "",
    endDate: ""
  });

  const [errorFecha, setErrorFecha] = useState("");
  const [vehiculos, setVehiculos] = useState(mockVehiculos);

  const handleSearch = () => {
    // Validación de fecha
    if (filters.startDate && filters.endDate) {
      if (filters.endDate < filters.startDate) {
        setErrorFecha("La fecha final no puede ser menor que la inicial.");
        return;
      }
    }
    setErrorFecha("");

    // API

    let resultado = mockVehiculos.filter((v) => {
      if (filters.branch && v.sucursal !== filters.branch) return false;
      if (filters.category && v.categoria !== filters.category) return false;
      if (filters.brand && v.marca !== filters.brand) return false;
      if (filters.priceMin && v.precioDia < Number(filters.priceMin)) return false;
      if (filters.priceMax && v.precioDia > Number(filters.priceMax)) return false;
      return true;
    });

    setVehiculos(resultado);
  };

const handleRentClick = (vehiculo) => {
  const payload = reservationService.makeReservationPayload({
    vehicle: vehiculo,
    startDate: filters.startDate || "",
    endDate: filters.endDate || "",
    branch: filters.branch || ""
  });

  reservationService.saveTemp(payload);

  window.location.href = "/reserva";
};

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Lista de Vehículos
      </Typography>

      <Grid container spacing={3}>
        {/* Panel filtros */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, boxShadow: 4, borderRadius: 2 }}>
            <FilterPanel
              filters={filters}
              onChangeFilters={setFilters}
              onSearch={handleSearch}
            />
          </Box>

          {errorFecha && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorFecha}
            </Alert>
          )}
        </Grid>

        {/* Lista */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {vehiculos.length === 0 && (
              <Grid item xs={12}>
                <Alert severity="info">No se encontraron vehículos.</Alert>
              </Grid>
            )}

            {vehiculos.map((v) => (
              <Grid item xs={12} key={v.id}>
                <VehicleCard vehiculo={v} onRentClick={handleRentClick} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

// Mockup de la lista de vehiculos para que funcione sin la API
const mockVehiculos = [
  {
    id: 1,
    imagen: "https://via.placeholder.com/300",
    marca: "Toyota",
    modelo: "Corolla",
    categoria: "Sedan",
    placa: "ABC-123",
    anio: 2021,
    estado: "Disponible",
    precioDia: 45,
    sucursal: "Tegucigalpa"
  },
  {
    id: 2,
    imagen: "https://via.placeholder.com/300",
    marca: "Honda",
    modelo: "CR-V",
    categoria: "SUV",
    placa: "DEF-456",
    anio: 2020,
    estado: "Mantenimiento",
    precioDia: 70,
    sucursal: "San Pedro"
  }
];

export default VehicleList;
