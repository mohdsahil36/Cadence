"use client";

import { useMemo } from "react";
import { transactions } from "../data/transactions";
import useDataTableStore from "../store/dataTableStore";
import DataTableForm from "../components/DataTableForm";
import DataTable from "../components/DataTable";
import DataDialog from "../components/DataDialog";

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
  const transactionId = useDataTableStore((state) => state.transactionId);

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
  const selectedMerchantName = useDataTableStore(
    (state) => state.selectedMerchantName,
  );
  const transactionModalState = useDataTableStore(
    (state) => state.transactionModalState,
  );

  const filteredData = useMemo(
    () =>
      transactions.filter((item) => {
        const merchantQuery = selectedMerchantName?.trim().toLowerCase() ?? "";
        const matchesMerchant =
          merchantQuery === "" ||
          item.merchantName.toLowerCase().includes(merchantQuery);
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
          matchesMerchant &&
          matchesReceived &&
          matchesSettlement &&
          matchesStatus &&
          matchesPayment
        );
      }),
    [
      selectedMerchantName,
      selectedReceivedCurrency,
      selectedSettlementCurrency,
      selectedPaymentMethod,
      selectedStatus,
    ],
  );

  const transactionDetails = useMemo(
    () => transactions.find((item) => item.id === transactionId) ?? null,
    [transactionId],
  );

  return (
    <main className="flex min-h-svh w-full items-center justify-center p-2">
      <div className="flex w-full max-w-7xl items-center gap-5">
        <div className="flex h-[80vh] min-w-0 flex-1 flex-col overflow-hidden rounded-xl border bg-card p-5 shadow-sm">
          <DataTableForm
            uniqueReceivedCurrencies={uniqueReceivedCurrencies}
            uniqueSettlementCurrencies={uniqueSettlementCurrencies}
            uniquePaymentMethods={uniquePaymentMethods}
            uniqueStatuses={uniqueStatuses}
          />

          <div className="min-h-0 flex-1 overflow-auto">
            <DataTable rows={filteredData} />
          </div>
        </div>

        {transactionModalState && transactionDetails && (
          <aside className="h-[80vh] w-[320px] shrink-0">
            <DataDialog transaction={transactionDetails} />
          </aside>
        )}
      </div>
    </main>
  );
}
