"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useDataTableStore from "../store/dataTableStore";
import { useEffect, useState } from "react";

interface DataTableFormProps {
  uniqueReceivedCurrencies: string[];
  uniqueSettlementCurrencies: string[];
  uniquePaymentMethods: string[];
  uniqueStatuses: string[];
}

function FilterSelect({
  label,
  placeholder,
  options,
  value,
  onValueChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value?: string | null;
  onValueChange?: (value: string | null) => void;
}) {
  return (
    <Field className="min-w-0">
      <FieldLabel>{label}</FieldLabel>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}

export default function DataTableForm({
  uniqueReceivedCurrencies,
  uniqueSettlementCurrencies,
  uniquePaymentMethods,
  uniqueStatuses,
}: DataTableFormProps) {
  const [merchantName, setmerchantName] = useState("");

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

  // setter functions for the filters selected
  const setSelectedMerchantName = useDataTableStore(
    (state) => state.setSelectedMerchantName,
  );

  const setSelectedReceivedCurrency = useDataTableStore(
    (state) => state.setSelectedRecievedCurrency,
  );

  const setSelectedSettlementCurrency = useDataTableStore(
    (state) => state.setSelectedSettlementCurrency,
  );

  const setSelectedPaymentMethod = useDataTableStore(
    (state) => state.setSelectedPaymentMethod,
  );

  const setSelectedStatus = useDataTableStore(
    (state) => state.setSelectedStatus,
  );

  const resetSelectedValues = useDataTableStore(
    (state) => state.resetSelectedValues,
  );

  //debounce function for the API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSelectedMerchantName(merchantName || null);

      return timerId;
    }, 1000);

    return () => clearTimeout(timerId);
  }, [merchantName, setSelectedMerchantName]);

  return (
    <div className="mb-4 grid w-full grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Field className="min-w-0">
        <FieldLabel htmlFor="merchant-name">Merchant Name</FieldLabel>
        <Input
          id="merchant-name"
          type="text"
          placeholder="Search merchant"
          className="w-full"
          value={merchantName ?? ""}
          onChange={(event) => {
            setmerchantName(event.target.value);
          }}
        />
      </Field>

      <FilterSelect
        label="Settlement Currency"
        placeholder="All"
        options={uniqueSettlementCurrencies}
        value={selectedSettlementCurrency}
        onValueChange={setSelectedSettlementCurrency}
      />

      <FilterSelect
        label="Received Currency"
        placeholder="All"
        options={uniqueReceivedCurrencies}
        value={selectedReceivedCurrency}
        onValueChange={setSelectedReceivedCurrency}
      />

      <FilterSelect
        label="Payment Method"
        placeholder="All"
        options={uniquePaymentMethods}
        value={selectedPaymentMethod}
        onValueChange={setSelectedPaymentMethod}
      />

      <FilterSelect
        label="Status"
        placeholder="All"
        options={uniqueStatuses}
        value={selectedStatus}
        onValueChange={setSelectedStatus}
      />

      <Button
        className="min-w-20 rounded-md px-5 xl:justify-self-stretch"
        onClick={() => {
          resetSelectedValues();
        }}
      >
        Reset
      </Button>
    </div>
  );
}
