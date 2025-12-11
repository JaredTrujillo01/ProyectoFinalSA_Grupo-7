import { createContext, useState } from "react";
import { createPago, getPagos, getPagoById, updatePago } from "../api/pago";

export const PagoContext = createContext();

export const PagoProvider = ({ children }) => {
  const [pagos, setPagos] = useState([]);
  const [currentPago, setCurrentPago] = useState(null);

  const addPago = async (pagoData) => {
    try {
      const newPago = await createPago(pagoData);
      setCurrentPago(newPago);
      setPagos((prev) => [...prev, newPago]);
      return newPago;
    } catch (error) {
      console.error("Error creando pago:", error);
      throw error;
    }
  };

  const loadPagos = async () => {
    try {
      const data = await getPagos();
      setPagos(data);
    } catch (error) {
      console.error("Error cargando pagos:", error);
    }
  };

  const getPago = async (id) => {
    try {
      const data = await getPagoById(id);
      return data;
    } catch (error) {
      console.error("Error obteniendo pago:", error);
      throw error;
    }
  };

  const editPago = async (id, changes) => {
    try {
      const updated = await updatePago(id, changes);
      setCurrentPago(updated);
      setPagos((prev) => prev.map(p => p.pago_id === id ? updated : p));
      return updated;
    } catch (error) {
      console.error("Error actualizando pago:", error);
      throw error;
    }
  };

  return (
    <PagoContext.Provider value={{ pagos, currentPago, addPago, loadPagos, getPago, editPago }}>
      {children}
    </PagoContext.Provider>
  );
};
