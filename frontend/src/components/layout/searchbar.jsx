import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchData, onSearchChange, onSearch, validationStrategy, categorias = [], brands = [], sucursales = [] }) => {
  const [errors, setErrors] = useState({});

  const handleSearch = () => {
    const validation = validationStrategy.validate(searchData);
    setErrors(validation.errors);
    
    if (validation.isValid) {
      onSearch(searchData);
    }
  };

  return (
    <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 3, p: 3, maxWidth: 1200, mx: 'auto', mt: -4, position: 'relative', zIndex: 10 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }, gap: 2 }}>
        <TextField
          select
          label="Marca"
          value={searchData.marca}
          onChange={(e) => onSearchChange('marca', e.target.value)}
          fullWidth
        >
          <MenuItem value="">Marca</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Categoría"
          value={searchData.categoria}
          onChange={(e) => onSearchChange('categoria', e.target.value)}
          fullWidth
        >
          <MenuItem value="">Categoría</MenuItem>
          {categorias.map((cat) => (
            <MenuItem key={cat.categoria_id} value={cat.nombre}>
              {cat.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sucursal"
          value={searchData.sucursal}
          onChange={(e) => onSearchChange('sucursal', e.target.value)}
          fullWidth
        >
          <MenuItem value="">Sucursal</MenuItem>
          {sucursales.map((suc) => (
            <MenuItem key={suc.sucuersal_id} value={suc.nombre}>
              {suc.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          label="Entrega"
          value={searchData.entrega}
          onChange={(e) => onSearchChange('entrega', e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="date"
          label="Devolución"
          value={searchData.devolucion}
          onChange={(e) => onSearchChange('devolucion', e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      
      {errors.general && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errors.general}
        </Typography>
      )}
      
      <Button
        onClick={handleSearch}
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: { xs: '100%', md: 'auto' } }}
        startIcon={<SearchIcon />}
      >
        Buscar Vehículo
      </Button>
    </Box>
  );
};

export default SearchBar;