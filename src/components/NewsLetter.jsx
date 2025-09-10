//NewsLetter.jsx
import { useState, useEffect } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add media queries for responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .newsletter-content {
          flex-direction: column !important;
          text-align: center !important;
          gap: 1.5rem !important;
        }
        .newsletter-text {
          min-width: auto !important;
        }
        .newsletter-form {
          min-width: auto !important;
          width: 100% !important;
          max-width: 400px !important;
        }
      }
      
      @media (max-width: 480px) {
        .newsletter-title {
          font-size: 1.3rem !important;
        }
        .newsletter-desc {
          font-size: 0.9rem !important;
        }
        .newsletter-input {
          min-width: auto !important;
        }
        .newsletter-form {
          flex-direction: column !important;
          gap: 0.75rem !important;
        }
        .newsletter-btn {
          width: 100% !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://68b826bcb715405043274639.mockapi.io/api/newsletter/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        setMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div style={newsletterStyle}>
      <div className="container">
        <div style={newsletterContentStyle} className="newsletter-content">
          <div style={newsletterTextStyle} className="newsletter-text">
            <h3 style={newsletterTitleStyle} className="newsletter-title">Subscribe to Our Newsletter</h3>
            <p style={newsletterDescStyle} className="newsletter-desc">
              Get the latest updates on new properties and exclusive offers.
            </p>
            {message && <p style={messageStyle}>{message}</p>}
          </div>
          
          <form onSubmit={handleSubmit} style={newsletterFormStyle} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={newsletterInputStyle}
              className="newsletter-input"
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              style={newsletterButtonStyle}
              className="newsletter-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles (keep the same as before)
const newsletterStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '2rem 0',
};

const newsletterContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
};

const newsletterTextStyle = {
  flex: '1',
  minWidth: '300px',
};

const newsletterTitleStyle = {
  marginBottom: '0.5rem',
  fontSize: '1.5rem',
};

const newsletterDescStyle = {
  opacity: 0.9,
};

const messageStyle = {
  marginTop: '0.5rem',
  fontWeight: 'bold',
};

const newsletterFormStyle = {
  display: 'flex',
  gap: '0.5rem',
  flex: '1',
  minWidth: '300px',
};

const newsletterInputStyle = {
  flex: '1',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  minWidth: '200px',
};

const newsletterButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#0056b3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

export default Newsletter;