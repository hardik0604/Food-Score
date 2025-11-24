import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    const mockDatabase = [
        { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', fitnessScore: 50, calories: 400, servingSize: '1 bowl' },
        { id: 'butter-chicken', name: 'Butter Chicken', fitnessScore: 45, calories: 450, servingSize: '1 bowl' }
    ];

    it('renders search input', () => {
        render(<SearchBar onSelectFood={() => { }} foodDatabase={mockDatabase} />);
        const input = screen.getByPlaceholderText(/Search for any Indian food/i);
        expect(input).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        render(<SearchBar onSelectFood={() => { }} foodDatabase={mockDatabase} />);
        const input = screen.getByPlaceholderText(/Search for any Indian food/i);
        fireEvent.change(input, { target: { value: 'Paneer' } });
        expect(input.value).toBe('Paneer');
    });

    it('shows suggestions when typing', () => {
        render(<SearchBar onSelectFood={() => { }} foodDatabase={mockDatabase} />);
        const input = screen.getByPlaceholderText(/Search for any Indian food/i);
        fireEvent.change(input, { target: { value: 'Paneer' } });

        const suggestion = screen.getByText(/Paneer Butter Masala/i);
        expect(suggestion).toBeInTheDocument();
    });

    it('calls onSelectFood when a suggestion is clicked', () => {
        const handleSelect = vi.fn();
        render(<SearchBar onSelectFood={handleSelect} foodDatabase={mockDatabase} />);
        const input = screen.getByPlaceholderText(/Search for any Indian food/i);
        fireEvent.change(input, { target: { value: 'Paneer' } });

        const suggestion = screen.getByText(/Paneer Butter Masala/i);
        fireEvent.click(suggestion);

        expect(handleSelect).toHaveBeenCalled();
    });
});
