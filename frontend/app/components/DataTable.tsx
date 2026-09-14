import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "../data/transactions";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDataTableStore from "../store/dataTableStore";

const DataColumns = [
  "Merchant Name",
  "Merchant Country",
  "Settlement Amount",
  "Settlement Currency",
  "Received Amount",
  "Received Currency",
  "Payment Method",
  "Status",
];

const statusStyles = {
  successful: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  refunded: "bg-purple-100 text-purple-700",
};

export default function DataTable({ rows }: { rows: Transaction[] }) {
  const transactionId = useDataTableStore((state) => state.transactionId);
  const setTransactionId = useDataTableStore((state) => state.setTransactionId);
  const setTransactionModalState = useDataTableStore(
    (state) => state.setTransactionModalState,
  );
  return (
    <Table containerClassName="min-h-0 flex-1 overflow-auto">
      <TableHeader>
        <TableRow>
          {DataColumns.map((item) => (
            <TableHead key={item}>{item}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.length > 0 ? (
          rows.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer"
              onClick={() => {
                if (transactionId === item.id) {
                  setTransactionId(null);
                  setTransactionModalState(false);
                } else {
                  setTransactionId(item.id);
                  setTransactionModalState(true);
                }
              }}
            >
              <TableCell>{item.merchantName}</TableCell>
              <TableCell>{item.merchantCountry}</TableCell>
              <TableCell className="font-mono tabular-nums">
                {item.settlementAmount}
              </TableCell>
              <TableCell>{item.settlementCurrency}</TableCell>
              <TableCell className="font-mono tabular-nums">
                {item.amount}
              </TableCell>
              <TableCell>{item.currency}</TableCell>
              <TableCell className="capitalize">{item.paymentMethod}</TableCell>
              <TableCell>
                <Badge
                  className={`rounded-sm px-3 py-1 capitalize ${
                    statusStyles[item.status as keyof typeof statusStyles]
                  }`}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" className="border-0">
                  <ArrowUpRightIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={DataColumns.length}
              className="h-24 text-center capitalize"
            >
              No records found for the configurations.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
