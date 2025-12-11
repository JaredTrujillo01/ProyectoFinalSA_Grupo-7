# Proyecto: Sistema de Alquiler de Vehículos — Grupo 7

# Integrantes
Eduardo Jared Trujillo Gamero / 62211761
Johan Josue Peraza Avilez / 62211083
Roberto Gabriel Ortega Altamirano / 62221118
Fabiola Michelle Lainez Hernandez / 62211080

Ingeniería de Software 2 – Proyecto Final

## Cómo ejecutar el proyecto

### Requisitos

- Node.js v18+
- MySQL 8+
- npm

### Variables de entorno — .env.example

Crea un archivo `backend/.env` basado en esto:
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=1234
DB_NAME=alquiler_carros
JWT_SECRET=supersecret

### Ejecutar Backend

```bash
cd backend
npm run dev
```
Backend disponible en: `http://localhost:4000`

### Ejecutar Frontend

```bash
cd frontend
npm start
```

Frontend disponible en: `http://localhost:3000`

## 📊 Diagrama C4

[Acceder al diagrama](https://lucid.app/lucidchart/812e17d0-da58-4db7-928a-b93a3c6b7a15/edit?viewport_loc=-175%2C64%2C2174%2C929%2C0_0&invitationId=inv_17f70063-64d4-4a05-afe2-8134ba8a23ce)

---

## 📋 Trazabilidad de Historias de Usuario

| HU | Descripción | Pantallas / Componentes | Servicios / Utils involucrados | Endpoints Backend |
|----|-------------|--------------------------|--------------------------------|-------------------|
| **HU1** | Registro de clientes | RegistroCliente.jsx | api/auth.js (register) | POST /api/auth/register |
| **HU2** | Inicio de sesión | Login.jsx | api/auth.js (login) | POST /api/auth/login |
| **HU3** | Buscar vehículos | VehicleList.jsx, FilterPanel.jsx, VehicleCard.jsx | carrosService.js (getCarros), validators.js | GET /api/carros |
| **HU4** | Realizar reserva | VehicleList.jsx → ReservationPage.jsx | reservationService.js, paymentCalculator.js | POST /api/alquiler (pendiente) |
| **HU5** | Pago de reserva | PaymentPage.jsx | paymentService.js (Factory), validators.js | POST /api/pago (pendiente)  |
| **HU6** | Cancelar reserva | (pendiente) | — | PUT /api/alquiler/:id/cancelar |
| **HU7** | Entrega de vehículo | (pantalla de empleado, futura) | empleadosService.js | POST /api/entrega |
| **HU8** | Devolución de vehículo | (pantalla de empleado, futura) | empleadosService.js | POST /api/devolucion |
| **HU9** | Gestión de flota | listaVehiculosAdmin.jsx, createCarForm.jsx | carrosService.js | POST /api/carros, PUT /api/carros/:id, DELETE /api/carros/:id |
| **HU10** | Registrar mantenimiento | (pendiente) | carrosService.js | POST /api/mantenimiento |
| **HU11** | Notificaciones automáticas | (manejado por backend) | — | — |

---

## 📚 Patrones de Diseño Aplicados

### Backend

#### 1) Facade / Service Layer (patrón principal)

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

#### 2) Proxy (cross-cutting de seguridad con middlewares)

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

#### 3) Adapter en repositorios (ORM → dominio/controladores)

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

---

### Frontend

#### 1) Factory Method

- **Ubicación:** `src/services/paymentService.js`
- **Problema que resuelve:** el sistema debía manejar distintos métodos de pago (tarjeta y PayPal) sin llenar la interfaz con condicionales ni crear dependencias directas entre la UI y las clases concretas de cada método.
- **Implementación:**
```js
export class PaymentFactory {
  static create(type, data) {
    if (type === "card") return new CardPayment(data);
    if (type === "paypal") return new PayPalPayment(data);
    throw new Error("Método de pago no soportado");
  }
}
```
- **Por qué es Factory Method:** permite que la UI solicite un método de pago sin conocer cómo se construye, delegando la creación de objetos concretos a la factory.
- **Justificación:** si en el futuro se agrega un nuevo método (por ejemplo, pago con criptomonedas), solo se crea una nueva clase sin modificar el código existente.

---

#### 2) Strategy Pattern (Validación de búsquedas)

- **Ubicación:** `src/utils/patterns.js`
- **Problema que resuelve:** las búsquedas en la pantalla principal requieren reglas de validación diferentes según el tipo de búsqueda o el nivel de detalle. Se necesitaba una forma flexible de intercambiar validadores sin modificar la SearchBar.
- **Implementación:**
```js
export class BasicSearchValidation extends SearchValidationStrategy {
  validate(data) {
    const errors = {};
    if (!data.marca && !data.modelo && !data.categoria) {
      errors.general = "Selecciona al menos un criterio";
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}
```
- **Por qué es Strategy:** permite intercambiar validadores fácilmente. La SearchBar no necesita saber qué reglas aplicar; solo recibe una estrategia.
- **Justificación:** diferentes contextos de búsqueda pueden usar diferentes validaciones sin modificar el componente que las consume.

---

#### 3) Observer Pattern (EventBus para comunicación desacoplada)

- **Ubicación:** `src/utils/patterns.js`
- **Problema que resuelve:** la pantalla principal debía reaccionar a eventos de búsqueda sin que los componentes dependieran directamente unos de otros. Evita props innecesarias y acoplamiento fuerte.
- **Implementación:**
```js
export class SearchEventBus {
  subscribe(event, callback) { ... }
  publish(event, data) { ... }
}
```
La SearchBar publica eventos y la pantalla principal los escucha.
- **Por qué es Observer:** permite comunicación entre componentes que no están relacionados directamente mediante suscripción a eventos.
- **Justificación:** reduce acoplamiento y mantiene la organización del frontend, permitiendo que componentes reaccionen a cambios sin conocerse mutuamente.

---

#### 4) Adapter Pattern (Normalización de datos desde API)

- **Ubicación:** `src/utils/patterns.js`
- **Problema que resuelve:** las respuestas de la API no siempre tenían la misma estructura según el endpoint. La UI necesitaba un formato consistente para poder renderizar vehículos sin condicionales adicionales.
- **Implementación:**
```js
export class VehicleAPIAdapter {
  adapt() {
    return {
      id: this.apiResponse.carro_id,
      modelo: this.apiResponse.modelo,
      categoria: this.apiResponse.categoria,
      precio: this.apiResponse.precioDia
    };
  }
}
```
- **Por qué es Adapter:** adapta la interfaz de la API a la interfaz esperada por la UI, actuando como traductor entre dos interfaces incompatibles.
- **Justificación:** si la API cambia, solo se actualiza el adaptador, no toda la interfaz. Mantiene la UI desacoplada de la estructura de datos del backend.

---

#### 5) Singleton (instancia única a través de módulos ES)

- **Ubicación:** `src/services/reservationService.js`, `src/services/paymentCalculator.js`
- **Problema que resuelve:** la reserva debía mantenerse accesible mientras el usuario pasaba de Lista de Vehículos → Reserva → Pago sin necesidad de un global store o context adicional.
- **Implementación:**
```js
// Los servicios funcionan como módulos ES. Al importarlos, todos los componentes comparten la misma instancia.
reservationService.saveTemp(payload);
const r = reservationService.loadTemp();
```
- **Por qué es Singleton:** garantiza una única instancia compartida del servicio en toda la aplicación mediante el sistema de módulos de ES6.
- **Justificación:** evita duplicación de lógica, mantiene una "fuente única de verdad" para datos temporales como la reserva. Es la forma más simple y limpia de compartir estado sin modificar la arquitectura del proyecto.

---



