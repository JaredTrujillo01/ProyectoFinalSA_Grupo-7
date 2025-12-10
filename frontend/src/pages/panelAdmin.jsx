// pages/AdminPanel.jsx
import React, { useContext, useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import AdminClients from "../components/admin/adminclients";
import AdminVehicles from "../components/admin/adminvehicles";
import AdminBranches from "../components/admin/adminbranches";
import VehicleList from "./VehicleList";

const drawerWidth = 240;

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [currentView, setCurrentView] = useState("clients");

  if (!user || user.rol !== 'admin') {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Acceso denegado. Solo administradores pueden acceder.</Alert>
      </Box>
    );
  }

  const menuItems = [
    { key: "clients", label: "Lista de Clientes" },
    { key: "vehicles", label: "Registro de Vehículos" },
    { key: "branches", label: "Sucursales" },
    { key: "vehicleList", label: "Lista de Vehículos" },
  ];

  const renderView = () => {
    switch (currentView) {
      case "clients":
        return <AdminClients />;
      case "vehicles":
        return <AdminVehicles />;
      case "branches":
        return <AdminBranches />;
      case "vehicleList":
        return <VehicleList />;
      default:
        return <AdminClients />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Typography variant="h6" sx={{ p: 2, fontWeight: 600 }}>
          Panel Admin
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton onClick={() => setCurrentView(item.key)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton href="/registro-empleado">
              <ListItemText primary="Registro de Empleado" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          {menuItems.find(item => item.key === currentView)?.label || "Panel de Control"}
        </Typography>
        {renderView()}
      </Box>
    </Box>
  );
};

export default AdminPanel;