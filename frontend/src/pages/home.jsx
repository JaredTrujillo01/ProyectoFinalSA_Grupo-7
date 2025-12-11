import React, { useState, useContext, useEffect } from 'react';
import { Container } from '@mui/material'; // Opcional para envolver
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/header';
import SearchBar from '../components/layout/searchbar';
import HeroSection from '../components/layout/herosection';
import FavoriteVehicles from '../components/layout/favoritevehicle';
import { BasicSearchValidation, searchEventBus } from '../utils/patterns';
import { CarrosContext } from '../context/carroContext';
import { CategoriasContext } from '../context/categoriaContext';
import { SucursalesContext } from '../context/sucursalcontext';

const DriveNowApp = () => {
  const navigate = useNavigate();
  
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
  
  // Obtener carros, categorias y sucursales desde el contexto
  const { carros, loadCarros } = useContext(CarrosContext);
  const { categorias } = useContext(CategoriasContext);
  const { sucursales } = useContext(SucursalesContext);
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);

  // Cargar carros al montar el componente
  useEffect(() => {
    const fetchCarros = async () => {
      try {
        await loadCarros();
      } catch (error) {
        console.error('Error cargando carros favoritos:', error);
      }
    };
    fetchCarros();
  }, [loadCarros]);

  // Seleccionar solo los primeros 3 carros disponibles y extraer marcas
  useEffect(() => {
    if (carros && carros.length > 0) {
      const disponibles = carros.filter(c => c.estado === 'disponible').slice(0, 3);
      setFavoriteVehicles(disponibles);
      // Extraer marcas únicas
      const brands = [...new Set(carros.map(c => c.marca).filter(Boolean))];
      setUniqueBrands(brands);
    }
  }, [carros]);

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
    // Navegar a VehicleList con los parámetros de búsqueda
    const params = new URLSearchParams();
    if (data.marca) params.set('brand', data.marca);
    if (data.categoria) params.set('category', data.categoria);
    if (data.entrega) params.set('startDate', data.entrega);
    if (data.devolucion) params.set('endDate', data.devolucion);
    
    navigate(`/lista-vehiculos?${params.toString()}`);
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
        categorias={categorias}
        brands={uniqueBrands}
        sucursales={sucursales}
      />
      <FavoriteVehicles vehicles={favoriteVehicles} />
    </Container>
  );
};

export default DriveNowApp;