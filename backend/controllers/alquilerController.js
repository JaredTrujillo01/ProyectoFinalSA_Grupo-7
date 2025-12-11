const { createReservation, cancelReservation } = require('../services/alquilerServices');

const crearAlquiler = async (req, res) => {
  try {
    // Si el frontend envía cliente_id directamente, usarlo
    // Si no, obtenerlo del usuario (usuario_id)
    const cliente_id = req.body.cliente_id || null;
    
    const result = await createReservation({
      usuario_id: req.user.id,
      cliente_id: cliente_id,
      carro_id: req.body.carro_id,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,
      costo_total: req.body.costo_total,
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
