import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';

const SearchBar = ({ onSelectFood, foodDatabase }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (selectedIndex >= 0 && listRef.current) {
            const selectedElement = listRef.current.children[selectedIndex];
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);

    const handleSearch = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.length > 0) {
            const filtered = foodDatabase.filter(food =>
                food.name.toLowerCase().includes(newQuery.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
            setIsOpen(true);
            setSelectedIndex(-1);
        } else {
            setSuggestions([]);
            setIsOpen(false);
            setSelectedIndex(-1);
        }
    };

    const handleSelect = useCallback((food) => {
        setQuery(food.name);
        onSelectFood(food);
        setIsOpen(false);
        setSelectedIndex(-1);
    }, [onSelectFood]);

    // Global key listener for navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleGlobalKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                handleSelect(suggestions[selectedIndex]);
            } else if (e.key === 'Escape') {
                setIsOpen(false);
                inputRef.current?.blur();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isOpen, suggestions, selectedIndex, handleSelect]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
        onSelectFood(null);
    };

    const getScoreColor = (score) => {
        if (score >= 70) return 'var(--success)';
        if (score >= 40) return 'var(--warning)';
        return 'var(--danger)';
    };

    return (
        <div ref={wrapperRef} style={{
            position: 'relative',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            zIndex: 10
        }}>
            <div
                className="glass-card"
                onClick={() => inputRef.current?.focus()}
                style={{
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.3s ease',
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    cursor: 'text'
                }}>
                <Search size={24} style={{ color: 'var(--primary-green)', flexShrink: 0 }} />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search for any Indian food..."
                    aria-label="Search for food"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1.1rem',
                        width: '100%',
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: '400'
                    }}
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        aria-label="Clear search"
                        style={{
                            background: '#FEE2E2',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FECACA'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FEE2E2'}
                    >
                        <X size={20} style={{ color: 'var(--danger)' }} />
                    </button>
                )}
            </div>

            {isOpen && suggestions.length > 0 && (
                <div
                    ref={listRef}
                    className="glass-card animate-fade-in"
                    role="listbox"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        left: 0,
                        right: 0,
                        maxHeight: '400px',
                        overflowY: 'auto',
                        padding: '0.5rem',
                        zIndex: 50,
                        background: 'white',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    {suggestions.map((food, index) => (
                        <div
                            key={food.id}
                            role="option"
                            onClick={() => handleSelect(food)}
                            style={{
                                padding: '1rem 1.25rem',
                                cursor: 'pointer',
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                marginBottom: index < suggestions.length - 1 ? '0.25rem' : 0,
                                background: index === selectedIndex ? '#F9FAFB' : 'transparent',
                                transform: index === selectedIndex ? 'translateX(4px)' : 'translateX(0)'
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontWeight: '600',
                                    color: 'var(--primary-dark)',
                                    marginBottom: '0.25rem',
                                    fontSize: '1rem'
                                }}>
                                    {food.name}
                                </div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span>{food.calories} cal</span>
                                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                                    <span>{food.servingSize}</span>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <div style={{
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: '8px',
                                    background: food.fitnessScore >= 70 ? '#E6F4EA' : food.fitnessScore >= 40 ? '#FEF3C7' : '#FEE2E2',
                                    border: 'none',
                                    color: getScoreColor(food.fitnessScore),
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    fontFamily: 'Lato, sans-serif'
                                }}>
                                    {food.fitnessScore}
                                </div>
                                <TrendingUp
                                    size={18}
                                    style={{
                                        color: getScoreColor(food.fitnessScore),
                                        opacity: 0.6
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isOpen && query.length > 0 && suggestions.length === 0 && (
                <div
                    className="glass-card animate-fade-in"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        left: 0,
                        right: 0,
                        padding: '2rem',
                        zIndex: 50,
                        background: 'white',
                        border: '1px solid #E5E7EB',
                        textAlign: 'center'
                    }}
                >
                    <p style={{
                        color: 'var(--text-secondary)',
                        marginBottom: '1rem',
                        fontSize: '1rem'
                    }}>
                        No results found for "<strong>{query}</strong>"
                    </p>
                    <button
                        onClick={() => {
                            const subject = encodeURIComponent('Food Request - FitScore India');
                            const body = encodeURIComponent(`Hi,\n\nI would like to request the following food item to be added to the database:\n\nFood Name: ${query}\nDescription: \n\nThank you!`);
                            window.location.href = `mailto:prakashhardik06@gmail.com?subject=${subject}&body=${body}`;
                        }}
                        style={{
                            background: 'var(--primary-green)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '100px',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2d4518';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--primary-green)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        📝 Request this food
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
