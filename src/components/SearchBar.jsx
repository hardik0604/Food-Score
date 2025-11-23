import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { foodDatabase } from '../data/foodDatabase';

const SearchBar = ({ onSelectFood }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const handleSearch = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.length > 0) {
            const filtered = foodDatabase.filter(food =>
                food.name.toLowerCase().includes(newQuery.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (food) => {
        setQuery(food.name);
        onSelectFood(food);
        setIsOpen(false);
    };

    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
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
            <div className="glass-card" style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.3s ease',
                background: 'white',
                border: '1px solid #E5E7EB'
            }}>
                <Search size={24} style={{ color: 'var(--primary-green)', flexShrink: 0 }} />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search for any Indian food..."
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
                <div className="glass-card animate-fade-in" style={{
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
                }}>
                    {suggestions.map((food, index) => (
                        <div
                            key={food.id}
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
                                background: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#F9FAFB';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
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
        </div>
    );
};

export default SearchBar;
