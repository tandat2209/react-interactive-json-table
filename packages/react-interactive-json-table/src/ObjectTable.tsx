import React, { useState } from "react";
import clsx from "clsx";
import EditableCell from "./EditableCell";
import JsonTable from "./JsonTable";
import CheckIcon from "./icons/CheckIcon";
import TrashIcon from "./icons/TrashIcon";
import ActionableCell from "./ActionableCell";

interface ObjectTableProps {
  data: Record<string, unknown>;
  onDataUpdate: (updatedData: unknown) => void;
}

export default function ObjectTable({ data, onDataUpdate }: ObjectTableProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [deleteKey, setDeleteKey] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

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

  const handleDeleteKey = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: deletedValue, ...updatedData } = data;
    onDataUpdate(updatedData);
    setDeleteKey(null);
    setConfirmDelete(null);
  };

  return (
    <table className="json-table">
      <tbody>
        {Object.entries(data).map(([key, value], index) => (
          <tr
            key={key}
            className={clsx(
              index % 2 === 0 ? 'json-table-row-even' : 'json-table-row-odd',
              key === hoveredKey && 'json-table-row-highlighted',
              key === deleteKey && 'json-table-row-delete'
            )}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => {
              setHoveredKey(null);
              if (confirmDelete !== key) {
                setDeleteKey(null);
              }
            }}
          >
            <td className={clsx("json-table-cell", "json-table-cell-bold")}>
              <ActionableCell
                actions={
                  hoveredKey === key && (
                    confirmDelete === key ? (
                      <CheckIcon
                        className="confirm-delete-button"
                        onClick={() => handleDeleteKey(key)}
                      />
                    ) : (
                      <TrashIcon
                        className="delete-button"
                        onMouseEnter={() => setDeleteKey(key)}
                        onMouseLeave={() => setDeleteKey(null)}
                        onClick={() => setConfirmDelete(key)}
                      />
                    )
                  )
                }
              >
                <EditableCell
                  value={key}
                  onUpdate={(newKey) => onKeyUpdate(key, newKey)}
                />
              </ActionableCell>
            </td>
            <td className="json-table-cell">
              <JsonTable data={value} onDataUpdate={(newValue) => onValueUpdate(key, newValue)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

