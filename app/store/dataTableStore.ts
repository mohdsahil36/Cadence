import { create } from "zustand";

interface DataTableStore {
  selectedMerchantName: string | null;
  selectedSettlementCurrency: string | null;
  selectedRecievedCurrency: string | null;
  selectedPaymentMethod: string | null;
  selectedStatus: string | null;

  transactionId: string | null;
  transactionModalState: boolean;

  setSelectedMerchantName: (name: string | null) => void;
  setSelectedSettlementCurrency: (currency: string | null) => void;
  setSelectedRecievedCurrency: (currency: string | null) => void;
  setSelectedPaymentMethod: (method: string | null) => void;
  setSelectedStatus: (status: string | null) => void;

  setTransactionId: (id: string | null) => void;
  setTransactionModalState: (
    state: boolean | ((prev: boolean) => boolean),
  ) => void;

  resetSelectedValues: () => void;
}

const useDataTableStore = create<DataTableStore>()((set) => ({
  selectedMerchantName: null,
  selectedSettlementCurrency: null,
  selectedRecievedCurrency: null,
  selectedPaymentMethod: null,
  selectedStatus: null,

  transactionId: null,
  transactionModalState: false,

  setSelectedMerchantName: (name) => set({ selectedMerchantName: name }),

  setSelectedSettlementCurrency: (currency) =>
    set({ selectedSettlementCurrency: currency }),

  setSelectedRecievedCurrency: (currency) =>
    set({ selectedRecievedCurrency: currency }),

  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  setSelectedStatus: (status) => set({ selectedStatus: status }),

  setTransactionId: (id) => set({ transactionId: id }),

  setTransactionModalState: (state) =>
    set((store) => ({
      transactionModalState:
        typeof state === "function"
          ? state(store.transactionModalState)
          : state,
    })),

  resetSelectedValues: () =>
    set({
      selectedMerchantName: null,
      selectedSettlementCurrency: null,
      selectedRecievedCurrency: null,
      selectedPaymentMethod: null,
      selectedStatus: null,
    }),
}));

export default useDataTableStore;
