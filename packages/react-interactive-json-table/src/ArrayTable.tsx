import React from "react";
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
    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: 'auto', height: 'auto' }}>
      <thead>
        <tr style={{ backgroundColor: '#e5e7eb' }}>
          {headers.map((header) => (
            <th
              key={header}
              style={{ border: '1px solid black', padding: '2px', fontSize: '12px', fontWeight: 'bold' }}
            >
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
            style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f3f4f6' }}
          >
            {headers.map((header) => (
              <td
                key={header}
                style={{ border: '1px solid black', padding: '2px', fontSize: '12px' }}
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
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
