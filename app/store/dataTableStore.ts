import { create } from "zustand";

interface DataTableStore {
  selectedSettlementCurrency: string | null;
  selectedRecievedCurrency: string | null;
  selectedPaymentMethod: string | null;
  selectedStatus: string | null;

  setSelectedSettlementCurrency: (currency: string | null) => void;
  setSelectedRecievedCurrency: (currency: string | null) => void;
  setSelectedPaymentMethod: (method: string | null) => void;
  setSelectedStatus: (status: string | null) => void;
}

const useDataTableStore = create<DataTableStore>()((set) => ({
  selectedSettlementCurrency: null,
  selectedRecievedCurrency: null,
  selectedPaymentMethod: null,
  selectedStatus: null,

  setSelectedSettlementCurrency: (currency) =>
    set({ selectedSettlementCurrency: currency }),

  setSelectedRecievedCurrency: (currency) =>
    set({ selectedRecievedCurrency: currency }),

  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  setSelectedStatus: (status) => set({ selectedStatus: status }),
}));

export default useDataTableStore;
