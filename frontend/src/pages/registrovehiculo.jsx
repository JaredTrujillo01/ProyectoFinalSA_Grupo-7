// pages/AddVehiclePage.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import AddVehicleForm from "../components/vehicles/addvehicle";

const AddVehiclePage = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Registrar Nuevo Vehículo
      </Typography>
      <AddVehicleForm />
    </Box>
  );
};

export default AddVehiclePage;
