// src/services/paymentCalculator.js
export const calculatePaymentTotal = (dailyPrice, startDate, endDate) => {
  if (!dailyPrice || !startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;
  if (diffMs <= 0) return 0;
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Number(dailyPrice) * days;
};
