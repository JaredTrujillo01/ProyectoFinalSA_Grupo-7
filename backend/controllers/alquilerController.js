const { createReservation, cancelReservation } = require('../services/alquilerServices');

const crearAlquiler = async (req, res) => {
  try {
    const result = await createReservation({
      usuario_id: req.user.id,
      carro_id: req.body.carro_id,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,
      pagarAhora: req.body.pagarAhora,
      metodo_pago: req.body.metodo_pago
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const cancelarAlquiler = async (req, res) => {
  try {
    const result = await cancelReservation(req.params.id, req.user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { crearAlquiler, cancelarAlquiler };
