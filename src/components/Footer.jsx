//footer.jsx
import { useState, useEffect } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  // Add media queries for responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 1024px) {
        .footer-newsletter-title {
          font-size: 2rem !important;
        }
        .footer-newsletter-subtitle {
          font-size: 1.1rem !important;
        }
      }
      
      @media (max-width: 768px) {
        .footer-newsletter-title {
          font-size: 1.8rem !important;
        }
        .footer-newsletter-content {
          padding: 0 1rem !important;
        }
        .footer-input-container {
          flex-direction: column !important;
          background: transparent !important;
          backdrop-filter: none !important;
          border: none !important;
          gap: 1rem !important;
        }
        .footer-email-input {
          background: rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        .footer-submit-btn {
          width: 100% !important;
        }
        .footer-bottom-content {
          flex-direction: column !important;
          gap: 1.5rem !important;
          text-align: center !important;
        }
        .footer-nav {
          flex-direction: column !important;
          gap: 1rem !important;
        }
      }
      
      @media (max-width: 480px) {
        .footer-newsletter-title {
          font-size: 1.5rem !important;
        }
        .footer-newsletter-subtitle {
          font-size: 1rem !important;
        }
        .footer-newsletter-section {
          padding: 3rem 0 2rem 0 !important;
        }
        .footer-bottom-section {
          padding: 1.5rem 0 !important;
        }
        .footer-brand-name {
          font-size: 1.3rem !important;
        }
        .footer-link {
          font-size: 0.9rem !important;
        }
        .footer-copyright {
          font-size: 0.85rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer style={footerStyle}>
      {/* Newsletter Section */}
      <div style={newsletterSectionStyle} className="footer-newsletter-section">
        <div className="container" style={containerStyle}>
          <div style={newsletterContentStyle} className="footer-newsletter-content">
            <h2 style={newsletterTitleStyle} className="footer-newsletter-title">Get in Touch with Us</h2>
            <p style={newsletterSubtitleStyle} className="footer-newsletter-subtitle">
              Subscribe now for exclusive<br />
              property insights and deals!
            </p>
            
            <form onSubmit={handleSubmit} style={subscriptionFormStyle}>
              <div style={inputContainerStyle} className="footer-input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={emailInputStyle}
                  className="footer-email-input"
                />
                <button type="submit" style={submitButtonStyle} className="footer-submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div style={footerBottomStyle} className="footer-bottom-section">
        <div className="container" style={containerStyle}>
          <div style={footerBottomContentStyle} className="footer-bottom-content">
            {/* Left side - Logo and brand */}
            <div style={brandSectionStyle}>
              <div style={logoStyle}>
                <span style={logoIconStyle}>🏠</span>
                <span style={brandNameStyle} className="footer-brand-name">PropBot</span>
              </div>
            </div>

            {/* Center - Navigation Links */}
            <div style={navSectionStyle} className="footer-nav">
              <a href="/for-sale" style={footerLinkStyle} className="footer-link">For Sale</a>
              <a href="/rentals" style={footerLinkStyle} className="footer-link">Rentals</a>
              <a href="/new-projects" style={footerLinkStyle} className="footer-link">New Projects</a>
              <a href="/property-news" style={footerLinkStyle} className="footer-link">Property News</a>
            </div>

            {/* Right side - Copyright */}
            <div style={copyrightSectionStyle}>
              <p style={copyrightTextStyle} className="footer-copyright">©2025 Propbot. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Styles (keep the same as before)
const footerStyle = {
  backgroundColor: '#4a6fa5',
  background: 'linear-gradient(135deg, #4a6fa5 0%, #5a7fb8 50%, #6b8fca 100%)',
  marginTop: 'auto',
  width: '100%',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const newsletterSectionStyle = {
  padding: '4rem 0 3rem 0',
  textAlign: 'center',
};

const newsletterContentStyle = {
  maxWidth: '600px',
  margin: '0 auto',
};

const newsletterTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '1rem',
  lineHeight: '1.2',
};

const newsletterSubtitleStyle = {
  fontSize: '1.2rem',
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '2.5rem',
  lineHeight: '1.5',
};

const subscriptionFormStyle = {
  width: '100%',
};

const inputContainerStyle = {
  display: 'flex',
  maxWidth: '500px',
  margin: '0 auto',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '50px',
  padding: '4px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

const emailInputStyle = {
  flex: 1,
  padding: '12px 20px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  borderRadius: '50px',
};

const submitButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#2c4875',
  color: 'white',
  border: 'none',
  borderRadius: '50px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minWidth: '100px',
};

const footerBottomStyle = {
  padding: '2rem 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
};

const footerBottomContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
};

const brandSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const logoIconStyle = {
  fontSize: '24px',
  color: 'white',
};

const brandNameStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'white',
};

const navSectionStyle = {
  display: 'flex',
  gap: '2rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

const footerLinkStyle = {
  color: 'rgba(255, 255, 255, 0.9)',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'color 0.3s ease',
  cursor: 'pointer',
};

const copyrightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

const copyrightTextStyle = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.95rem',
  margin: 0,
};

export default Footer;