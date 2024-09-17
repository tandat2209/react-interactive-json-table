import React from "react";
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
    <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: 'auto', height: 'auto' }}>
      <tbody>
        {Object.entries(data).map(([key, value], index) => (
          <tr
            key={key}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f3f4f6' }}
          >
            <td style={{ border: '1px solid black', padding: '2px', fontSize: '12px', fontWeight: 'bold' }}>
              <EditableCell
                value={key}
                onUpdate={(newKey) => onKeyUpdate(key, newKey)}
              />
            </td>
            <td style={{ border: '1px solid black', padding: '2px', fontSize: '12px' }}>
              <JsonTable data={value} onDataUpdate={(newValue) => onValueUpdate(key, newValue)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
