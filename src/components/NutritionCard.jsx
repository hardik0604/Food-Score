import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, ThumbsDown, ThumbsUp, Flame, Zap, TrendingUp, Award, Target, ArrowRight, X } from 'lucide-react';
import { foodDatabase } from '../data/foodDatabase';

const NutritionCard = ({ food, onSelectFood }) => {
    const [comparisonFood, setComparisonFood] = useState(null);

    if (!food) return null;

    const getScoreColor = (score) => {
        if (score >= 70) return { primary: '#00ff88', secondary: '#00cc6a', bg: 'rgba(0, 255, 136, 0.15)' };
        if (score >= 40) return { primary: '#ff6b35', secondary: '#ff8c42', bg: 'rgba(255, 107, 53, 0.15)' };
        return { primary: '#ff006e', secondary: '#ff1a7f', bg: 'rgba(255, 0, 110, 0.15)' };
    };

    const getVerdictIcon = (verdict) => {
        if (verdict === 'Good') return <ThumbsUp size={32} style={{ color: '#00ff88' }} />;
        if (verdict === 'Bad') return <ThumbsDown size={32} style={{ color: '#ff006e' }} />;
        return <AlertTriangle size={32} style={{ color: '#ff6b35' }} />;
    };

    const handleAlternativeClick = (altName) => {
        const foundFood = foodDatabase.find(f => {
            const isMatch = f.name.toLowerCase() === altName.toLowerCase();
            return isMatch;
        });

        if (foundFood) {
            setComparisonFood(foundFood);
        } else {
            alert(`Could not find "${altName}" in database`);
        }
    };

    const handleSwitchToAlternative = (altFood) => {
        onSelectFood(altFood);
        setComparisonFood(null);
    };

    const scoreColor = getScoreColor(food.fitnessScore);
    const macroTotal = food.macros.protein + food.macros.carbs + food.macros.fat;

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Hero Section with Score */}
            <div className="glass-card" style={{
                marginBottom: '1.5rem',
                background: `linear-gradient(135deg, ${scoreColor.bg}, rgba(102, 126, 234, 0.1))`,
                border: `1px solid ${scoreColor.primary}40`,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '300px',
                    height: '300px',
                    background: `radial-gradient(circle, ${scoreColor.primary}15 0%, transparent 70%)`,
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <h2 style={{
                                fontSize: '2.5rem',
                                marginBottom: '0.5rem',
                                background: `linear-gradient(135deg, ${scoreColor.primary}, ${scoreColor.secondary})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {food.name}
                            </h2>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                <div className="badge" style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    padding: '0.75rem 1.25rem'
                                }}>
                                    <Flame size={18} style={{ color: '#ff6b35' }} />
                                    {food.calories} cal
                                </div>
                                <div className="badge" style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    fontSize: '1rem',
                                    padding: '0.75rem 1.25rem'
                                }}>
                                    {food.servingSize}
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                background: `conic-gradient(${scoreColor.primary} ${food.fitnessScore * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                boxShadow: `0 0 40px ${scoreColor.primary}60`
                            }}>
                                <div style={{
                                    width: '110px',
                                    height: '110px',
                                    borderRadius: '50%',
                                    background: 'rgba(10, 14, 39, 0.95)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                        fontFamily: 'Poppins, sans-serif',
                                        color: scoreColor.primary,
                                        lineHeight: 1
                                    }}>
                                        {food.fitnessScore}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                                        SCORE
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: scoreColor.bg,
                                borderRadius: '100px',
                                border: `1px solid ${scoreColor.primary}40`
                            }}>
                                {getVerdictIcon(food.verdict)}
                                <span style={{
                                    fontWeight: '700',
                                    color: scoreColor.primary,
                                    fontSize: '1.1rem'
                                }}>
                                    {food.verdict}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Macros Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{
                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(102, 126, 234, 0.05))',
                    border: '1px solid rgba(0, 217, 255, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(0, 217, 255, 0.2)',
                                borderRadius: '12px'
                            }}>
                                <Activity size={24} style={{ color: '#00d9ff' }} />
                            </div>
                            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff' }}>Protein</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#00d9ff', fontFamily: 'Poppins, sans-serif' }}>
                            {food.macros.protein}g
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${(food.macros.protein / macroTotal) * 100}%`,
                            background: 'linear-gradient(90deg, #00d9ff, #667eea)'
                        }} />
                    </div>
                </div>

                <div className="glass-card" style={{
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(245, 87, 108, 0.05))',
                    border: '1px solid rgba(255, 107, 53, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(255, 107, 53, 0.2)',
                                borderRadius: '12px'
                            }}>
                                <Zap size={24} style={{ color: '#ff6b35' }} />
                            </div>
                            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff' }}>Carbs</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#ff6b35', fontFamily: 'Poppins, sans-serif' }}>
                            {food.macros.carbs}g
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${(food.macros.carbs / macroTotal) * 100}%`,
                            background: 'linear-gradient(90deg, #ff6b35, #f5576c)'
                        }} />
                    </div>
                </div>

                <div className="glass-card" style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(118, 75, 162, 0.05))',
                    border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(139, 92, 246, 0.2)',
                                borderRadius: '12px'
                            }}>
                                <Target size={24} style={{ color: '#8b5cf6' }} />
                            </div>
                            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff' }}>Fat</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#8b5cf6', fontFamily: 'Poppins, sans-serif' }}>
                            {food.macros.fat}g
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${(food.macros.fat / macroTotal) * 100}%`,
                            background: 'linear-gradient(90deg, #8b5cf6, #764ba2)'
                        }} />
                    </div>
                </div>
            </div>

            {/* Analysis & Alternatives */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-card">
                    <h3 style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        color: '#ffffff'
                    }}>
                        <TrendingUp size={28} style={{ color: '#00d9ff' }} />
                        Nutritional Analysis
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {food.goodBadReasons.map((reason, idx) => (
                            <li key={idx} style={{
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                borderLeft: `3px solid ${scoreColor.primary}`,
                                color: '#a0aec0',
                                fontSize: '0.95rem'
                            }}>
                                • {reason}
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '0.5rem' }}>Glycemic Load</div>
                        <div className="badge" style={{
                            background: food.glycemicLoad === 'High' || food.glycemicLoad === 'Very High' ? 'rgba(255, 0, 110, 0.2)' : 'rgba(0, 255, 136, 0.2)',
                            color: food.glycemicLoad === 'High' || food.glycemicLoad === 'Very High' ? '#ff006e' : '#00ff88',
                            border: `1px solid ${food.glycemicLoad === 'High' || food.glycemicLoad === 'Very High' ? '#ff006e' : '#00ff88'}40`,
                            fontSize: '1rem',
                            padding: '0.5rem 1rem'
                        }}>
                            {food.glycemicLoad}
                        </div>
                    </div>

                    {food.hiddenJunk.length > 0 && food.hiddenJunk[0] !== "None" && (
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1.25rem',
                            background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.15), rgba(245, 87, 108, 0.1))',
                            border: '2px solid rgba(255, 0, 110, 0.4)',
                            borderRadius: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <AlertTriangle size={24} style={{ color: '#ff006e' }} />
                                <h4 style={{ margin: 0, color: '#ff006e', fontSize: '1.1rem', fontWeight: '700' }}>
                                    Hidden Ingredients
                                </h4>
                            </div>
                            <p style={{ margin: 0, color: '#ffb3d9', fontSize: '0.95rem' }}>
                                {food.hiddenJunk.join(', ')}
                            </p>
                        </div>
                    )}
                </div>

                <div className="glass-card" style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.08), rgba(0, 204, 106, 0.05))',
                    border: '1px solid rgba(0, 255, 136, 0.2)'
                }}>
                    <h3 style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        color: '#00ff88'
                    }}>
                        <Award size={28} style={{ color: '#00ff88' }} />
                        Better Choices
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {food.alternatives.map((alt, idx) => (
                            <button
                                key={idx}
                                style={{
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(0, 255, 136, 0.1)',
                                    border: '1px solid rgba(0, 255, 136, 0.3)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    width: '100%',
                                    textAlign: 'left'
                                }}
                                onClick={() => {
                                    handleAlternativeClick(alt);
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.15)';
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <CheckCircle size={20} style={{ color: '#00ff88', flexShrink: 0 }} />
                                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '1rem', flex: 1 }}>
                                    {alt}
                                </span>
                                <ArrowRight size={18} style={{ color: '#00ff88', opacity: 0.6 }} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison Modal */}
            {comparisonFood && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}
                    onClick={() => setComparisonFood(null)}>
                    <div className="glass-card" style={{
                        maxWidth: '1200px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        position: 'relative'
                    }}
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setComparisonFood(null)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'rgba(255, 0, 110, 0.2)',
                                border: '1px solid rgba(255, 0, 110, 0.4)',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                zIndex: 10
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 0, 110, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 0, 110, 0.2)'}
                        >
                            <X size={24} style={{ color: '#ff006e' }} />
                        </button>

                        <h2 style={{
                            textAlign: 'center',
                            marginBottom: '2rem',
                            fontSize: '2rem',
                            color: '#ffffff'
                        }}>
                            Food Comparison
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {[food, comparisonFood].map((item, index) => {
                                const itemScoreColor = getScoreColor(item.fitnessScore);
                                return (
                                    <div key={index} style={{
                                        background: index === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 255, 136, 0.08)',
                                        border: index === 0 ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid rgba(0, 255, 136, 0.3)',
                                        borderRadius: '16px',
                                        padding: '1.5rem'
                                    }}>
                                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                            <div style={{
                                                fontSize: '0.875rem',
                                                color: '#718096',
                                                marginBottom: '0.5rem',
                                                textTransform: 'uppercase',
                                                fontWeight: '600'
                                            }}>
                                                {index === 0 ? 'Current Choice' : 'Better Alternative'}
                                            </div>
                                            <h3 style={{
                                                fontSize: '1.75rem',
                                                marginBottom: '1rem',
                                                background: `linear-gradient(135deg, ${itemScoreColor.primary}, ${itemScoreColor.secondary})`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text'
                                            }}>
                                                {item.name}
                                            </h3>

                                            <div style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                background: `conic-gradient(${itemScoreColor.primary} ${item.fitnessScore * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto',
                                                boxShadow: `0 0 30px ${itemScoreColor.primary}40`
                                            }}>
                                                <div style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    borderRadius: '50%',
                                                    background: 'rgba(10, 14, 39, 0.95)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <div style={{
                                                        fontSize: '2rem',
                                                        fontWeight: '800',
                                                        fontFamily: 'Poppins, sans-serif',
                                                        color: itemScoreColor.primary,
                                                        lineHeight: 1
                                                    }}>
                                                        {item.fitnessScore}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '0.75rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: '#a0aec0' }}>Calories</span>
                                                <span style={{ color: '#ffffff', fontWeight: '700' }}>{item.calories} cal</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '0.75rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: '#a0aec0' }}>Protein</span>
                                                <span style={{ color: '#00d9ff', fontWeight: '700' }}>{item.macros.protein}g</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '0.75rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: '#a0aec0' }}>Carbs</span>
                                                <span style={{ color: '#ff6b35', fontWeight: '700' }}>{item.macros.carbs}g</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '0.75rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: '#a0aec0' }}>Fat</span>
                                                <span style={{ color: '#8b5cf6', fontWeight: '700' }}>{item.macros.fat}g</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '0.75rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: '#a0aec0' }}>Verdict</span>
                                                <span style={{
                                                    color: itemScoreColor.primary,
                                                    fontWeight: '700',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    {item.verdict}
                                                    {index === 1 && item.fitnessScore > food.fitnessScore && (
                                                        <TrendingUp size={16} style={{ color: '#00ff88' }} />
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {index === 1 && (
                                            <button
                                                onClick={() => handleSwitchToAlternative(item)}
                                                className="btn-primary"
                                                style={{
                                                    width: '100%',
                                                    marginTop: '1.5rem',
                                                    padding: '1rem',
                                                    fontSize: '1rem',
                                                    fontWeight: '700',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                Switch to {item.name}
                                                <ArrowRight size={20} />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {comparisonFood.fitnessScore > food.fitnessScore && (
                            <div style={{
                                marginTop: '2rem',
                                padding: '1.5rem',
                                background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 204, 106, 0.1))',
                                border: '2px solid rgba(0, 255, 136, 0.3)',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <TrendingUp size={32} style={{ color: '#00ff88', marginBottom: '0.5rem' }} />
                                <h4 style={{ color: '#00ff88', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
                                    Better Choice!
                                </h4>
                                <p style={{ color: '#a0aec0', margin: 0 }}>
                                    {comparisonFood.name} has a {comparisonFood.fitnessScore - food.fitnessScore} point higher fitness score
                                    {comparisonFood.calories < food.calories && ` and ${food.calories - comparisonFood.calories} fewer calories`}!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NutritionCard;
