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
        if (score >= 70) return '#00ff88';
        if (score >= 40) return '#ff6b35';
        return '#ff006e';
    };

    return (
        <div ref={wrapperRef} style={{
            position: 'relative',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            zIndex: 10
        }}>
            <div className="glass-card" style={{
                padding: '0.75rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.3s ease'
            }}>
                <Search size={24} style={{ color: '#667eea', flexShrink: 0 }} />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search for any Indian food..."
                    style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        width: '100%',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500'
                    }}
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        style={{
                            background: 'rgba(255, 0, 110, 0.15)',
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
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 0, 110, 0.25)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 0, 110, 0.15)'}
                    >
                        <X size={20} style={{ color: '#ff006e' }} />
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
                    zIndex: 50
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
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
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
                                    color: '#ffffff',
                                    marginBottom: '0.25rem',
                                    fontSize: '1rem'
                                }}>
                                    {food.name}
                                </div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: '#a0aec0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span>{food.calories} cal</span>
                                    <span style={{ color: '#718096' }}>•</span>
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
                                    background: `${getScoreColor(food.fitnessScore)}15`,
                                    border: `1px solid ${getScoreColor(food.fitnessScore)}40`,
                                    color: getScoreColor(food.fitnessScore),
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    fontFamily: 'Poppins, sans-serif'
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
