import React, { useState } from 'react';
import { Container } from '@mui/material'; // Opcional para envolver
import Header from '../components/layout/header';
import SearchBar from '../components/layout/searchbar';
import HeroSection from '../components/layout/herosection';
import FavoriteVehicles from '../components/layout/favoritevehicle';
import { BasicSearchValidation, searchEventBus } from '../utils/patterns';

const DriveNowApp = () => {
  // Estado (Model)
  const [searchData, setSearchData] = useState({
    marca: '',
    modelo: '',
    categoria: '',
    sucursal: '',
    entrega: '',
    devolucion: ''
  });

  const [validationStrategy] = useState(new BasicSearchValidation());

  // Datos de ejemplo - En producción vendrían de una API
  const [favoriteVehicles] = useState([
    { id: 1, marca: 'Toyota', modelo: 'Corolla', categoria: 'Sedán', precio: 45 },
    { id: 2, marca: 'Honda', modelo: 'CR-V', categoria: 'SUV', precio: 65 },
    { id: 3, marca: 'Ford', modelo: 'Mustang', categoria: 'Deportivo', precio: 120 }
  ]);

  // Suscripción al EventBus
  React.useEffect(() => {
    const unsubscribe = searchEventBus.subscribe('searchSubmitted', (data) => {
      console.log('Búsqueda realizada:', data);
      // Aquí iría la lógica para realizar la búsqueda
    });

    return () => unsubscribe();
  }, []);

  const handleSearchChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (data) => {
    console.log('Buscando vehículos con:', data);
    // Aquí iría la llamada a la API usando el Adapter
    // const adapter = new VehicleAPIAdapter(apiResponse);
    // const vehicles = adapter.adapt();
  };

  const handleMenuClick = () => {
    console.log('Menú clickeado');
  };

  const handleProfileClick = () => {
    console.log('Perfil clickeado');
  };

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header onMenuClick={handleMenuClick} onProfileClick={handleProfileClick} />
      <HeroSection />
      <SearchBar 
        searchData={searchData}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
        validationStrategy={validationStrategy}
      />
      <FavoriteVehicles vehicles={favoriteVehicles} />
    </Container>
  );
};

export default DriveNowApp;