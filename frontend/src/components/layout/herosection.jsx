import React from "react";
import {Box, Typography,} from "@mui/material";

const HeroSection = ({ title, subtitle, backgroundImage }) => {
    return (
        <Box sx={{ bgcolor: 'linear-gradient(to right, #1976d2, #1565c0)', color: 'white', py: 10, px: 2 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Encuentra tu vehículo ideal en minutos
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Miles de vehículos disponibles para ti
        </Typography>
      </Box>
    </Box>
    );
};

export default HeroSection;