import { createContext, useState, useEffect } from "react";
import { getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado } from "../api/empleado";

export const EmpleadosContext = createContext();

export const EmpleadosProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    loadEmpleados();
  }, []);

  const loadEmpleados = async () => {
    try {
      console.log('Intentando cargar empleados...');
      const data = await getEmpleados();
      console.log('Datos recibidos del backend:', data);
      setEmpleados(data);
    } catch (error) {
      console.error("Error cargando empleados:", error);
      console.error("Detalles del error:", error.message);
    }
  };

  const addEmpleado = async (empleadoData) => {
    try {
      const newEmp = await createEmpleado(empleadoData);
      setEmpleados((prev) => [...prev, newEmp]);
      return newEmp;
    } catch (error) {
      console.error("Error creando empleado:", error);
      throw error;
    }
  };

  const editEmpleado = async (id, changes) => {
    try {
      const updated = await updateEmpleado(id, changes);
      setEmpleados((prev) => prev.map(e => e.empleado_id === id ? updated : e));
      return updated;
    } catch (error) {
      console.error("Error actualizando empleado:", error);
      throw error;
    }
  };

  const removeEmpleado = async (id) => {
    try {
      await deleteEmpleado(id);
      setEmpleados((prev) => prev.filter(e => e.empleado_id !== id));
    } catch (error) {
      console.error("Error eliminando empleado:", error);
      throw error;
    }
  };

  return (
    <EmpleadosContext.Provider value={{ empleados, loadEmpleados, addEmpleado, editEmpleado, removeEmpleado }}>
      {children}
    </EmpleadosContext.Provider>
  );
};
