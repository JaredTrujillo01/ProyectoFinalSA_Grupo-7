// pages/VehicleList.jsx
import { Box, Typography, Alert } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import VehicleCard from "../components/vehicles/VehicleCard";
import FilterPanel from "../components/vehicles/FilterPanel";
import { CarrosContext } from "../context/carroContext";

const VehicleList = () => {
  const { carros, loadCarros } = useContext(CarrosContext);
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
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        await loadCarros();
      } catch (error) {
        console.error("Error cargando carros:", error);
      }
    };
    fetchCarros();
  }, [loadCarros]);

  useEffect(() => {
    setVehiculos(carros);
  }, [carros]);

  const handleSearch = async () => {
    if (filters.startDate && filters.endDate) {
      if (filters.endDate < filters.startDate) {
        setErrorFecha("La fecha final no puede ser menor que la inicial.");
        return;
      }
    }
    setErrorFecha("");
    try {
      await loadCarros({
        sucursal: filters.branch,
        categoria: filters.category,
        marca: filters.brand,
        precioMin: filters.priceMin,
        precioMax: filters.priceMax,
      });
    } catch (error) {
      console.error("Error filtrando carros:", error);
    }
  };

  const handleRentClick = (vehiculo) => {
    console.log("Rentar:", vehiculo);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Lista de Vehículos
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ width: { xs: '100%', md: '28%' } }}>
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
        </Box>

        <Box sx={{ width: { xs: '100%', md: '72%' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {vehiculos.length === 0 && (
              <Box>
                <Alert severity="info">No se encontraron vehículos.</Alert>
              </Box>
            )}

            {vehiculos.map((v) => (
              <Box key={v.carro_id}>
                <VehicleCard vehiculo={v} onRentClick={handleRentClick} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleList;