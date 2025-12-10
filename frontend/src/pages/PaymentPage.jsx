// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { calculatePaymentTotal } from "../services/paymentCalculator";
import { PaymentFactory } from "../services/paymentService";
import { luhnCheck, validateExpiry, isValidCVV, isValidEmail } from "../utils/validators";
import { reservationService } from "../services/reservationService";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(state?.reservation ?? null);
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!reservation) {
      const temp = reservationService.loadTemp();
      if (temp) setReservation(temp);
      else navigate("/vehiculos");
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

    // create payment object
    const paymentObj = method === "card"
      ? PaymentFactory.create("card", { number: card.number.replace(/\s+/g, ""), name: card.name, exp: card.exp, cvv: card.cvv })
      : PaymentFactory.create("paypal", { email: paypalEmail });

    const v = paymentObj.validate();
    if (!v.ok) { setError(v.error); return; }

    setProcessing(true);

    // simulate API call
    await new Promise((res) => setTimeout(res, 1000));

    const success = true; // toggle to false to simulate failure
    if (success) {
      const updated = { ...reservation, status: "Pagada", paidAt: new Date().toISOString() };
      // if you want to persist elsewhere, call API here
      reservationService.clearTemp();
      setReservation(updated);
      setProcessing(false);
      // go to dashboard or bookings list
      navigate("/dashboard-cliente"); // adjust route to your app
    } else {
      setProcessing(false);
      setError("Pago fallido — verifique los datos o intente otro método");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
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
                <Typography variant="h6" sx={{ mt: 2 }}>Total a pagar: ${total.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6">Método de pago</Typography>

              <Box mt={2}>
                <Button variant={method === "card" ? "contained" : "outlined"} sx={{ mr: 1 }} onClick={() => setMethod("card")}>Tarjeta</Button>
                <Button variant={method === "paypal" ? "contained" : "outlined"} onClick={() => setMethod("paypal")}>PayPal</Button>
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
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Nombre en la tarjeta"
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                    />
                    <Box display="flex" gap={1}>
                      <TextField
                        label="Expiración (MM/AA)"
                        value={card.exp}
                        onChange={(e) => setCard({ ...card, exp: e.target.value })}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="CVV"
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        fullWidth
                        margin="normal"
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
                {processing ? "Procesando..." : `Pagar ($${total.toFixed(2)})`}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;
