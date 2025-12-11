import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { calculatePaymentTotal } from "../services/paymentCalculator";
import { PaymentFactory } from "../services/paymentService";
import { luhnCheck, validateExpiry, isValidCVV, isValidEmail } from "../utils/validators";
import { reservationService } from "../services/reservationService";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { PagoContext } from "../context/pagoContext";
import { AlquilerContext } from "../context/alquilerContext";
import Header from "../components/layout/header";

const formatExpiry = (value) => {
  let v = value.replace(/\D/g, "");
  if (v.length >= 3) {
    v = v.replace(/(\d{2})(\d{1,2}).*/, "$1/$2");
  }
  return v;
};

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addPago } = useContext(PagoContext);
  const { editAlquiler } = useContext(AlquilerContext);

  const [reservation, setReservation] = useState(state?.reservation ?? null);
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: ""
  });
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const openSnack = (severity, message) => {
    setSnack({ open: true, severity, message });
  };

  useEffect(() => {
    if (!reservation) {
      const temp = reservationService.loadTemp();
      if (temp) setReservation(temp);
      else navigate("/lista-vehiculos");
    }
    // eslint-disable-next-line
  }, []);

  if (!reservation) return null;

  const total = calculatePaymentTotal(reservation.daily_price, reservation.startDate, reservation.endDate);

  const validateCardFields = () => {
    if (!luhnCheck(card.number)) return "Número de tarjeta inválido";
    if (!validateExpiry(card.exp)) return "Expiración inválida";
    if (!isValidCVV(card.cvv)) return "CVV inválido — 3 o 4 dígitos";
    if (!card.name || card.name.trim().length < 2) return "Nombre del titular inválido";
    return null;
  };

  const handlePay = async () => {
    setError("");
    if (method === "card") {
      const v = validateCardFields();
      if (v) { setError(v); return; }
    } else {
      if (!isValidEmail(paypalEmail)) { setError("Email de PayPal inválido"); return; }
    }

    const paymentObj = method === "card"
      ? PaymentFactory.create("card", { number: card.number.replace(/\s+/g, ""), name: card.name, exp: card.exp, cvv: card.cvv })
      : PaymentFactory.create("paypal", { email: paypalEmail });

    const v = paymentObj.validate();
    if (!v.ok) { setError(v.error); return; }

    setProcessing(true);

    // Simula el procesamiento del pago
    await new Promise((res) => setTimeout(res, 1500));

    try {
      // Crear el registro de pago en la BD
      const pagoData = {
        alquiler_id: reservation.alquiler_id,
        monto: total,
        metodo_pago: method === "card" ? "tarjeta" : "paypal"
      };

      const newPago = await addPago(pagoData);

      // Actualizar el estado del alquiler a "activo"
      await editAlquiler(reservation.alquiler_id, { estado: "activo" });

      // Mostrar mensaje de éxito
      openSnack("success", "Pago realizado con éxito");
      reservationService.clearTemp();

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setProcessing(false);
      setError(err.message || "Error al procesar el pago");
      console.error("Error al crear pago:", err);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" textAlign="center" mb={3}>Pago</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6">Detalle de pago</Typography>
                <Box mt={2}>
                  <Typography>Vehículo: {reservation.name}</Typography>
                  <Typography>Fecha: {reservation.startDate} — {reservation.endDate}</Typography>
                  <Typography>Detalle de precio: ${reservation.daily_price} x día</Typography>
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>Total a pagar: ${total.toFixed(2)}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6">Método de pago</Typography>

                <Box mt={2}>
                  <Button 
                    variant={method === "card" ? "contained" : "outlined"} 
                    sx={{ mr: 1 }} 
                    onClick={() => setMethod("card")}
                    disabled={processing}
                  >
                    Tarjeta
                  </Button>
                  <Button 
                    variant={method === "paypal" ? "contained" : "outlined"} 
                    onClick={() => setMethod("paypal")}
                    disabled={processing}
                  >
                    PayPal
                  </Button>
                </Box>

                <Box mt={2}>
                  {method === "card" ? (
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Número de tarjeta"
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: e.target.value })}
                        placeholder="1234123412341234"
                        disabled={processing}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre en la tarjeta"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                        disabled={processing}
                      />
                      <Box display="flex" gap={1}>
                        <TextField
                          label="Expiración (MM/AA)"
                          value={card.exp}
                          onChange={(e) =>
                            setCard({ ...card, exp: formatExpiry(e.target.value) })
                          }
                          fullWidth
                          margin="normal"
                          disabled={processing}
                        />
                        <TextField
                          label="CVV"
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                          fullWidth
                          margin="normal"
                          disabled={processing}
                        />
                      </Box>
                    </>
                  ) : (
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email PayPal"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      disabled={processing}
                    />
                  )}
                </Box>

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handlePay}
                  disabled={processing}
                >
                  {processing ? <CircularProgress size={24} /> : `Pagar ($${total.toFixed(2)})`}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => navigate("/alquiler")}
                  disabled={processing}
                >
                  Volver
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          onClose={() => setSnack({ ...snack, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert severity={snack.severity} variant="filled" onClose={() => setSnack({ ...snack, open: false })}>
            {snack.message}
          </MuiAlert>
        </Snackbar>
      </Container>
    </>
  );
};

export default PaymentPage;
