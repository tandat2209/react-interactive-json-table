import React, { useState } from "react";
import clsx from "clsx";
import EditableCell from "./EditableCell";
import JsonTable from "./JsonTable";
import CheckIcon from "./icons/CheckIcon";
import TrashIcon from "./icons/TrashIcon";
import ActionableCell from "./ActionableCell";

interface ArrayTableProps {
  data: unknown[];
  onDataUpdate: (updatedData: unknown) => void;
}

export default function ArrayTable({ data, onDataUpdate }: ArrayTableProps) {
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [deleteCol, setDeleteCol] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

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

  const handleDeleteColumn = (header: string) => {
    const updatedData = data.map((item) => {
      if (typeof item === "object" && item !== null) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [header]: deletedValue, ...rest } = item as {
          [key: string]: unknown;
        };
        return rest;
      }
      return item;
    });
    onDataUpdate(updatedData);
    setDeleteCol(null);
    setConfirmDelete(null);
  };

  return (
    <table className="json-table">
      <thead>
        <tr className="json-table-header">
          {headers.map((header) => (
            <th
              key={header}
              className={clsx(
                "json-table-cell",
                "json-table-cell-bold",
                hoveredCol === header && "json-table-header-highlighted-array",
                deleteCol === header && "json-table-header-delete"
              )}
              onMouseEnter={() => setHoveredCol(header)}
              onMouseLeave={() => {
                setHoveredCol(null);
                if (confirmDelete !== header) {
                  setDeleteCol(null);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <ActionableCell
                  actions={
                    hoveredCol === header && (
                      confirmDelete === header ? (
                        <CheckIcon
                          className="confirm-delete-button"
                          onClick={() => handleDeleteColumn(header)}
                        />
                      ) : (
                        <TrashIcon
                          className="delete-button"
                          onMouseEnter={() => setDeleteCol(header)}
                          onMouseLeave={() => setDeleteCol(null)}
                          onClick={() => setConfirmDelete(header)}
                        />
                      )
                    )
                  }
                >
                  <EditableCell
                    value={header}
                    onUpdate={(newHeader) => handleKeyUpdate(header, newHeader)}
                  />
                </ActionableCell>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={clsx(
              index % 2 === 0 ? "json-table-row-even" : "json-table-row-odd"
            )}
          >
            {headers.map((header) => (
              <td
                key={header}
                className={clsx(
                  "json-table-cell",
                  hoveredCol === header && "json-table-header-highlighted",
                  deleteCol === header && "json-table-cell-delete"
                )}
                onMouseEnter={() => setHoveredCol(header)}
                onMouseLeave={() => setHoveredCol(null)}
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
