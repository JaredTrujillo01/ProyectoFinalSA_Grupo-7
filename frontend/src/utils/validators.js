export function luhnCheck(cc = "") {
  const s = cc.replace(/\D/g, "");
  let sum = 0;
  let toggle = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let d = parseInt(s.charAt(i), 10);
    if (toggle) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    toggle = !toggle;
  }
  return s.length >= 13 && s.length <= 19 && sum % 10 === 0;
}

export function validateExpiry(mmYY = "") {
  if (!mmYY || typeof mmYY !== "string") return false;
  const parts = mmYY.split("/");
  if (parts.length !== 2) return false;
  const mm = parseInt(parts[0], 10);
  let yy = parseInt(parts[1], 10);
  if (isNaN(mm) || isNaN(yy) || mm < 1 || mm > 12) return false;

  // normalize year
  if (parts[1].length === 2) {
    const now = new Date();
    const currentCentury = Math.floor(now.getFullYear() / 100) * 100;
    yy = currentCentury + yy;
    if (yy < now.getFullYear()) yy += 100;
  }

  const exp = new Date(yy, mm - 1, 1);
  exp.setMonth(exp.getMonth() + 1);
  exp.setDate(0);
  const today = new Date();
  return exp >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function isValidCVV(cvv = "") {
  return /^\d{3,4}$/.test(String(cvv));
}

export function isValidEmail(email = "") {
  return /\S+@\S+\.\S+/.test(email);
}
