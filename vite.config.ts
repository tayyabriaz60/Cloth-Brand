import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const DEMO_MODE_VAR = "VITE_DEMO_MODE";
const DEMO_VITE_MODE = "demo";

export default defineConfig(({ command, mode }) => {
  const demoVar = loadEnv(mode, ".", "VITE_")[DEMO_MODE_VAR];
  const demoRequested = mode === DEMO_VITE_MODE || Boolean(demoVar?.trim());

  // Demo mode fakes login with hard-coded data; it must never reach a production bundle.
  if (command === "build" && demoRequested) {
    throw new Error(
      `${DEMO_MODE_VAR} is set (or --mode ${DEMO_VITE_MODE} was used). ` +
        "Demo mode is for local demos only and cannot be built. Unset it and build again.",
    );
  }

  return {
    plugins: [react(), tailwindcss()],
    server: { port: 5173, strictPort: true },
    define: demoRequested ? { [`import.meta.env.${DEMO_MODE_VAR}`]: JSON.stringify("true") } : {},
  };
});
