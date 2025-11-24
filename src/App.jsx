import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import NutritionCard from './components/NutritionCard';
import { Activity, TrendingUp, Zap, Home } from 'lucide-react';

function App() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodDatabase, setFoodDatabase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState(0);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(import.meta.env.BASE_URL + 'api/foods.json');
        if (!response.ok) {
          throw new Error('Failed to fetch food data');
        }
        const data = await response.json();
        setFoodDatabase(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading food data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  const goHome = () => {
    setSelectedFood(null);
    setSearchKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>Loading food database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--danger)'
      }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', background: '#FAFAFA' }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 100,
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}>
        <div
          onClick={goHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            background: 'var(--bg-subtle)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={20} style={{ color: 'var(--primary-green)' }} />
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--primary-dark)',
            letterSpacing: '-0.02em'
          }}>
            FitScore India
          </span>
        </div>


      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {!selectedFood && (
          <header style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
            <div className="animate-fade-in" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'white',
              borderRadius: '100px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              marginBottom: '1.5rem',
              border: '1px solid #E5E7EB'
            }}>
              <Zap size={16} style={{ color: 'var(--accent-terracotta)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                Discover the truth about your food
              </span>
            </div>

            <h1 className="animate-fade-in" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '1rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              Eat Smarter, <span style={{ color: 'var(--primary-green)' }}>Live Better</span>
            </h1>

            <p className="animate-fade-in" style={{
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              fontWeight: '400',
              lineHeight: 1.6
            }}>
              Instantly analyze Indian foods for their nutritional value, fitness score, and healthier alternatives.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '2rem',
              flexWrap: 'wrap'
            }}>
              <div className="badge badge-success">
                <TrendingUp size={16} />
                {foodDatabase.length}+ Foods Database
              </div>
            </div>
          </header>
        )}

        <div style={{ marginTop: selectedFood ? '2rem' : '0' }}>
          <SearchBar key={searchKey} onSelectFood={setSelectedFood} foodDatabase={foodDatabase} />
        </div>

        {selectedFood ? (
          <div style={{ marginTop: '2rem' }}>
            <NutritionCard food={selectedFood} onSelectFood={setSelectedFood} foodDatabase={foodDatabase} />
          </div>
        ) : (
          <div className="animate-fade-in" style={{
            marginTop: '4rem',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.5rem'
            }}>
              Popular Searches
            </p>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {['Butter Chicken', 'Samosa', 'Idli', 'Biryani', 'Dosa', 'Paneer Tikka'].map(item => (
                <button
                  key={item}
                  style={{
                    background: 'white',
                    color: 'var(--text-secondary)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    padding: '0.6rem 1.25rem',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-green)';
                    e.currentTarget.style.color = 'var(--primary-dark)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={() => {
                    const food = foodDatabase.find(f => f.name.toLowerCase().includes(item.toLowerCase()));
                    if (food) setSelectedFood(food);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <footer style={{
          marginTop: '6rem',
          paddingTop: '2rem',
          borderTop: '1px solid #E5E7EB',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          paddingBottom: '2rem'
        }}>
          <p>Nutritional data based on standard restaurant servings • For informational purposes only</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

