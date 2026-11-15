import type React from "react";
import { useState } from "react";
import {
  BarChart3, CheckCircle2, CircleDollarSign, LifeBuoy, LogOut, Minus, Package, Plus, Search, Settings,
  ShoppingCart, Square, Store, Trash2, Truck, Wallet, Wrench, X,
} from "lucide-react";

const WinMin = Minus;
import { formatLkr, type DemoSale } from "./demoSale";

const ICON = `${import.meta.env.BASE_URL}icon.svg`;

const NAV = [
  { icon: ShoppingCart, label: "POS" },
  { icon: CircleDollarSign, label: "Sales" },
  { icon: Wallet, label: "Installments" },
  { icon: Package, label: "Products" },
  { icon: Wrench, label: "Repairs" },
  { icon: Truck, label: "Suppliers" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
  { icon: LifeBuoy, label: "Support" },
];

/** A faithful, interactive replica of the real Smart Cashier "Current Sale" screen. */
export function AppMockup({ sale }: { sale: DemoSale }) {
  return (
    <div className="@container">
      <div
        role="region"
        aria-label="Interactive Smart Cashier demo with sample data"
        className="overflow-hidden rounded-[14px] border border-black/10 bg-app-bg font-app text-app-fg shadow-[0_1px_2px_rgba(17,17,17,.06),0_40px_80px_-32px_rgba(17,17,17,.35)]"
      >
        <TitleBar />
        <div className="flex @3xl:h-[600px]">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col @3xl:flex-row">
            <ProductArea sale={sale} />
            <Cart sale={sale} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleBar() {
  return (
    <div className="flex h-9 items-center justify-between border-b border-app-border/70 bg-white pl-3 text-[12px] text-app-muted select-none">
      <div className="flex items-center gap-2">
        <img src={ICON} alt="" className="h-4 w-4 object-contain" />
        <span className="font-medium text-app-fg">Smart Cashier</span>
      </div>
      <div className="flex h-full" aria-hidden="true">
        <span className="grid w-11 place-items-center"><WinMin size={13} /></span>
        <span className="grid w-11 place-items-center"><Square size={11} /></span>
        <span className="grid w-11 place-items-center"><X size={14} /></span>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-14 shrink-0 flex-col gap-1 border-r border-app-border bg-app-bg p-2 @lg:flex @4xl:w-52 @4xl:p-3">
      <div className="mb-3 flex flex-col items-center gap-1.5">
        <span className="grid h-10 w-10 place-items-center rounded-md border border-app-border bg-white text-app-fg @4xl:h-14 @4xl:w-14"><Store size={20} strokeWidth={1.6} /></span>
        <p className="m-0 hidden text-center text-[12px] font-semibold leading-tight @4xl:block">Demo Mobile Shop</p>
      </div>

      <div className="mb-2 hidden items-center gap-2.5 rounded-xl border border-app-border bg-white p-2.5 @4xl:flex">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-app-fg text-[12px] font-semibold text-white">N</span>
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-medium">Nimal</span>
          <span className="block text-[11px] text-app-muted">admin</span>
        </span>
      </div>

      <nav className="flex flex-col gap-0.5" aria-hidden="true">
        {NAV.map(({ icon: Icon, label }, i) => (
          <span
            key={label}
            title={label}
            className={`flex items-center justify-center gap-2 rounded-md px-2 py-[7px] text-[12.5px] font-medium @4xl:justify-start ${
              i === 0 ? "bg-app-fg text-white" : "text-app-fg"
            }`}
          >
            <Icon size={15} className="shrink-0" />
            <span className="hidden @4xl:inline">{label}</span>
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      <span className="flex items-center justify-center gap-1.5 rounded-full border border-app-ok/30 bg-app-ok-bg px-2.5 py-1 text-[11px] font-medium text-app-ok @4xl:justify-start">
        <CheckCircle2 size={13} className="shrink-0" />
        <span className="hidden @4xl:inline">Synced · just now</span>
      </span>
      <span className="mt-1.5 hidden items-center justify-center gap-1.5 rounded-md border border-app-border bg-white py-1.5 text-[12px] font-medium @4xl:flex">
        <LogOut size={13} /> Log out
      </span>
    </aside>
  );
}

function ProductArea({ sale }: { sale: DemoSale }) {
  const [q, setQ] = useState("");
  const list = sale.products.filter(
    (p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="min-w-0 flex-1 overflow-y-auto p-4 @3xl:p-5">
      <h3 className="m-0 font-app text-[20px] font-bold leading-7 tracking-[-0.02em] @3xl:text-[22px]">Current Sale</h3>
      <p className="m-0 mt-0.5 text-[11px] text-app-muted">Search for a product or scan a barcode to begin</p>

      <label className="relative mt-3.5 block">
        <span className="sr-only">Search products</span>
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-app-muted" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search product or scan barcode…"
          className="h-10 w-full rounded-lg border border-app-border bg-white pl-9 pr-3 font-app text-[13px] text-app-fg outline-none placeholder:text-app-muted focus:border-app-fg"
        />
      </label>

      <div className="mt-3.5 grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2">
        {list.map((p) => {
          const stock = sale.stock[p.id];
          const out = stock !== null && stock <= 0;
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              disabled={out || sale.paid}
              onClick={() => sale.change(p.id, 1)}
              className="group min-w-0 cursor-pointer rounded-lg border border-app-border bg-app-low p-2 text-left font-app text-app-fg transition hover:border-app-fg active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-app-border"
            >
              <span className="mb-1.5 grid aspect-[4/3] w-full place-items-center rounded-md border border-app-border bg-white text-app-muted">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <span className="block truncate text-[11.5px] font-medium leading-tight">{p.name}</span>
              <span className="mt-0.5 block truncate text-[10px] text-app-muted">{p.sku}</span>
              <span className="mt-1 block truncate text-[12.5px] font-semibold tabular-nums">{formatLkr(p.price)}</span>
              <span className="mt-1.5 block h-[18px]">
                {stock === null ? (
                  <Badge tone="neutral">Service</Badge>
                ) : out ? (
                  <Badge tone="bad">Out of stock</Badge>
                ) : stock <= 6 ? (
                  <Badge tone="warn">{stock} left</Badge>
                ) : null}
              </span>
            </button>
          );
        })}
        {list.length === 0 && <p className="col-span-full m-0 py-6 text-center text-[12px] text-app-muted">No products match “{q}”.</p>}
      </div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "warn" | "bad" | "neutral"; children: React.ReactNode }) {
  const cls = {
    warn: "border-app-warn/40 bg-app-warn-bg text-app-warn",
    bad: "border-app-bad/40 bg-app-bad-bg text-app-bad",
    neutral: "border-app-fg/20 bg-app-cont text-app-muted",
  }[tone];
  return <span className={`inline-flex items-center rounded-full border px-1.5 py-px text-[9.5px] font-medium ${cls}`}>{children}</span>;
}

function Cart({ sale }: { sale: DemoSale }) {
  return (
    <div className="flex w-full flex-col border-t border-app-border bg-app-low @3xl:w-72 @3xl:shrink-0 @3xl:border-l @3xl:border-t-0">
      <div className="flex items-center justify-between border-b border-app-border px-4 py-3 text-[12px]">
        <span className="font-semibold">Cart</span>
        <span className="text-app-muted">
          Sale #{sale.saleNo} · {sale.itemCount} {sale.itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="flex min-h-[150px] flex-1 flex-col gap-2 overflow-y-auto p-3">
        {sale.lines.length === 0 && (
          <div className="m-auto flex flex-col items-center gap-1.5 py-6 text-center text-app-muted">
            <ShoppingCart size={22} strokeWidth={1.5} />
            <span className="text-[12px]">Cart is empty</span>
          </div>
        )}
        {sale.lines.map((l) => (
          <div key={l.product.id} className="rounded-lg border border-app-border bg-white p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-medium">{l.product.name}</div>
                <div className="text-[11px] text-app-muted tabular-nums">{formatLkr(l.product.price)} each</div>
              </div>
              <button
                type="button"
                aria-label={`Remove ${l.product.name}`}
                onClick={() => sale.change(l.product.id, -l.qty)}
                disabled={sale.paid}
                className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md text-app-muted hover:bg-app-bad-bg hover:text-app-bad disabled:pointer-events-none"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center rounded-md bg-app-high">
                <button type="button" aria-label="Remove one" disabled={sale.paid} onClick={() => sale.change(l.product.id, -1)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-md hover:bg-app-border/60">
                  <Minus size={13} />
                </button>
                <span className="min-w-6 text-center text-[12.5px] font-semibold tabular-nums">{l.qty}</span>
                <button type="button" aria-label="Add one" disabled={sale.paid} onClick={() => sale.change(l.product.id, 1)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-md hover:bg-app-border/60">
                  <Plus size={13} />
                </button>
              </div>
              <span className="text-[13px] font-semibold tabular-nums">{formatLkr(l.amount)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-app-border p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[10.5px] font-medium uppercase tracking-wider text-app-muted">Total</span>
          <span className="text-[22px] font-bold leading-7 tracking-[-0.02em] tabular-nums">{formatLkr(sale.total)}</span>
        </div>
        {sale.paid ? (
          <>
            <div className="flex items-center gap-2 rounded-lg border border-app-ok/30 bg-app-ok-bg px-3 py-2.5 text-[12.5px] font-semibold text-app-ok">
              <CheckCircle2 size={15} /> Paid · receipt printed
            </div>
            <button type="button" onClick={sale.reset} className="min-h-11 w-full cursor-pointer rounded-lg border border-app-border bg-white px-4 text-[13px] font-semibold text-app-fg hover:bg-app-cont">
              New sale
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={sale.lines.length === 0}
            onClick={sale.charge}
            className="min-h-11 w-full cursor-pointer rounded-lg bg-app-fg px-4 text-[13px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            Checkout
            {sale.lines.length > 0 && (
              <span className="ml-2 text-white/60">
                · {sale.lines.length} {sale.lines.length === 1 ? "item" : "items"}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
