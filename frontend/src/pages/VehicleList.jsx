import { Grid, Box, Typography, Alert, Container } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleCard from "../components/vehicles/VehicleCard";
import FilterPanel from "../components/vehicles/FilterPanel";
import { reservationService } from "../services/reservationService";
import { CarrosContext } from "../context/carroContext";
import { CategoriasContext } from "../context/categoriaContext";
import Header from "../components/layout/header";

const VehicleList = () => {
  const { carros, loadCarros } = useContext(CarrosContext);
  const { categorias } = useContext(CategoriasContext);
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    branch: "",
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    priceMin: "",
    priceMax: "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || ""
  });

  const [errorFecha, setErrorFecha] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [allVehiculos, setAllVehiculos] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);

  // Cargar todos los vehículos al montar
  useEffect(() => {
    const fetchCarros = async () => {
      try {
        await loadCarros();
      } catch (error) {
        console.error("Error cargando carros:", error);
      }
    };
    fetchCarros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actualizar lista SOLO cuando cambien los carros del contexto (carga inicial o CRUD)
  useEffect(() => {
    if (carros && carros.length > 0) {
      setAllVehiculos(carros);
      // Solo resetear vehiculos si no hay filtros activos
      const hasActiveFilters = filters.category || filters.brand || filters.priceMin || filters.priceMax;
      if (!hasActiveFilters) {
        setVehiculos(carros);
      }
      // Extraer marcas únicas
      const brands = [...new Set(carros.map(c => c.marca).filter(Boolean))];
      setUniqueBrands(brands);
    }
  }, [carros, filters.category, filters.brand, filters.priceMin, filters.priceMax]);

  // Aplicar filtros automáticamente cuando vengan de la búsqueda inicial
  useEffect(() => {
    const hasInitialFilters = searchParams.get("category") || searchParams.get("brand") || 
                              searchParams.get("startDate") || searchParams.get("endDate");
    if (hasInitialFilters && allVehiculos.length > 0) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVehiculos]);

  const handleSearch = () => {
    console.log("Aplicando filtros:", filters);
    
    // Validación de fecha
    if (filters.startDate && filters.endDate) {
      if (filters.endDate < filters.startDate) {
        setErrorFecha("La fecha final no puede ser menor que la inicial.");
        return;
      }
    }
    setErrorFecha("");

    // Filtrar vehículos reales de la BD
    let resultado = allVehiculos.filter((v) => {
      // Sucursal: ignorado (campo no existe en BD)
      
      // Categoría: comparar exactamente con categoria.nombre
      if (filters.category && filters.category !== "") {
        const categoriaVehiculo = v.categoria?.nombre || "";
        if (categoriaVehiculo !== filters.category) {
          return false;
        }
      }

      // Marca: comparar exactamente
      if (filters.brand && filters.brand !== "") {
        if (v.marca !== filters.brand) {
          return false;
        }
      }

      // Precio: usar categoria.costo_por_dia
      const precio = Number(v.categoria?.costo_por_dia || 0);
      if (filters.priceMin && filters.priceMin !== "" && precio < Number(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && filters.priceMax !== "" && precio > Number(filters.priceMax)) {
        return false;
      }

      return true;
    });

    console.log(`Filtrados: ${resultado.length} de ${allVehiculos.length}`);
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
    <Container maxWidth={false} sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: 0 }}>
      <Header />
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
              categorias={categorias}
              brands={uniqueBrands}
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
              <Grid item xs={12} key={v.carro_id}>
                <VehicleCard vehiculo={v} onRentClick={handleRentClick} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
};

export default VehicleList;
