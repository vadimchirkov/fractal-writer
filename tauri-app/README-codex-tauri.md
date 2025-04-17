# Tauri + Next.js + CLI Integration

## How it works

- The Next.js frontend is loaded in the Tauri window.
- The frontend calls a Node.js script (`src/run-codex-cli.js`) via Tauri's shell plugin.
- The script runs your CLI (`codex-cli/dist/cli.js`) and returns the output.

## Development Steps

1. Install the Tauri shell plugin:
   ```bash
   cd tauri-app
   npm install @tauri-apps/plugin-shell
   ```
2. Add the shell plugin to your Tauri config (`src-tauri/tauri.conf.json`):
   ```json
   "plugins": {
     "shell": {
       "all": true
     }
   }
   ```
3. In your Next.js app, use the Tauri shell API to call the script:
   ```js
   import { Command } from '@tauri-apps/plugin-shell';
   async function runCli(args) {
     const command = new Command('node', ['src/run-codex-cli.js', ...args]);
     let output = '';
     command.stdout.on('data', line => output += line);
     command.stderr.on('data', line => output += line);
     await command.execute();
     return output;
   }
   ```
4. Display the output in your Next.js frontend.

---

For more details, see the official Tauri docs and plugin-shell docs.
