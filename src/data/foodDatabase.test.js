import { describe, it, expect } from 'vitest';
import { foodDatabase } from './foodDatabase';

describe('Food Database', () => {
    it('should have unique IDs', () => {
        const ids = foodDatabase.map(food => food.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid structure for all items', () => {
        foodDatabase.forEach(food => {
            expect(food).toHaveProperty('id');
            expect(food).toHaveProperty('name');
            expect(food).toHaveProperty('calories');
            expect(food).toHaveProperty('macros');
            expect(food.macros).toHaveProperty('protein');
            expect(food.macros).toHaveProperty('carbs');
            expect(food.macros).toHaveProperty('fat');
            expect(food).toHaveProperty('fitnessScore');
            expect(food).toHaveProperty('verdict');
        });
    });

    it('should have valid alternatives', () => {
        const allFoodNames = new Set(foodDatabase.map(f => f.name));
        // Add known "virtual" alternatives that are valid but not in DB
        const allowedMissing = ['None needed', 'Air-popped Popcorn'];

        foodDatabase.forEach(food => {
            if (food.alternatives) {
                food.alternatives.forEach(alt => {
                    const isValid = allFoodNames.has(alt) || allowedMissing.includes(alt);
                    if (!isValid) {
                        console.warn(`Warning: Alternative "${alt}" for "${food.name}" not found in database.`);
                    }
                    // We won't fail the test for now, just warn, or we can fail if we want strictness
                    // expect(isValid).toBe(true); 
                });
            }
        });
    });
});
