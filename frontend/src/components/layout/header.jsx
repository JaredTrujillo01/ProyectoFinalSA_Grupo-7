import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography,IconButton,Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({onMenuClick, onProfileClick}) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAuthClick = () => {
      if (user) {
        logout();
        navigate('/');
      } else {
        navigate('/login');
      }
    };

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
          <Button color="inherit" href="/home">Inicio</Button>
          <Button color="inherit" href="/lista-vehiculos">Lista de Vehículos</Button>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={onProfileClick}>
            <PersonIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={handleAuthClick}>
            {user ? 'Cerrar Sesión' : 'Login'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;