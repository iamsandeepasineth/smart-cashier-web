import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { BatteryCharging, Cable, Headphones, HardDrive, Shield, Smartphone, Wrench, Zap } from "lucide-react";

export interface DemoProduct {
  id: string;
  name: string;
  sku: string;
  price: number; // LKR
  stock: number | null; // null = service
  icon: LucideIcon;
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: "p1", name: "USB-C cable 1m", sku: "ACC-0112", price: 1250, stock: 34, icon: Cable },
  { id: "p2", name: "Tempered glass", sku: "ACC-0207", price: 950, stock: 6, icon: Shield },
  { id: "p3", name: "20W fast charger", sku: "CHG-0020", price: 3900, stock: 18, icon: Zap },
  { id: "p4", name: "Wireless earbuds", sku: "AUD-0310", price: 7500, stock: 3, icon: Headphones },
  { id: "p5", name: "Redmi Note 13", sku: "PHN-1301", price: 64900, stock: 0, icon: Smartphone },
  { id: "p6", name: "Screen fitting", sku: "SRV-0001", price: 2500, stock: null, icon: Wrench },
  { id: "p7", name: "Power bank 10k", sku: "PWR-0100", price: 6200, stock: 9, icon: BatteryCharging },
  { id: "p8", name: "Memory card 64GB", sku: "MEM-0064", price: 3400, stock: 15, icon: HardDrive },
];

export function formatLkr(n: number) {
  return "LKR " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function useDemoSale() {
  const [cart, setCart] = useState<Record<string, number>>({ p2: 1, p1: 2 });
  const [order, setOrder] = useState<string[]>(["p2", "p1"]);
  const [paid, setPaid] = useState(false);
  const [saleNo, setSaleNo] = useState(1042);
  const [today, setToday] = useState(48650);
  const [todaySales, setTodaySales] = useState(23);
  const [stock, setStock] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(DEMO_PRODUCTS.map((p) => [p.id, p.stock])),
  );

  const byId = Object.fromEntries(DEMO_PRODUCTS.map((p) => [p.id, p]));

  const change = (id: string, d: number) => {
    if (paid) return;
    const s = stock[id];
    const current = cart[id] ?? 0;
    const next = current + d;
    if (d > 0 && s !== null && next > s) return; // can't sell more than in stock
    const c = { ...cart };
    let o = order;
    if (next <= 0) {
      delete c[id];
      o = order.filter((x) => x !== id);
    } else {
      if (!c[id]) o = [...order, id];
      c[id] = next;
    }
    setCart(c);
    setOrder(o);
  };

  const lines = order.map((id) => ({ product: byId[id], qty: cart[id], amount: byId[id].price * cart[id] }));
  const total = lines.reduce((s, l) => s + l.amount, 0);
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  const charge = () => {
    if (!lines.length || paid) return;
    setPaid(true);
    setToday((t) => t + total);
    setTodaySales((n) => n + 1);
    setStock((st) => {
      const next = { ...st };
      lines.forEach((l) => {
        const v = next[l.product.id];
        if (v !== null) next[l.product.id] = v - l.qty;
      });
      return next;
    });
  };

  const reset = () => {
    setCart({});
    setOrder([]);
    setPaid(false);
    setSaleNo((n) => n + 1);
  };

  const lowStock = DEMO_PRODUCTS.filter((p) => stock[p.id] !== null && (stock[p.id] as number) <= 6).map((p) => ({
    name: p.name,
    stock: stock[p.id] as number,
  }));

  return { products: DEMO_PRODUCTS, stock, cart, lines, total, itemCount, paid, saleNo, today, todaySales, lowStock, change, charge, reset };
}

export type DemoSale = ReturnType<typeof useDemoSale>;
