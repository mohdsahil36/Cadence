"use client";

import { useEffect, useState } from "react";

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
    <Field className="min-w-0 gap-1">
      <FieldLabel className="text-[11px] text-muted-foreground">
        {label}
      </FieldLabel>

      <Select value={value ?? undefined} onValueChange={onValueChange}>
        <SelectTrigger className="h-8 w-full text-xs">
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
  const [merchantName, setMerchantName] = useState("");

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

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSelectedMerchantName(merchantName || null);
    }, 500);

    return () => clearTimeout(timerId);
  }, [merchantName, setSelectedMerchantName]);

  return (
    <div className="grid w-full grid-cols-1 items-end gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Field className="min-w-0 gap-1">
        <FieldLabel
          htmlFor="merchant-name"
          className="text-[11px] text-muted-foreground"
        >
          Merchant
        </FieldLabel>

        <Input
          id="merchant-name"
          type="text"
          placeholder="Search merchant"
          className="h-8 w-full text-xs"
          value={merchantName}
          onChange={(event) => {
            setMerchantName(event.target.value);
          }}
        />
      </Field>

      <FilterSelect
        label="Settlement"
        placeholder="All"
        options={uniqueSettlementCurrencies}
        value={selectedSettlementCurrency}
        onValueChange={setSelectedSettlementCurrency}
      />

      <FilterSelect
        label="Received"
        placeholder="All"
        options={uniqueReceivedCurrencies}
        value={selectedReceivedCurrency}
        onValueChange={setSelectedReceivedCurrency}
      />

      <FilterSelect
        label="Payment method"
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
        variant="outline"
        className="h-8 rounded-md px-4 text-xs"
        onClick={() => {
          setMerchantName("");
          resetSelectedValues();
        }}
      >
        Reset
      </Button>
    </div>
  );
}
