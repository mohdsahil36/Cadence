"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Transaction } from "../data/transactions";

export default function DataDialog({
  transaction,
  onClose,
}: {
  transaction: Transaction | null;
  onClose?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [openSections, setOpenSections] = useState({
    details: true,
    parties: true,
    failure: true,
  });

  const [hasMore, setHasMore] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    const updateScrollState = () => {
      const hasOverflow = element.scrollHeight > element.clientHeight + 2;
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 4;

      setHasMore(hasOverflow && !atBottom);
      setIsAtBottom(atBottom);
    };

    updateScrollState();

    element.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [transaction, openSections]);

  if (!transaction) {
    return (
      <aside className="flex h-full w-110 shrink-0 items-center justify-center rounded-xl border border-border bg-background shadow-sm">
        <div className="max-w-65 px-6 text-center">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full border border-border bg-muted/40">
            <span className="text-sm text-muted-foreground">↗</span>
          </div>

          <p className="text-sm font-medium">No transaction selected</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Select a transaction from the table to view its details.
          </p>
        </div>
      </aside>
    );
  }

  const status = transaction.status.toLowerCase();

  const statusStyles = {
    successful:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400",
    failed:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
    pending:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
  };

  const statusDot = {
    successful: "bg-emerald-500",
    failed: "bg-red-500",
    pending: "bg-amber-500",
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  return (
    <aside className="relative flex h-full w-110 shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      <div className="shrink-0 border-b border-border bg-background px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Transaction details
            </p>

            <h2 className="mt-1 truncate font-serif text-[29px] leading-tight tracking-tight">
              {transaction.id}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Badge
            variant="outline"
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
              statusStyles[status as keyof typeof statusStyles] ??
              "border-border bg-muted text-muted-foreground"
            }`}
          >
            <span
              className={`mr-1.5 size-1.5 rounded-full ${
                statusDot[status as keyof typeof statusDot] ??
                "bg-muted-foreground"
              }`}
            />
            {transaction.status}
          </Badge>

          <span className="truncate text-xs text-muted-foreground">
            {transaction.merchantName}
          </span>
        </div>
      </div>

      <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-5">
        <div className="rounded-xl border border-border bg-background px-5 py-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
            Net settlement
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-[38px] leading-none tracking-[-0.03em]">
              {transaction.netAmount.toFixed(2)}
            </span>

            <span className="text-sm font-semibold text-muted-foreground">
              {transaction.settlementCurrency}
            </span>
          </div>

          <div className="mt-3 h-px bg-border" />

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Settlement amount</span>

            <span className="font-medium">
              {transaction.netAmount.toFixed(2)}{" "}
              {transaction.settlementCurrency}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/30"
      >
        <Section
          title="Transaction details"
          open={openSections.details}
          onToggle={() => toggleSection("details")}
        >
          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-background">
            <Field
              label="Charged amount"
              value={`${transaction.amount.toFixed(2)} ${transaction.currency}`}
            />

            <Field
              label="Exchange rate"
              value={transaction.exchangeRate.toString()}
              leftBorder
            />

            <Field
              label="Fee"
              value={`${transaction.fee.toFixed(2)} ${transaction.currency}`}
              topBorder
            />

            <Field
              label="Payment method"
              value={formatValue(transaction.paymentMethod)}
              leftBorder
              topBorder
            />

            <Field
              label="Card brand"
              value={transaction.cardBrand ?? "—"}
              topBorder
            />

            <Field
              label="Date"
              value={new Date(transaction.createdAt).toLocaleString()}
              leftBorder
              topBorder
            />
          </div>
        </Section>

        <Section
          title="Parties"
          open={openSections.parties}
          onToggle={() => toggleSection("parties")}
        >
          <div className="grid grid-cols-2 gap-3">
            <InfoCard label="Merchant" value={transaction.merchantName} />

            <InfoCard
              label="Merchant country"
              value={transaction.merchantCountry}
              valueClassName="uppercase"
            />

            <InfoCard label="Customer" value={transaction.customer.name} />

            <InfoCard
              label="Customer country"
              value={transaction.customer.country}
              valueClassName="uppercase"
            />
          </div>
        </Section>

        {transaction.status === "failed" && transaction.failure && (
          <Section
            title="Failure"
            open={openSections.failure}
            onToggle={() => toggleSection("failure")}
          >
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 dark:border-red-900 dark:bg-red-950/20">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
                  !
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-red-900 dark:text-red-300">
                    {transaction.failure.reason}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600/70 dark:text-red-400/70">
                        Code
                      </p>

                      <p className="mt-1 text-xs font-medium text-red-900 dark:text-red-300">
                        {transaction.failure.code}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600/70 dark:text-red-400/70">
                        Retryable
                      </p>

                      <p className="mt-1 text-xs font-medium text-red-900 dark:text-red-300">
                        {transaction.failure.retryable ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

        <div className="h-5" />
      </div>

      {hasMore && !isAtBottom && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-20 items-end justify-center bg-linear-to-t from-background via-background/90 to-transparent pb-4">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background/95 px-3 py-1.5 text-[10px] font-medium text-muted-foreground shadow-sm backdrop-blur">
            <ChevronDown className="size-3" />
            Scroll for more
          </div>
        </div>
      )}
    </aside>
  );
}

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/30"
      >
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-foreground/50" />

          <h3 className="text-sm font-semibold">{title}</h3>
        </div>

        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className="px-6 pb-6">{children}</div>}
    </section>
  );
}

function Field({
  label,
  value,
  leftBorder = false,
  topBorder = false,
}: {
  label: string;
  value: string;
  leftBorder?: boolean;
  topBorder?: boolean;
}) {
  return (
    <div
      className={[
        "min-w-0 px-4 py-4",
        leftBorder ? "border-l border-border" : "",
        topBorder ? "border-t border-border" : "",
      ].join(" ")}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      <p className="mt-1.5 wrap-break-word text-sm font-medium leading-5 text-foreground">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 px-4 py-3.5 transition-colors hover:bg-muted/40">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      <p
        className={`mt-1.5 truncate text-sm font-medium text-foreground ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}

function formatValue(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
