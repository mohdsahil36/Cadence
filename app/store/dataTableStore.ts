import { create } from "zustand";

interface DataTableStore {
  selectedMerchantName: string | null;
  selectedSettlementCurrency: string | null;
  selectedRecievedCurrency: string | null;
  selectedPaymentMethod: string | null;
  selectedStatus: string | null;

  setSelectedMerchantName: (name: string | null) => void;
  setSelectedSettlementCurrency: (currency: string | null) => void;
  setSelectedRecievedCurrency: (currency: string | null) => void;
  setSelectedPaymentMethod: (method: string | null) => void;
  setSelectedStatus: (status: string | null) => void;
}

const useDataTableStore = create<DataTableStore>()((set) => ({
  selectedMerchantName: null,
  selectedSettlementCurrency: null,
  selectedRecievedCurrency: null,
  selectedPaymentMethod: null,
  selectedStatus: null,

  setSelectedMerchantName: (name: string | null) =>
    set({ selectedMerchantName: name }),

  setSelectedSettlementCurrency: (currency) =>
    set({ selectedSettlementCurrency: currency }),

  setSelectedRecievedCurrency: (currency) =>
    set({ selectedRecievedCurrency: currency }),

  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  setSelectedStatus: (status) => set({ selectedStatus: status }),
}));

export default useDataTableStore;
