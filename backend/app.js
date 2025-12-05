const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conexión a DB
const { connectDB } = require('./config/db');

// Rutas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const carroRoutes = require('./routes/carroRoutes');
const alquilerRoutes = require('./routes/alquilerRoutes');
const entregaRoutes = require('./routes/entregaRoutes');
const devolucionRoutes = require('./routes/devolucionRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {res.send('Servidor funcionando 🚀');
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes); 
app.use('/api/clientes', clienteRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/carros', carroRoutes);
app.use('/api/alquileres', alquilerRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/devoluciones', devolucionRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/empleados', empleadoRoutes);


// Conectar a la base de datos
connectDB();

// Puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
