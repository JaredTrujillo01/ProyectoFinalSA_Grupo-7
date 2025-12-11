## Patrones validados en el frontend

Cumplimos con 5 patrones aplicados, justificados y verificados en ejecuciones reales de la interfaz de usuario.

### 1) Factory Method

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

### 2) Strategy Pattern (Validación de búsquedas)

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

### 3) Observer Pattern (EventBus para comunicación desacoplada)

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

### 4) Adapter Pattern (Normalización de datos desde API)

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

5. Singleton (instancia única a través de módulos ES)

Archivos:

src/services/reservationService.js

src/services/paymentCalculator.js

Problema

La reserva debía mantenerse accesible mientras el usuario pasaba de Lista de Vehículos → Reserva → Pago sin necesidad de un global store o context adicional.

Implementación

Los servicios funcionan como módulos ES. Al importarlos, todos los componentes comparten la misma instancia.

Ejemplo:

reservationService.saveTemp(payload);
const r = reservationService.loadTemp();

Justificación

Evita duplicación de lógica.
Mantiene una “fuente única de verdad” para datos temporales como la reserva.
Es la forma más simple y limpia de compartir estado sin modificar la arquitectura del proyecto.