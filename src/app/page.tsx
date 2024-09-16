import JsonTableConverter from './components/JsonTableConverter';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">JSON to Table Converter</h1>
        <Link
          href="https://github.com/tandat2209/json2tableconverter"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <Github size={20} />
          <span>View on GitHub</span>
        </Link>
      </div>
      <div className="flex-grow">
        <JsonTableConverter />
      </div>
    </main>
  );
}