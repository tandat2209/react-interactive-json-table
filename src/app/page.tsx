import JsonTableConverter from './components/JsonTableConverter';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON to Table Converter</h1>
      <JsonTableConverter />
    </main>
  );
}