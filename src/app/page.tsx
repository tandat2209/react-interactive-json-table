import JsonTableConverter from './components/JsonTableConverter';

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">JSON to Table Converter</h1>
      <div className="flex-grow">
        <JsonTableConverter />
      </div>
    </main>
  );
}