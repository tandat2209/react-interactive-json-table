import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditableCell from "./EditableCell";
import JsonTable from "./JsonTable";

interface ArrayTableProps {
  data: unknown[];
  onDataUpdate: (updatedData: unknown) => void;
}

export default function ArrayTable({ data, onDataUpdate }: ArrayTableProps) {
  const headers = Array.from(
    new Set(
      data.flatMap((item) =>
        typeof item === "object" && item !== null ? Object.keys(item as object) : [""]
      )
    )
  );

  const handleKeyUpdate = (oldKey: string, newKey: string) => {
    const updatedData = data.map((item) => {
      if (typeof item === "object" && item !== null) {
        const entries = Object.entries(item);
        const updatedEntries = entries.map(([key, value]) =>
          key === oldKey ? [newKey, value] : [key, value]
        );
        return Object.fromEntries(updatedEntries);
      }
      return item;
    });

    onDataUpdate(updatedData);
  };

  const onValueUpdate = (index: number, header: string, newValue: unknown) => {
    const updatedData = data.map((item, i) => {
      if (i === index) {
        if (typeof item === "object" && item !== null) {
          const updatedItem: { [key: string]: unknown } = { ...item };
          updatedItem[header] = newValue;
          return updatedItem;
        } else if (header === "") {
          return newValue;
        } else {
          return { [header]: newValue };
        }
      }
      return item;
    });
    onDataUpdate(updatedData);
  };

  return (
    <Table className="border-collapse border border-black w-auto h-auto">
      <TableHeader>
        <TableRow className="bg-gray-200">
          {headers.map((header) => (
            <TableHead
              key={header}
              className="border border-black p-0.5 text-xs font-bold"
            >
              <EditableCell
                value={header}
                onUpdate={(newHeader) => handleKeyUpdate(header, newHeader)}
              />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            {headers.map((header) => (
              <TableCell
                key={header}
                className="border border-black p-0.5 text-xs"
              >
                <JsonTable
                  data={
                    typeof item === "object" && item !== null
                      ? (item as { [key: string]: unknown })[header]
                      : header === ""
                      ? item
                      : undefined
                  }
                  onDataUpdate={(newValue) =>
                    onValueUpdate(index, header, newValue)
                  }
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
