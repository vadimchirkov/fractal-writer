# Next.js + Tauri Integration

## Development

1. In one terminal, run Next.js frontend:
   ```bash
   cd frontend
   npm run dev
   ```
2. In another terminal, run Tauri:
   ```bash
   cd tauri-app
   npm run tauri dev
   ```

## Production Build

1. Build the Next.js static site:
   ```bash
   cd frontend
   npm run build && npm run export
   ```
   This will output static files to `frontend/out`.
2. Build the Tauri app:
   ```bash
   cd tauri-app
   npm run tauri build
   ```

## Configuration

- `tauri.conf.json` is set to use `../frontend/out` as the frontend.
- Make sure any API endpoints or static files are referenced relative to the app root.

For more details, see the [Tauri Next.js guide](https://v2.tauri.app/start/frontend/nextjs/).
