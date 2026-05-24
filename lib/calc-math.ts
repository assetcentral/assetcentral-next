export function irr(cashflows: number[], guess = 0.1): number | null {
  if (!cashflows.length) return null;
  const hasNeg = cashflows.some((c) => c < 0);
  const hasPos = cashflows.some((c) => c > 0);
  if (!hasNeg || !hasPos) return null;

  let low = -0.999;
  let high = 10;
  let mid = guess;

  const npvAt = (r: number) =>
    cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + r, t), 0);

  if (npvAt(low) * npvAt(high) > 0) return null;

  for (let i = 0; i < 200; i++) {
    mid = (low + high) / 2;
    const v = npvAt(mid);
    if (Math.abs(v) < 1e-7) return mid;
    if (npvAt(low) * v < 0) high = mid;
    else low = mid;
  }
  return mid;
}

export function npv(rate: number, cashflows: number[]): number {
  return cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t), 0);
}

export function annuityPayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function fmtMoney(n: number | null, currency = "€"): string {
  if (n === null || !isFinite(n) || isNaN(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1_000_000) return `${sign}${currency}${(abs / 1_000_000).toFixed(2)}m`;
  if (abs >= 10_000) return `${sign}${currency}${Math.round(abs).toLocaleString()}`;
  return `${sign}${currency}${abs.toFixed(0)}`;
}

export function fmtPct(n: number | null, decimals = 1): string {
  if (n === null || !isFinite(n) || isNaN(n)) return "—";
  return `${(n * 100).toFixed(decimals)}%`;
}

export function fmtMoneyFull(n: number | null, currency = "€"): string {
  if (n === null || !isFinite(n) || isNaN(n)) return "—";
  const sign = n < 0 ? "−" : "";
  return `${sign}${currency}${Math.round(Math.abs(n)).toLocaleString()}`;
}
