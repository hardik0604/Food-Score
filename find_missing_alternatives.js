import { foodDatabase } from './src/data/foodDatabase.js';

console.log('Scanning for missing alternatives...\n');

const missingAlternatives = new Set();
const allFoodNames = new Set(foodDatabase.map(f => f.name));

foodDatabase.forEach(food => {
    food.alternatives.forEach(alt => {
        if (!allFoodNames.has(alt)) {
            missingAlternatives.add(alt);
            console.log(`❌ "${alt}" (alternative for "${food.name}") - NOT IN DATABASE`);
        }
    });
});

console.log(`\n\nTotal missing alternatives: ${missingAlternatives.size}`);
console.log('\nMissing alternatives list:');
console.log(Array.from(missingAlternatives).sort());
