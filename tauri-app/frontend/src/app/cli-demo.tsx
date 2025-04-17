"use client";
import { useState } from "react";

export default function CliDemo() {
  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [args, setArgs] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    setLoading(true);
    setResult(null);
    try {
      // Construct CLI arguments with provider, model, and API key
      const cliArgs = [];
      if (provider) cliArgs.push("--provider", provider);
      if (model) cliArgs.push("--model", model);
      if (apiKey) cliArgs.push("--api-key", apiKey);
      // Add additional args from the input
      cliArgs.push(...args.split(" ").filter(Boolean));

      const res = await fetch("/api/cli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args: cliArgs })
      });
      const data = await res.json();
      setResult(data.output || data.error);
    } catch (e: any) {
      setResult(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">Run codex-cli/dist/cli.js via API</h2>
      <div className="mb-2 flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={provider}
          onChange={e => setProvider(e.target.value)}
          placeholder="Provider (e.g. openai)"
        />
        <input
          className="border p-2 rounded flex-1"
          value={model}
          onChange={e => setModel(e.target.value)}
          placeholder="Model (e.g. gpt-4)"
        />
      </div>
      <input
        className="border p-2 rounded w-full mb-2"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="API Key"
        type="password"
      />
      <input
        className="border p-2 rounded w-full mb-2"
        value={args}
        onChange={e => setArgs(e.target.value)}
        placeholder="Additional CLI arguments (space separated)"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleRun}
        disabled={loading}
      >
        {loading ? "Running..." : "Run CLI"}
      </button>
      {result && (
        <pre className="mt-4 p-2 bg-gray-100 rounded whitespace-pre-wrap text-xs text-black max-h-64 overflow-auto">{result}</pre>
      )}
    </div>
  );
}
