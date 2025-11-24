import { foodDatabase } from './src/data/foodDatabase.js';

const ids = foodDatabase.map(f => f.id);
const seen = new Set();
const duplicates = new Set();

ids.forEach(id => {
    if (seen.has(id)) {
        duplicates.add(id);
    }
    seen.add(id);
});

console.log('Duplicate IDs:', Array.from(duplicates));
