import { foodDatabase } from './src/data/foodDatabase.js';

console.log('Database length:', foodDatabase.length);
const query = 'butter';
const filtered = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(query.toLowerCase())
);
console.log('Filtered results for "butter":', filtered.length);
if (filtered.length > 0) {
    console.log('First match:', filtered[0].name);
}
