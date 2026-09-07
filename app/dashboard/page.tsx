"use client";

import { useMemo } from "react";
import { transactions } from "../data/transactions";
import useDataTableStore from "../store/dataTableStore";
import DataTableForm from "../components/DataTableForm";
import DataTable from "../components/DataTable";

const uniqueReceivedCurrencies = [
  ...new Set(transactions.map((item) => item.currency)),
];

const uniqueSettlementCurrencies = [
  ...new Set(transactions.map((item) => item.settlementCurrency)),
];

const uniquePaymentMethods = [
  ...new Set(transactions.map((item) => item.paymentMethod)),
];

const uniqueStatuses = [...new Set(transactions.map((item) => item.status))];

export default function Dashboard() {
  const selectedReceivedCurrency = useDataTableStore(
    (state) => state.selectedRecievedCurrency,
  );
  const selectedSettlementCurrency = useDataTableStore(
    (state) => state.selectedSettlementCurrency,
  );
  const selectedPaymentMethod = useDataTableStore(
    (state) => state.selectedPaymentMethod,
  );
  const selectedStatus = useDataTableStore((state) => state.selectedStatus);

  const filteredData = useMemo(
    () =>
      transactions.filter((item) => {
        const matchesReceived =
          selectedReceivedCurrency == null ||
          item.currency === selectedReceivedCurrency;
        const matchesSettlement =
          selectedSettlementCurrency == null ||
          item.settlementCurrency === selectedSettlementCurrency;
        const matchesPayment =
          selectedPaymentMethod === null ||
          item.paymentMethod == selectedPaymentMethod;
        const matchesStatus =
          selectedStatus == null || item.status == selectedStatus;
        return (
          matchesReceived &&
          matchesSettlement &&
          matchesStatus &&
          matchesPayment
        );
      }),
    [
      selectedReceivedCurrency,
      selectedSettlementCurrency,
      selectedPaymentMethod,
      selectedStatus,
    ],
  );

  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center p-2">
      <div className="flex h-[80vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl border bg-card p-5 shadow-sm">
        <DataTableForm
          uniqueReceivedCurrencies={uniqueReceivedCurrencies}
          uniqueSettlementCurrencies={uniqueSettlementCurrencies}
          uniquePaymentMethods={uniquePaymentMethods}
          uniqueStatuses={uniqueStatuses}
        />
        <DataTable rows={filteredData} />
      </div>
    </main>
  );
}
