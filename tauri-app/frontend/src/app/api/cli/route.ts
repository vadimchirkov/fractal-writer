import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const args = Array.isArray(body.args) ? body.args : [];
  // Adjust path if your structure changes!
  const cliPath = path.resolve(process.cwd(), "../../codex-cli/dist/cli.js");

  return new Promise<NextResponse>((resolve) => {
    execFile("node", [cliPath, ...args], (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
        return;
      }
      resolve(NextResponse.json({ output: stdout }));
    });
  });
}
