import React from 'react';
import { AppBar, Toolbar, Typography,IconButton,Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

const Header = ({onMenuClick, onProfileClick}) => {
    return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            DriveNow
          </Typography>
        </Box>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button color="inherit" href="#inicio">Inicio</Button>
          <Button color="inherit" href="#reservas">Mis Reservas</Button>
          <Button color="inherit" href="#pagos">Pagos</Button>
          <Button color="inherit" href="#perfil">Perfil</Button>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={onProfileClick}>
            <PersonIcon />
          </IconButton>
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;