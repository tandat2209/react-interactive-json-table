import React from "react";
import EditableCell from "./EditableCell";
import ArrayTable from "./ArrayTable";
import ObjectTable from "./ObjectTable";

interface JsonTableProps {
  data: unknown;
  onDataUpdate: (updatedData: unknown) => void;
}

export default function JsonTable({ data, onDataUpdate }: JsonTableProps) {
  if (Array.isArray(data) && data.length > 0) {
    return <ArrayTable data={data as unknown[]} onDataUpdate={onDataUpdate} />;
  } else if (typeof data === "object" && data !== null) {
    return <ObjectTable data={data as Record<string, unknown>} onDataUpdate={onDataUpdate} />;
  } else {
    return (
      <EditableCell
        className="text-xs"
        value={data as string}
        onUpdate={(value) => {
          onDataUpdate(value);
        }}
      />
    );
  }
}
