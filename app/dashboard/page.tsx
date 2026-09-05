import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { transactions } from "../data/transactions";

const DataColumns = [
  "Merchant Name",
  "Merchant Country",
  "Amount",
  "Currency",
  "Settlement Amount",
  "Settlement Currency",
  "Payment Method",
];

const uniqueCurrencies = [
  ...new Set(transactions.map((item) => item.currency)),
];

export default function Dashboard() {
  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-center p-2">
      <div className="mb-3 flex w-full max-w-7xl justify-end">
        <Select>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {uniqueCurrencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="ms-4 min-w-20 px-5 rounded-md hover:otuline">
          Reset
        </Button>
      </div>
      <div className="flex h-[80vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl border bg-card p-5 shadow-sm">
        <Table containerClassName="min-h-0 flex-1 overflow-auto">
          <TableHeader>
            <TableRow>
              {DataColumns.map((item) => (
                <TableHead key={item}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.merchantName}</TableCell>

                <TableCell>{item.merchantCountry}</TableCell>

                <TableCell className="font-mono tabular-nums">
                  {item.amount}
                </TableCell>

                <TableCell>{item.currency}</TableCell>

                <TableCell className="font-mono tabular-nums">
                  {item.settlementAmount}
                </TableCell>

                <TableCell>{item.settlementCurrency}</TableCell>

                <TableCell>{item.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
