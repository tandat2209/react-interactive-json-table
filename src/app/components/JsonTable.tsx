import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface JsonTableProps {
  data: unknown;
}

export default function JsonTable({ data }: JsonTableProps) {
  if (Array.isArray(data) && data.length > 0) {
    const headers = Array.from(
      new Set(
        data.flatMap((item) =>
          typeof item === "object" ? Object.keys(item) : [""]
        )
      )
    );
    return (
      <Table className="border-collapse border border-black w-auto h-auto">
        <TableHeader>
          <TableRow className="bg-gray-200">
            {headers.map((header) => (
              <TableHead key={header} className="border border-black p-0.5 text-xs font-bold">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              {headers.map((header) => (
                <TableCell key={header} className="border border-black p-0.5 text-xs">
                  {typeof item === "object" ? (
                    <JsonTable data={item[header]} />
                  ) : header === "" ? (
                    item
                  ) : (
                    ""
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else if (typeof data === "object" && data !== null) {
    return (
      <Table className="border-collapse border border-black w-auto h-auto">
        <TableBody>
          {Object.entries(data).map(([key, value], index) => (
            <TableRow key={key} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <TableCell className="font-bold border border-black p-0.5 text-xs">{key}</TableCell>
              <TableCell className="border border-black p-0.5 text-xs">
                <JsonTable data={value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <p className="text-xs">{data as React.ReactNode}</p>;
  }
}
