import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, './src/') }],
    },
    define: {
        __API__: JSON.stringify('http://25.15.27.124:5000/api'),
        IS_DEV: JSON.stringify(true),
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://192.168.0.102:5000/api',
                // target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\//, ''),
            },
        },
    },
});
