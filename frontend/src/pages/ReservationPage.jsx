import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, Box, Button, Alert } from "@mui/material";
import VehicleCard from "../components/vehicles/VehicleCard";
import DateChangeDialog from "../components/reservations/DateChangeDialog"; // if you used the earlier component; else we include small local dialog
import { useLocation, useNavigate } from "react-router-dom";
import { reservationService } from "../services/reservationService";
import { calculatePaymentTotal } from "../services/paymentCalculator";

const ReservationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(state?.vehiculo ?? null);
  const [branch, setBranch] = useState(state?.branch ?? "");
  const [startDate, setStartDate] = useState(state?.dateRange?.startDate ?? "");
  const [endDate, setEndDate] = useState(state?.dateRange?.endDate ?? "");
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!vehicle) {
      const temp = reservationService.loadTemp();
      if (temp) {
        // map temp back to vehicle-like object
        setVehicle({
          carro_id: temp.vehicleId,
          nombre: temp.name,
          categoria: temp.category,
          placa: temp.plate,
          anio: temp.year,
          estado: temp.status,
          imagen: temp.image,
          precio: temp.daily_price
        });
        setStartDate(temp.startDate);
        setEndDate(temp.endDate);
        setBranch(temp.branch);
      } else {
        // no vehicle: redirije a lista
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

  const handleConfirm = () => {
    setError("");
    if (!startDate || !endDate) {
      setError("Selecciona un rango de fechas válido.");
      return;
    }
    if (endDate <= startDate) {
      setError("La fecha final no puede ser menor que la inicial.");
      return;
    }

    // crea el payload
    const payload = reservationService.makeReservationPayload({
      vehicle,
      startDate,
      endDate,
      branch
    });

    // calcula total
    const total = calculatePaymentTotal(payload.daily_price, startDate, endDate);
    payload.totalAmount = total;

    // guarda temp en localStorage como fallback
    reservationService.saveTemp(payload);

    // naviga a los pagos desde reservación
    navigate("/pago", { state: { reservation: payload } });
  };

  if (!vehicle) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>Confirma tu Reservación</Typography>

          <Box mb={2}>
            <VehicleCard
              vehiculo={{
                imagen: vehicle.imagen,
                marca: vehicle.marca || vehicle.nombre?.split(" ")?.[0],
                modelo: vehicle.modelo || vehicle.nombre,
                categoria: vehicle.categoria,
                placa: vehicle.placa,
                anio: vehicle.anio,
                estado: vehicle.estado,
                precioDia: vehicle.precio ?? vehicle.daily_price ?? vehicle.precioDia
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
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>

          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={() => navigate("/lista-vehiculos")}>Volver</Button>
            <Button variant="contained" onClick={handleConfirm}>Confirmar y pagar</Button>
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
  );
};

export default ReservationPage;
