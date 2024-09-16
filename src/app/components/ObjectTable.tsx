import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import EditableCell from "./EditableCell";
import JsonTable from "./JsonTable";

interface ObjectTableProps {
  data: Record<string, unknown>;
  onDataUpdate: (updatedData: unknown) => void;
}

export default function ObjectTable({ data, onDataUpdate }: ObjectTableProps) {
  return (
    <Table className="border-collapse border border-black w-auto h-auto">
      <TableBody>
        {Object.entries(data).map(([key, value], index) => (
          <TableRow
            key={key}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <TableCell className="font-bold border border-black p-0.5 text-xs">
              <EditableCell value={key} onUpdate={onDataUpdate} />
            </TableCell>
            <TableCell className="border border-black p-0.5 text-xs">
              <JsonTable data={value} onDataUpdate={onDataUpdate} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
