// src/services/paymentService.js
// Simple factory + validators usage internally (kept minimal so UI decide validations)
export class PaymentFactory {
  static create(type, data) {
    if (type === "card") return new CardPayment(data);
    if (type === "paypal") return new PayPalPayment(data);
    throw new Error("Método de pago no soportado");
  }
}

class PayPalPayment {
  constructor({ email }) {
    this.type = "paypal";
    this.email = email;
  }

  validate() {
    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
      return { ok: false, error: "Email de PayPal inválido" };
    }
    return { ok: true };
  }

  getPayload(amount) {
    return { method: "paypal", email: this.email, amount };
  }
}

class CardPayment {
  constructor({ number, name, exp, cvv }) {
    this.type = "card";
    this.number = String(number || "").replace(/\s+/g, "");
    this.name = name;
    this.exp = exp;
    this.cvv = String(cvv || "");
  }

  validate() {
    if (!/^\d{13,19}$/.test(this.number)) return { ok: false, error: "Número de tarjeta inválido" };
    if (!/^\d{3,4}$/.test(this.cvv)) return { ok: false, error: "CVV inválido — 3 o 4 dígitos" };
    if (!this.exp || !this.exp.includes("/")) return { ok: false, error: "Expiración inválida" };
    if (!this.name || this.name.trim().length < 2) return { ok: false, error: "Nombre del titular inválido" };
    return { ok: true };
  }

  getPayload(amount) {
    return { method: "card", number: this.number, name: this.name, exp: this.exp, cvv: this.cvv, amount };
  }
}
