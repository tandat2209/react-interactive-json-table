"use client";
import { useState } from "react";
import JsonTable from "react-interactive-json-table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import JsonView from "@uiw/react-json-view";

export default function JsonTableConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [toggle, setToggle] = useState<string[]>(["json", "table", "tree"]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setParsedData(parsed);
    } catch (error) {
      setParsedData(null);
    }
  };

  const handleDataUpdate = (updatedData: unknown) => {
    setParsedData(updatedData);
    setJsonInput(JSON.stringify(updatedData, null, 2));
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex mb-4">
        <ToggleGroup
          value={toggle}
          onValueChange={setToggle}
          type="multiple"
          className="flex gap-4"
        >
          <ToggleGroupItem value="json" aria-label="Toggle JSON Input">
            JSON
          </ToggleGroupItem>
          <ToggleGroupItem value="table" aria-label="Toggle JSON Table">
            Table
          </ToggleGroupItem>
          <ToggleGroupItem value="tree" aria-label="Toggle JSON Tree">
            Tree
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full h-full">
        {toggle.includes("json") && (
          <div
            className={`w-full ${toggle.includes("table") || toggle.includes("tree") ? "flex-1" : ""} h-full`}
          >
            <textarea
              className="w-full h-full p-2 border rounded resize-none"
              value={jsonInput}
              onChange={handleJsonChange}
              placeholder="Enter your JSON here..."
            />
          </div>
        )}
        {toggle.includes("table") && (
          <div
            className={`w-full ${toggle.includes("json") ? "flex-1" : ""} ${toggle.includes("tree") ? "flex-1" : ""} h-full overflow-auto`}
          >
            {parsedData ? (
              <JsonTable data={parsedData} onDataUpdate={handleDataUpdate} />
            ) : (
              <p>Enter valid JSON to see the table</p>
            )}
          </div>
        )}
        {toggle.includes("tree") && (
          <div
            className={`w-full ${toggle.includes("json") ? "flex-1" : ""} ${toggle.includes("table") ? "flex-1" : ""} h-full overflow-auto`}
          >
            {parsedData ? (
              <JsonView value={parsedData} />
            ) : (
              <p>Enter valid JSON to see the tree</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
