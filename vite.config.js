// vite.config.js
import { defineConfig } from 'vite';
import react   from "@vitejs/plugin-react"

export default defineConfig({
    build: {
        outDir: 'dist',
        },
    server: {
        proxy: {
        '/api': {
            target: process.env.REACT_APP_API_CLAIMS,
        },
        '/api/second': {
            target: process.env.REACT_APP_API_CLAIMS,
        }
        }
    },
    plugins:  [react()],
});