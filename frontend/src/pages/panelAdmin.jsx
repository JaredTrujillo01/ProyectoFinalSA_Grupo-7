// pages/AdminPanel.jsx
import React, { useContext, useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Alert, Container, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminClients from "../components/admin/adminclients";
import AdminVehicles from "../components/admin/adminvehicles";
import AdminBranches from "../components/admin/adminbranches";
import AdminCategories from "../components/admin/admincategories";
import AdminEmployees from "../components/admin/adminemployees";

const drawerWidth = 240;

const AdminPanel = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("clients");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.rol !== 'admin') {
    return (
      <Container maxWidth={false} sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: 3 }}>
        <Box sx={{ p: 3, mt: 4 }}>
          <Alert severity="error">Acceso denegado. Solo administradores pueden acceder.</Alert>
        </Box>
      </Container>
    );
  }

  const menuItems = [
    { key: "clients", label: "Lista de Clientes" },
    { key: "vehicles", label: "Registro de Vehículos" },
    { key: "employees", label: "Empleados" },
    { key: "categories", label: "Categorías" },
    { key: "branches", label: "Sucursales" },
  ];

  const renderView = () => {
    switch (currentView) {
      case "clients":
        return <AdminClients />;
      case "vehicles":
        return <AdminVehicles />;
      case "employees":
        return <AdminEmployees />;
      case "categories":
        return <AdminCategories />;
      case "branches":
        return <AdminBranches />;
      default:
        return <AdminClients />;
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        background: 'linear-gradient(to right, #1976d2, #1565c0)', 
        color: 'white' 
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Panel Admin
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          {user?.nombre || user?.email}
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton 
              onClick={() => setCurrentView(item.key)}
              selected={currentView === item.key}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  }
                }
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: 0 }}>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": { 
              width: drawerWidth, 
              boxSizing: "border-box",
              height: '100vh',
              boxShadow: 2
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            ml: { md: 0 },
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mb: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3, 
              fontWeight: 600,
              color: 'grey.800'
            }}
          >
            {menuItems.find(item => item.key === currentView)?.label || "Panel de Control"}
          </Typography>
          <Box sx={{ 
            bgcolor: 'white', 
            borderRadius: 2, 
            boxShadow: 1, 
            p: 3 
          }}>
            {renderView()}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPanel;