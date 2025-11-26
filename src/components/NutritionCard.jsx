import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, ThumbsDown, ThumbsUp, Flame, Zap, TrendingUp, Award, Target, ArrowRight, X } from 'lucide-react';

const NutritionCard = ({ food, onSelectFood, foodDatabase }) => {
    const [comparisonFood, setComparisonFood] = useState(null);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setComparisonFood(null);
            }
        };
        if (comparisonFood) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => document.removeEventListener('keydown', handleEsc);
    }, [comparisonFood]);

    if (!food) return null;

    const getScoreColor = (score) => {
        if (score >= 70) return { primary: 'var(--success)', bg: '#E6F4EA', text: 'var(--success)' };
        if (score >= 40) return { primary: 'var(--warning)', bg: '#FEF3C7', text: 'var(--warning)' };
        return { primary: 'var(--danger)', bg: '#FEE2E2', text: 'var(--danger)' };
    };

    const getVerdictIcon = (verdict) => {
        if (verdict === 'Good') return <ThumbsUp size={32} style={{ color: 'var(--success)' }} />;
        if (verdict === 'Bad') return <ThumbsDown size={32} style={{ color: 'var(--danger)' }} />;
        return <AlertTriangle size={32} style={{ color: 'var(--warning)' }} />;
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
                marginBottom: '2rem',
                background: 'white',
                border: '1px solid rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <h2 style={{
                            fontSize: '3rem',
                            marginBottom: '0.5rem',
                            color: 'var(--primary-dark)',
                            lineHeight: 1.1
                        }}>
                            {food.name}
                        </h2>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                            <div className="badge" style={{
                                background: 'var(--bg-subtle)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                padding: '0.75rem 1.25rem'
                            }}>
                                <Flame size={18} style={{ color: 'var(--warning)' }} />
                                {food.calories} cal
                            </div>
                            <div className="badge" style={{
                                background: 'var(--bg-subtle)',
                                color: 'var(--text-primary)',
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
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            background: `conic-gradient(${scoreColor.primary} ${food.fitnessScore * 3.6}deg, #F3F4F6 0deg)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <div style={{
                                width: '115px',
                                height: '115px',
                                borderRadius: '50%',
                                background: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '800',
                                    fontFamily: 'Lato, sans-serif',
                                    color: scoreColor.text,
                                    lineHeight: 1
                                }}>
                                    {food.fitnessScore}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                                    SCORE
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            background: scoreColor.bg,
                            borderRadius: '100px',
                        }}>
                            {getVerdictIcon(food.verdict)}
                            <span style={{
                                fontWeight: '700',
                                color: scoreColor.text,
                                fontSize: '1.25rem'
                            }}>
                                {food.verdict}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Macros Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                background: '#E0F2FE',
                                borderRadius: '12px'
                            }}>
                                <Activity size={24} style={{ color: '#0284C7' }} />
                            </div>
                            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Protein</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#0284C7', fontFamily: 'Playfair Display, serif' }}>
                            {food.macros.protein}g
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${(food.macros.protein / macroTotal) * 100}%`,
                            background: '#0284C7'
                        }} />
                    </div>
                </div>

                <div className="glass-card" style={{ background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                background: '#FEF3C7',
                                borderRadius: '12px'
                            }}>
                                <Zap size={24} style={{ color: '#D97706' }} />
                            </div>
                            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Carbs</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#D97706', fontFamily: 'Playfair Display, serif' }}>
                            {food.macros.carbs}g
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${(food.macros.carbs / macroTotal) * 100}%`,
                            background: '#D97706'
                        }} />
                    </div>
                </div>

                <div className="glass-card" style={{ background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                background: '#F3E8FF',
                                borderRadius: '12px'
                            }}>
                                <Target size={24} style={{ color: '#9333EA' }} />
                            </div>
                            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>Fat</span>
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#9333EA', fontFamily: 'Playfair Display, serif' }}>
                            {food.macros.fat}g
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${(food.macros.fat / macroTotal) * 100}%`,
                            background: '#9333EA'
                        }} />
                    </div>
                </div>
            </div>

            {/* Analysis & Alternatives */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="glass-card">
                    <h3 style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        color: 'var(--primary-dark)'
                    }}>
                        <TrendingUp size={28} style={{ color: 'var(--primary-green)' }} />
                        Nutritional Analysis
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {food.goodBadReasons.map((reason, idx) => (
                            <li key={idx} style={{
                                padding: '1rem',
                                marginBottom: '0.75rem',
                                background: 'var(--bg-subtle)',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${scoreColor.primary}`,
                                color: 'var(--text-secondary)',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}>
                                {reason}
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Glycemic Load</div>
                        <div className="badge" style={{
                            background: food.glycemicLoad === 'High' || food.glycemicLoad === 'Very High' ? '#FEE2E2' : '#E6F4EA',
                            color: food.glycemicLoad === 'High' || food.glycemicLoad === 'Very High' ? 'var(--danger)' : 'var(--success)',
                            border: 'none',
                            fontSize: '1.1rem',
                            padding: '0.5rem 1rem'
                        }}>
                            {food.glycemicLoad}
                        </div>
                    </div>

                    {food.hiddenJunk.length > 0 && food.hiddenJunk[0] !== "None" && (
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1.5rem',
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <AlertTriangle size={24} style={{ color: 'var(--danger)' }} />
                                <h4 style={{ margin: 0, color: 'var(--danger)', fontSize: '1.1rem', fontWeight: '700' }}>
                                    Hidden Ingredients
                                </h4>
                            </div>
                            <p style={{ margin: 0, color: '#991B1B', fontSize: '1rem' }}>
                                {food.hiddenJunk.join(', ')}
                            </p>
                        </div>
                    )}
                </div>

                <div className="glass-card" style={{ background: '#F0FDF4', borderColor: '#DCFCE7' }}>
                    <h3 style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        color: 'var(--primary-green)'
                    }}>
                        <Award size={28} style={{ color: 'var(--primary-green)' }} />
                        Better Choices
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {food.alternatives.map((alt, idx) => (
                            <button
                                key={idx}
                                style={{
                                    padding: '1.25rem',
                                    background: 'white',
                                    border: '1px solid #BBF7D0',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    width: '100%',
                                    textAlign: 'left',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onClick={() => {
                                    handleAlternativeClick(alt);
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                                }}
                            >
                                <CheckCircle size={24} style={{ color: 'var(--primary-green)', flexShrink: 0 }} />
                                <span style={{ color: 'var(--primary-dark)', fontWeight: '600', fontSize: '1.1rem', flex: 1 }}>
                                    {alt}
                                </span>
                                <ArrowRight size={20} style={{ color: 'var(--primary-green)', opacity: 0.6 }} />
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
                    background: 'rgba(45, 49, 66, 0.8)',
                    backdropFilter: 'blur(8px)',
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
                        position: 'relative',
                        background: 'var(--bg-main)'
                    }}
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setComparisonFood(null)}
                            aria-label="Close comparison"
                            autoFocus
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: '#FEE2E2',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                zIndex: 10
                            }}
                        >
                            <X size={24} style={{ color: 'var(--danger)' }} />
                        </button>

                        <h2 style={{
                            textAlign: 'center',
                            marginBottom: '3rem',
                            fontSize: '2.5rem',
                            color: 'var(--primary-dark)'
                        }}>
                            Food Comparison
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {[food, comparisonFood].map((item, index) => {
                                const itemScoreColor = getScoreColor(item.fitnessScore);
                                return (
                                    <div key={index} style={{
                                        background: 'white',
                                        border: index === 0 ? '2px solid #E5E7EB' : '2px solid var(--primary-green)',
                                        borderRadius: '16px',
                                        padding: '2rem',
                                        boxShadow: 'var(--shadow-md)'
                                    }}>
                                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                            <div style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-muted)',
                                                marginBottom: '0.5rem',
                                                textTransform: 'uppercase',
                                                fontWeight: '700',
                                                letterSpacing: '0.05em'
                                            }}>
                                                {index === 0 ? 'Current Choice' : 'Better Alternative'}
                                            </div>
                                            <h3 style={{
                                                fontSize: '2rem',
                                                marginBottom: '1.5rem',
                                                color: 'var(--primary-dark)'
                                            }}>
                                                {item.name}
                                            </h3>

                                            <div style={{
                                                width: '120px',
                                                height: '120px',
                                                borderRadius: '50%',
                                                background: `conic-gradient(${itemScoreColor.primary} ${item.fitnessScore * 3.6}deg, #F3F4F6 0deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto',
                                            }}>
                                                <div style={{
                                                    width: '95px',
                                                    height: '95px',
                                                    borderRadius: '50%',
                                                    background: 'white',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                                                }}>
                                                    <div style={{
                                                        fontSize: '2.25rem',
                                                        fontWeight: '800',
                                                        fontFamily: 'Lato, sans-serif',
                                                        color: itemScoreColor.text,
                                                        lineHeight: 1
                                                    }}>
                                                        {item.fitnessScore}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                background: '#F9FAFB',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Calories</span>
                                                <span style={{ color: 'var(--primary-dark)', fontWeight: '700' }}>{item.calories} cal</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                background: '#F9FAFB',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Protein</span>
                                                <span style={{ color: '#0284C7', fontWeight: '700' }}>{item.macros.protein}g</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                background: '#F9FAFB',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Carbs</span>
                                                <span style={{ color: '#D97706', fontWeight: '700' }}>{item.macros.carbs}g</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                background: '#F9FAFB',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Fat</span>
                                                <span style={{ color: '#9333EA', fontWeight: '700' }}>{item.macros.fat}g</span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                background: '#F9FAFB',
                                                borderRadius: '8px'
                                            }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>Verdict</span>
                                                <span style={{
                                                    color: itemScoreColor.text,
                                                    fontWeight: '700',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    {item.verdict}
                                                    {index === 1 && item.fitnessScore > food.fitnessScore && (
                                                        <TrendingUp size={16} style={{ color: 'var(--success)' }} />
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
                                                    marginTop: '2rem',
                                                    padding: '1.25rem',
                                                    fontSize: '1.1rem',
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
                                marginTop: '3rem',
                                padding: '2rem',
                                background: '#F0FDF4',
                                border: '2px solid #DCFCE7',
                                borderRadius: '16px',
                                textAlign: 'center'
                            }}>
                                <TrendingUp size={40} style={{ color: 'var(--success)', marginBottom: '1rem' }} />
                                <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                                    Better Choice!
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.1rem' }}>
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
