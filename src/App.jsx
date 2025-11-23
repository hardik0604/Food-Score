import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import NutritionCard from './components/NutritionCard';
import { Activity, TrendingUp, Zap } from 'lucide-react';

function App() {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Activity size={48} style={{ color: '#00ff88' }} />
          <Zap size={36} style={{ color: '#00d9ff' }} />
        </div>
        <h1 className="animate-fade-in">FitScore India</h1>
        <p className="animate-fade-in" style={{
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '1.2rem',
          color: '#a0aec0',
          fontWeight: '500'
        }}>
          Discover the nutritional truth about Indian foods. Make informed choices for a healthier you.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <div className="badge badge-success">
            <TrendingUp size={16} />
            200+ Foods
          </div>
          <div className="badge" style={{
            background: 'rgba(0, 217, 255, 0.15)',
            color: '#00d9ff',
            border: '1px solid rgba(0, 217, 255, 0.3)'
          }}>
            <Activity size={16} />
            Fitness Scores
          </div>
        </div>
      </header>

      <SearchBar onSelectFood={setSelectedFood} />

      {selectedFood ? (
        <NutritionCard food={selectedFood} onSelectFood={setSelectedFood} />
      ) : (
        <div className="glass-card animate-fade-in" style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Activity size={64} style={{ color: '#667eea', opacity: 0.5, marginBottom: '1.5rem' }} />
          <h3 style={{ marginBottom: '1rem', color: '#ffffff' }}>Search for any Indian food</h3>
          <p style={{ marginBottom: '2rem', color: '#a0aec0' }}>
            Get instant nutrition facts, fitness scores, and healthier alternatives
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['Butter Chicken', 'Samosa', 'Idli', 'Biryani'].map(item => (
              <button
                key={item}
                className="badge"
                style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  padding: '0.75rem 1.25rem'
                }}
                onClick={() => {
                  // This would trigger search - for now just visual
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <footer style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        color: '#718096',
        fontSize: '0.9rem'
      }}>
        <p>Nutritional data based on standard restaurant servings • For informational purposes only</p>
      </footer>
    </div>
  );
}

export default App;

