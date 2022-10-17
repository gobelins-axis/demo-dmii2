// Vendor
import { defineConfig } from 'vite';
import path from 'path';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [glsl()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, './src') },
            { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
            { find: 'style', replacement: path.resolve(__dirname, './src/style') },
            { find: 'script', replacement: path.resolve(__dirname, './src/script') },
            { find: 'utils', replacement: path.resolve(__dirname, './src/script/utils') },
            { find: 'vendor', replacement: path.resolve(__dirname, './src/script/vendor') },
            { find: 'webgl', replacement: path.resolve(__dirname, './src/script/webgl') },
        ],
    },
});
