import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on login and signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav style={navStyle}>
      <div style={navContainerStyle} className="nav-container">
        <div style={navContentStyle}>
          {/* Logo */}
          <Link to="/" style={logoStyle} onClick={handleLinkClick}>
            <span style={logoIconStyle}>🏠</span>
            <span style={logoTextStyle} className="logo-text">PropBot</span>
          </Link>
          
          {/* Navigation Menu */}
          <div 
            style={menuStyle} 
            className={`nav-menu ${isMenuOpen ? 'open' : ''}`}
          >
            <Link to="/" style={navLinkStyle} className="nav-link" onClick={handleLinkClick}>Home</Link>
            <Link to="/properties" style={navLinkStyle} className="nav-link" onClick={handleLinkClick}>Buy</Link>
            <Link to="/rent" style={navLinkStyle} className="nav-link" onClick={handleLinkClick}>Rent</Link>
            <Link to="/sell" style={navLinkStyle} className="nav-link" onClick={handleLinkClick}>Sell</Link>
            <Link to="/about" style={navLinkStyle} className="nav-link" onClick={handleLinkClick}>About Us</Link>
            <Link to="/contact" style={navLinkStyle} className="nav-link" onClick={handleLinkClick}>Contact Us</Link>
          </div>
          
          {/* Right side - Login/Logout based on user state */}
          <div style={rightSectionStyle}>
            {currentUser ? (
              <div style={userSectionStyle}>
                <span style={userWelcomeStyle} className="user-welcome">
                  Welcome, {currentUser.displayName || currentUser.email}
                </span>
                <button 
                  onClick={handleLogout} 
                  style={logoutButtonStyle}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLoginClick}
                style={loginLinkStyle} 
                className="login-link"
              >
                Login / Register <span style={arrowStyle}>→</span>
              </button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            style={hamburgerStyle}
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span style={hamburgerLineStyle}></span>
            <span style={hamburgerLineStyle}></span>
            <span style={hamburgerLineStyle}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Styles
const navStyle = {
  backgroundColor: '#ffffff',
  padding: '12px 0',
  borderBottom: '1px solid #e5e5e5',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const navContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const navContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
};

const logoIconStyle = {
  fontSize: '24px',
};

const logoTextStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const menuStyle = {
  display: 'flex',
  gap: '30px',
  alignItems: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
};

const navLinkStyle = {
  color: '#666',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  padding: '8px 0',
  transition: 'color 0.3s',
};

const rightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const userSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
};

const userWelcomeStyle = {
  fontSize: '14px',
  color: '#666',
  maxWidth: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const loginLinkStyle = {
  padding: '8px 20px',
  backgroundColor: '#2c5aa0',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'background-color 0.3s',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
};

const logoutButtonStyle = {
  padding: '8px 20px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const arrowStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
};

const hamburgerStyle = {
  display: 'none',
  flexDirection: 'column',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  gap: '3px',
  padding: '8px',
};

const hamburgerLineStyle = {
  width: '20px',
  height: '2px',
  backgroundColor: '#333',
  transition: 'all 0.3s',
};

export default Navbar;