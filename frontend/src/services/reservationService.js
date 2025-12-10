// simple helper to create reservation payload and persist temp to localStorage as fallback
//helper para crear reservacion 
export const reservationService = {
  makeReservationPayload: ({ vehicle, startDate, endDate, branch }) => {
    const base = {
      vehicleId: vehicle.carro_id ?? vehicle.id ?? vehicle.vehicle_id,
      name: vehicle.nombre || `${vehicle.marca || ""} ${vehicle.modelo || ""}`.trim(),
      category: vehicle.categoria || vehicle.category || "",
      plate: vehicle.placa || vehicle.plate || "",
      year: vehicle.anio || vehicle.year || "",
      status: vehicle.estado || "Pendiente",
      image: vehicle.imagen || vehicle.image || "",
      daily_price: vehicle.precioDia ?? vehicle.precio ?? vehicle.daily_price ?? 0,
      branch: branch || "",
      startDate: startDate || "",
      endDate: endDate || ""
    };

    // genera temp id
    base.reservationId = `R-${Date.now()}`;
    base.status = "Pendiente";
    return base;
  },

  saveTemp(reservationObj) {
    try {
      localStorage.setItem("reservation_temp", JSON.stringify(reservationObj));
      return true;
    } catch (e) {
      return false;
    }
  },

  loadTemp() {
    try {
      const raw = localStorage.getItem("reservation_temp");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  clearTemp() {
    try {
      localStorage.removeItem("reservation_temp");
    } catch (e) {}
  }
};
