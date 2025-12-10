import React from 'react';
import { Box, Typography } from '@mui/material';
import VehicleCard from './../vehicles/VehicleCard';
const FavoriteVehicles = ({ vehicles }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 6 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'grey.800', mb: 4 }}>
        Los Vehículos favoritos de nuestros clientes
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {vehicles.map((vehicle, index) => (
          <Box key={index}>
            <VehicleCard vehiculo={vehicle} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default FavoriteVehicles;