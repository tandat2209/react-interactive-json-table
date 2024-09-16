import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import EditableCell from "./EditableCell";
import JsonTable from "./JsonTable";

interface ObjectTableProps {
  data: Record<string, unknown>;
  onDataUpdate: (updatedData: unknown) => void;
}

export default function ObjectTable({ data, onDataUpdate }: ObjectTableProps) {
  const onKeyUpdate = (oldKey: string, newKey: string) => {
    const updatedData = { ...data };
    const oldKeyIndex = Object.keys(updatedData).indexOf(oldKey);
    const entries = Object.entries(updatedData);
    entries.splice(oldKeyIndex, 1, [newKey, updatedData[oldKey]]);
    onDataUpdate(Object.fromEntries(entries));
  };

  const onValueUpdate = (key: string, newValue: unknown) => {
    const updatedData = { ...data };
    updatedData[key] = newValue;
    onDataUpdate(updatedData);
  };

  return (
    <Table className="border-collapse border border-black w-auto h-auto">
      <TableBody>
        {Object.entries(data).map(([key, value], index) => (
          <TableRow
            key={key}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <TableCell className="font-bold border border-black p-0.5 text-xs">
              <EditableCell
                value={key}
                onUpdate={(newKey) => onKeyUpdate(key, newKey)}
              />
            </TableCell>
            <TableCell className="border border-black p-0.5 text-xs">
              <JsonTable data={value} onDataUpdate={(newValue) => onValueUpdate(key, newValue)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
