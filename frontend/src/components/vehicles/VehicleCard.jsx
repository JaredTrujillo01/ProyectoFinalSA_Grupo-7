import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Chip, Box } from "@mui/material";
import PrimaryButton from "../buttons/primarybutton";

const VehicleCard = ({ vehiculo, onRentClick, compact = false, showButton = true }) => {
  
  return (
    <Card sx={{ boxShadow: 6, borderRadius: 2 }}>
      <CardContent sx={{ p: compact ? 1 : 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Imagen - 20% aprox */}
          <Grid item xs={12} sm={3} md={3}>
            <CardMedia
              component="img"
              image={vehiculo.imagen || "https://via.placeholder.com/300x160"}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              sx={{ height: 100, borderRadius: 1, objectFit: "cover" }}
            />
          </Grid>

          {/* Descripción - 60% aprox */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {vehiculo.marca} {vehiculo.modelo}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {vehiculo.categoria || "Categoria no especificada"} · {vehiculo.placa || "—"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Año: {vehiculo.anio || "—"}
            </Typography>

            <Box mt={1}>
              <Chip
                label={vehiculo.estado || "Desconocido"}
                color={vehiculo.estado === "Disponible" ? "success" : "warning"}
                size="small"
              />
            </Box>
          </Grid>

          {/* Precio + botón - 20% aprox */}
          <Grid item xs={12} sm={3} md={3} textAlign="right">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ${Number(vehiculo.precioDia || 0).toFixed(2)}
            </Typography>

            {showButton && (
              <Box mt={2}>
                <PrimaryButton onClick={() => onRentClick?.(vehiculo)}>
                  Rentar
                </PrimaryButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
