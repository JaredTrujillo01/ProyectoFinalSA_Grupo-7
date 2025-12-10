
import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Box } from "@mui/material";
import PrimaryButton from "../buttons/primarybutton";
import { getCarImage } from "../../utils/carimages";

const VehicleCard = ({ vehiculo = {}, onRentClick, compact = false, showButton = true }) => {
  const imageSrc = getCarImage(vehiculo.marca, vehiculo.modelo);
  const categoriaNombre = vehiculo.categoria?.nombre || "Sin categoría";  // Nombre de la categoría
  const precioCategoria = vehiculo.categoria?.costo_por_dia || vehiculo.precioDia || 0;  // Precio de la categoría

  return (
    <Card sx={{ boxShadow: 6, borderRadius: 2 }}>
      <CardContent sx={{ p: compact ? 1 : 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
          <Box sx={{ width: { xs: '100%', sm: '25%' } }}>
            <CardMedia
              component="img"
              image={imageSrc}
              alt={`${vehiculo.marca || ''} ${vehiculo.modelo || ''}`}
              sx={{ height: 100, borderRadius: 1, objectFit: "cover", width: '100%' }}
            />
          </Box>

          <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {vehiculo.marca} {vehiculo.modelo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categoriaNombre} · {vehiculo.placa || "—"}
              {/* Muestra nombre de categoría */}
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
          </Box>

          <Box sx={{ width: { xs: '100%', sm: '25%' }, textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ${Number(precioCategoria).toFixed(2)}
              {/* Precio de la categoría */}
            </Typography>
            {showButton && (
              <Box mt={2}>
                <PrimaryButton onClick={() => onRentClick?.(vehiculo)}>
                  Rentar
                </PrimaryButton>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;