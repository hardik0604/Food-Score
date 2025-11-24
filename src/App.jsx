import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import NutritionCard from './components/NutritionCard';
import { Activity, TrendingUp, Zap } from 'lucide-react';

function App() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodDatabase, setFoodDatabase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div style={{ minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Activity size={40} style={{ color: 'var(--primary-green)' }} />
          <div style={{ width: '1px', height: '24px', background: '#E5E7EB' }}></div>
          <Zap size={32} style={{ color: 'var(--accent-terracotta)' }} />
        </div>
        <h1 className="animate-fade-in">FitScore India</h1>
        <p className="animate-fade-in" style={{
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          fontWeight: '400'
        }}>
          Discover the nutritional truth about Indian foods. Make informed choices for a healthier you.
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
            {foodDatabase.length}+ Foods
          </div>
          <div className="badge" style={{
            background: 'var(--bg-subtle)',
            color: 'var(--primary-dark)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <Activity size={16} />
            Fitness Scores
          </div>
        </div>
      </header>

      <SearchBar onSelectFood={setSelectedFood} foodDatabase={foodDatabase} />

      {selectedFood ? (
        <NutritionCard food={selectedFood} onSelectFood={setSelectedFood} foodDatabase={foodDatabase} />
      ) : (
        <div className="glass-card animate-fade-in" style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          background: 'white',
          border: 'none'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'var(--bg-subtle)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Activity size={32} style={{ color: 'var(--primary-green)' }} />
          </div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>Search for any Indian food</h3>
          <p style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
            Get instant nutrition facts, fitness scores, and healthier alternatives
          </p>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['Butter Chicken', 'Samosa', 'Idli', 'Biryani'].map(item => (
              <button
                key={item}
                className="badge"
                style={{
                  background: 'white',
                  color: 'var(--text-secondary)',
                  border: '1px solid #E5E7EB',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  padding: '0.75rem 1.25rem',
                  fontWeight: '500',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                onClick={() => {
                  // Find the food item in the database
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
        fontSize: '0.9rem'
      }}>
        <p>Nutritional data based on standard restaurant servings • For informational purposes only</p>
      </footer>
    </div>
  );
}

export default App;

