import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'data', 'foodDatabase.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const duplicates = [
    'tandoori-chicken',
    'palak-paneer',
    'paneer-tikka',
    'bajra-roti',
    'sprouts-chaat',
    'chaas'
];

console.log('Searching for duplicates in:', filePath);

duplicates.forEach(id => {
    console.log(`\nFinding locations for id: "${id}"`);
    let count = 0;
    lines.forEach((line, index) => {
        if (line.includes(`"id": "${id}"`)) {
            count++;
            console.log(`  Occurrence ${count} at line ${index + 1}: ${line.trim()}`);
        }
    });
});
