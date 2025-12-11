## Patrones validados en el backend

Cumplimos con 2 patrones aplicados, justificados y verificados en ejecuciones reales de rutas protegidas y públicas.

### 1) Facade / Service Layer (patrón principal)

- **Ubicación:** `services/authServices.js`, `services/carroServices.js`, `services/clienteServices.js`, `services/empleadoServices.js`.
- **Problema que resuelve:** los controladores quedan delgados; la orquestación de reglas, validaciones y transacciones vive en servicios.
- **Ejemplo real (registro con transacción):**
```js
// services/authServices.js
return await sequelize.transaction(async (t) => {
  const usuario = await createUsuario({ nombre: data.nombre, email: data.email, password: passwordHashed, rol: data.rol }, { transaction: t });
  if (data.rol === 'cliente') {
    await createCliente({ nombre: data.nombre, email: data.email, licencia: data.licencia, telefono: data.telefono, usuario_id: usuario.usuario_id }, { transaction: t });
  }
  return usuario;
});
```
- **Por qué es Facade:** el controlador (`controllers/authController.js`) invoca `registerUsuario` y recibe un resultado único sin conocer hashing, validaciones por rol ni las inserciones múltiples.
- **Prueba/evidencia:** flujo `POST /auth/register` y `POST /auth/login` funciona end-to-end; el controlador solo delega y la lógica queda encapsulada en el servicio.

---

### 2) Proxy (cross-cutting de seguridad con middlewares)

- **Ubicación:** `middlewares/authMiddleware.js` (valida JWT) y `middlewares/roleMiddleware.js` (autorización por rol).
- **Problema que resuelve:** seguridad transversal sin duplicar código en cada ruta.
- **Ejemplo real en ruta protegida:**
```js
// routes/alquilerRoutes.js
router.post('/', authMiddleware, roleMiddleware(['cliente']), crearAlquiler);
```
El proxy autentica y autoriza antes de delegar al controlador real; si falla, corta la ejecución.
- **Por qué es Proxy:** intercepta la petición, aplica la verificación y decide si pasa al objeto de destino (controlador) o devuelve 401/403.
- **Prueba/evidencia:** llamadas sin token a `POST /alquileres` retornan 401; con token de rol `cliente` permiten crear la reserva.

---

### 3) Adapter en repositorios (ORM → dominio/controladores)

- **Ubicación:** `repositories/carroRepository.js` (similar en otros repos).
- **Problema que resuelve:** desacoplar controladores/servicios de Sequelize y del naming SQL.
- **Ejemplo real:**
```js
// repositories/carroRepository.js
const findAllCarros = async (filter = {}) =>
  Carro.findAll({ where: filter, include: [{ model: Categoria, as: 'categoria' }] });
```
El repositorio encapsula relaciones y shape de datos; la capa superior consume un método expresivo (`findAllCarros`) sin conocer `belongsTo`, `include` ni campos de tabla.
- **Por qué es Adapter:** adapta al consumidor a través de una interfaz estable (`findAllCarros`, `createCarro`, etc.) y oculta detalles del proveedor (Sequelize/MySQL).
- **Prueba/evidencia:** `services/carroServices.js` invoca `findAllCarros` y `createCarro` en flujos `GET /carros` y `POST /carros` sin tocar código de ORM.