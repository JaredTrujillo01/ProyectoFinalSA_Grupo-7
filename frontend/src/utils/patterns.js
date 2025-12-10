// Clase base Strategy
export class SearchValidationStrategy {
  validate(data) {
    throw new Error("Method not implemented");
  }
}

// ----- Estrategia básica -----
export class BasicSearchValidation extends SearchValidationStrategy {
  validate(data) {
    const errors = {};
    if (!data.marca && !data.modelo && !data.categoria) {
      errors.general = "Selecciona al menos un criterio de búsqueda";
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

// ----- Estrategia avanzada -----
export class AdvancedSearchValidation extends SearchValidationStrategy {
  validate(data) {
    const errors = {};

    if (!data.marca) errors.marca = "Marca requerida";
    if (!data.entrega) errors.entrega = "Fecha de entrega requerida";
    if (!data.devolucion) errors.devolucion = "Fecha de devolución requerida";

    if (data.entrega && data.devolucion) {
      const entregaDate = new Date(data.entrega);
      const devolucionDate = new Date(data.devolucion);

      if (devolucionDate <= entregaDate) {
        errors.devolucion = "La fecha de devolución debe ser posterior a la entrega";
      }
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

// ----- Estrategia para vehículos (LO QUE TE FALTABA) -----
export class VehicleValidationStrategy extends SearchValidationStrategy {
  validate(data) {
    const errors = {};

    if (!data.placa) errors.placa = "La placa es obligatoria";
    if (!data.marca) errors.marca = "La marca es obligatoria";
    if (!data.modelo) errors.modelo = "El modelo es obligatorio";
    if (!data.anio) errors.anio = "El año es obligatorio";
    if (!data.categoria_id) errors.categoria_id = "Selecciona una categoría";

    return { isValid: Object.keys(errors).length === 0, errors };
  }
}

// 2. OBSERVER PATTERN - EventBus para notificaciones

export class SearchEventBus {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => {
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
    };
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data));
    }
  }
}

export const searchEventBus = new SearchEventBus();

// 3. ADAPTER PATTERN - Adaptar vehículos desde API
export class VehicleAPIAdapter {
  constructor(apiResponse) {
    this.apiResponse = apiResponse;
  }

  adapt() {
    return {
      id: this.apiResponse.carro_id || this.apiResponse.id,
      marca: this.apiResponse.marca || this.apiResponse.brand,
      modelo: this.apiResponse.modelo || this.apiResponse.model,
      anio: this.apiResponse.anio || this.apiResponse.year,
      categoria: this.apiResponse.categoria || this.apiResponse.category,
      precio: this.apiResponse.precioDia || this.apiResponse.daily_price,
      imagen: this.apiResponse.imagen_url || this.apiResponse.image || '/images/placeholder.jpg',
      estado: this.apiResponse.estado || this.apiResponse.status,
    };
  }
}
export default {
  SearchValidationStrategy,
  BasicSearchValidation,
  AdvancedSearchValidation,
  VehicleValidationStrategy,
  SearchEventBus,
  searchEventBus,
  VehicleAPIAdapter
};
