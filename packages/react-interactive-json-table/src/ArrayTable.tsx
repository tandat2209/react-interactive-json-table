import React from "react";
import EditableCell from "./EditableCell";
import JsonTable from "./JsonTable";
import "./styles.css";

interface ArrayTableProps {
  data: unknown[];
  onDataUpdate: (updatedData: unknown) => void;
}

export default function ArrayTable({ data, onDataUpdate }: ArrayTableProps) {
  const headers = Array.from(
    new Set(
      data.flatMap((item) =>
        typeof item === "object" && item !== null
          ? Object.keys(item as object)
          : [""]
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
    <table className="json-table">
      <thead>
        <tr className="json-table-header">
          {headers.map((header) => (
            <th key={header} className="json-table-cell json-table-cell-bold">
              <EditableCell
                value={header}
                onUpdate={(newHeader) => handleKeyUpdate(header, newHeader)}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'json-table-row-even' : 'json-table-row-odd'}
          >
            {headers.map((header) => (
              <td key={header} className="json-table-cell">
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
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
