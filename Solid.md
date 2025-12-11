## Principios SOLID

### ✔ SRP – Single Responsibility
- `authService.js` solo maneja autenticación.
- `carroService.js` solo maneja lógica de vehículos.
- Cada componente tiene una responsabilidad única y bien definida.

### ✔ OCP – Open/Closed
- Se pueden agregar nuevos roles sin modificar login.
- PaymentFactory permite agregar nuevos métodos de pago sin cambios.
- Nuevas estrategias de validación se agregan extendiendo clases.

### ✔ LSP – Liskov Substitution
- Repositorios exponen interfaz uniforme (`findAll`, `create`).
- Estrategias de validación son intercambiables.

### ✔ ISP – Interface Segregation
- Repositorios separados por dominio: `clienteRepository`, `carroRepository`, `empleadoRepository`.
- Cada interfaz es específica y no obliga métodos innecesarios.

### ✔ DIP – Dependency Inversion
- Controladores dependen de servicios, no de DB.
- Servicios dependen de repositorios, no del ORM.
- UI depende de adaptadores/factories, no de implementaciones concretas.