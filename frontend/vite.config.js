import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from 'fs'; 

export default defineConfig(({ command }) => { 
    const config = {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };

    if (command === 'serve') { 
        if (fs.existsSync('./localhost.pem')) { 
            config.server = {
                https: {
                    key: fs.readFileSync('./localhost-key.pem'), 
                    cert: fs.readFileSync('./localhost.pem'),  
                },
            };
        }
    }

    return config;
}); 
