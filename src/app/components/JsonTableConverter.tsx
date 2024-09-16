'use client';
import { useState } from 'react';
import JsonTable from './JsonTable';

export default function JsonTableConverter() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [showJsonInput, setShowJsonInput] = useState(true);
  const [showJsonTable, setShowJsonTable] = useState(true);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setParsedData(parsed);
    } catch (error) {
      setParsedData(null);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex mb-4">
        <label className="mr-4">
          <input
            type="checkbox"
            checked={showJsonInput}
            onChange={() => setShowJsonInput(!showJsonInput)}
          />
          Show JSON Input
        </label>
        <label>
          <input
            type="checkbox"
            checked={showJsonTable}
            onChange={() => setShowJsonTable(!showJsonTable)}
          />
          Show JSON Table
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full h-full">
        {showJsonInput && (
          <div className={`w-full ${showJsonTable ? 'md:w-1/2' : ''} h-full`}>
            <textarea
              className="w-full h-full p-2 border rounded resize-none"
              value={jsonInput}
              onChange={handleJsonChange}
              placeholder="Enter your JSON here..."
            />
          </div>
        )}
        {showJsonTable && (
          <div className={`w-full ${showJsonInput ? 'md:w-1/2' : ''} h-full overflow-auto`}>
            {parsedData ? (
              <JsonTable data={parsedData} />
            ) : (
              <p>Enter valid JSON to see the table</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}