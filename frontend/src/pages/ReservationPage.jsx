import React, { useState, useEffect, useContext } from "react";
import { Container, Card, CardContent, Typography, Box, Button, Alert, CircularProgress } from "@mui/material";
import VehicleCard from "../components/vehicles/VehicleCard";
import DateChangeDialog from "../components/reservations/DateChangeDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { reservationService } from "../services/reservationService";
import { calculatePaymentTotal } from "../services/paymentCalculator";
import { AlquilerContext } from "../context/alquilerContext";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/layout/header";

const ReservationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addAlquiler } = useContext(AlquilerContext);
  
  const [vehicle, setVehicle] = useState(state?.vehiculo ?? null);
  const [branch, setBranch] = useState(state?.branch ?? "");
  const [startDate, setStartDate] = useState(state?.dateRange?.startDate ?? "");
  const [endDate, setEndDate] = useState(state?.dateRange?.endDate ?? "");
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!vehicle) {
      const temp = reservationService.loadTemp();
      if (temp) {
        setVehicle({
          carro_id: temp.vehicleId,
          marca: temp.marca || temp.name?.split(" ")?.[0] || "",
          modelo: temp.modelo || temp.name?.split(" ").slice(1).join(" ") || "",
          categoria: temp.category,
          placa: temp.plate,
          anio: temp.year,
          estado: temp.status,
          imagen: temp.image,
          daily_price: temp.daily_price
        });
        setStartDate(temp.startDate);
        setEndDate(temp.endDate);
        setBranch(temp.branch);
      } else {
        navigate("/lista-vehiculos");
      }
    }
    // eslint-disable-next-line
  }, []);

  const openDateDialog = () => setDialogOpen(true);
  const saveDates = ({ startDate: s, endDate: e }) => {
    setStartDate(s);
    setEndDate(e);
  };

  const handleConfirm = async () => {
    setError("");
    if (!startDate || !endDate) {
      setError("Selecciona un rango de fechas válido.");
      return;
    }
    if (endDate <= startDate) {
      setError("La fecha final no puede ser menor que la inicial.");
      return;
    }

    setLoading(true);
    try {
      // Calcular costo total
      const total = calculatePaymentTotal(vehicle.daily_price || vehicle.categoria?.costo_por_dia, startDate, endDate);

      // Crear alquiler en backend (sin pagar todavía)
      const alquilerData = {
        cliente_id: user?.cliente_id,
        carro_id: vehicle.carro_id,
        fecha_inicio: startDate,
        fecha_fin: endDate,
        costo_total: total,
        pagarAhora: false
      };

      const newAlquiler = await addAlquiler(alquilerData);

      // Crear payload para PaymentPage
      const payload = {
        name: `${vehicle.marca} ${vehicle.modelo}`,
        startDate,
        endDate,
        daily_price: vehicle.daily_price || vehicle.categoria?.costo_por_dia,
        totalAmount: total,
        alquiler_id: newAlquiler.alquiler_id
      };

      // Navegar a pagos
      navigate("/pagos", { state: { reservation: payload } });
    } catch (err) {
      setError(err.message || "Error al crear el alquiler");
      console.error("Error al crear alquiler:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) return null;

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" mb={2}>Confirma tu Reservación</Typography>

            <Box mb={2}>
              <VehicleCard
                vehiculo={{
                  carro_id: vehicle.carro_id,
                  marca: vehicle.marca,
                  modelo: vehicle.modelo,
                  categoria: vehicle.categoria,
                  placa: vehicle.placa,
                  anio: vehicle.anio,
                  estado: vehicle.estado,
                  imagen: vehicle.imagen
                }}
                showButton={false}
              />
            </Box>

            <Box sx={{ p: 2, boxShadow: 4, borderRadius: 2, mb: 2 }}>
              <Typography variant="subtitle2">Fecha de alquiler del vehículo:</Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Typography>{startDate || "—"} — {endDate || "—"}</Typography>
                <Button size="small" onClick={openDateDialog}>Modificar</Button>
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle2">Sucursal:</Typography>
                <Typography>{branch || "Sucursal principal"}</Typography>
              </Box>
              
              <Box mt={2}>
                <Typography variant="subtitle2">Precio diario:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  ${Number(vehicle.daily_price || vehicle.categoria?.costo_por_dia || 0).toFixed(2)}
                </Typography>
              </Box>

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>

            <Box display="flex" gap={2}>
              <Button variant="outlined" onClick={() => navigate("/lista-vehiculos")} disabled={loading}>
                Volver
              </Button>
              <Button variant="contained" onClick={handleConfirm} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Confirmar y pagar"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <DateChangeDialog
          open={dialogOpen}
          initialStart={startDate}
          initialEnd={endDate}
          onClose={() => setDialogOpen(false)}
          onSave={({ startDate: s, endDate: e }) => saveDates({ startDate: s, endDate: e })}
        />
      </Container>
    </>
  );
};

export default ReservationPage;
