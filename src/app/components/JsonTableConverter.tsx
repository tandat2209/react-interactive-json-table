'use client';
import { useState } from 'react';
import JsonTable from './JsonTable';

export default function JsonTableConverter() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState<unknown>(null);

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
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <textarea
          className="w-full h-[calc(100vh-100px)] p-2 border rounded"
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder="Enter your JSON here..."
        />
      </div>
      <div className="w-full md:w-1/2">
        {parsedData ? (
          <JsonTable data={parsedData} />
        ) : (
          <p>Enter valid JSON to see the table</p>
        )}
      </div>
    </div>
  );
}