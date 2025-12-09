import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import VehicleCard from './VehicleCard';
const FavoriteVehicles = ({ vehicles }) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 6 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'grey.800', mb: 4 }}>
        Los Vehículos favoritos de nuestros clientes
      </Typography>
      
      <Grid container spacing={3}>
        {vehicles.map((vehicle, index) => (
          <Grid item xs={12} md={4} key={index}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default FavoriteVehicles;