import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/markdown-editor/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
