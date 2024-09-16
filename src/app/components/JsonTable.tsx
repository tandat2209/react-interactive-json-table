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
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header}>
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
      <Table>
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell>
                <JsonTable data={value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <p>{data as React.ReactNode}</p>;
  }
}
