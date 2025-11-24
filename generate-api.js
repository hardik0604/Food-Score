import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { foodDatabase } from './src/data/foodDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, 'public', 'api');
const outputFile = path.join(outputDir, 'foods.json');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const apiData = {
    metadata: {
        totalItems: foodDatabase.length,
        generatedAt: new Date().toISOString(),
        version: "1.0.0"
    },
    data: foodDatabase
};

fs.writeFileSync(outputFile, JSON.stringify(apiData, null, 2));

console.log(`API generated at: ${outputFile}`);
console.log(`Total items: ${foodDatabase.length}`);
