import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Get the page user was trying to access, or default to home
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
useEffect(() => {
  if (currentUser) {
    navigate('/', { replace: true }); // after signup, go home
  }
}, [currentUser, navigate]);

  // Add media queries for responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .signup-main-content {
          flex-direction: column !important;
        }
        .signup-form-section {
          padding: 20px !important;
          order: 2;
        }
        .signup-form-container {
          max-width: 100% !important;
        }
        .signup-title {
          font-size: 24px !important;
          margin-bottom: 20px !important;
        }
        .signup-image-section {
          padding: 20px !important;
          order: 1;
          height: 300px !important;
          display: flex !important;
        }
        .signup-image-container {
          height: 100% !important;
        }
        .signup-input {
          font-size: 16px !important; /* Prevents zoom on iOS */
        }
      }
      
      @media (max-width: 480px) {
        .signup-form-section {
          padding: 15px !important;
        }
        .signup-title {
          font-size: 22px !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update profile with display name
      if (formData.name) {
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
      }
      
      // Navigation will happen automatically via useEffect when currentUser changes
    } catch (error) {
      let errorMessage = 'Failed to create account. ';
      
      // Provide more specific error messages
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage += 'Password is too weak.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage += 'Account creation is currently disabled.';
          break;
        default:
          errorMessage += error.message;
      }
      
      setError(errorMessage);
    }
    
    setLoading(false);
  };


 const handleBackToHomepage = () => {
    // Navigate to home without authentication requirement
    navigate('/', { state: { bypassAuth: true } });
  };
  const handleAboutUs = () => {
    navigate('/about', { replace: true });
  };

  // Don't render if user is already logged in
  if (currentUser) {
    return null;
  }

  return (
    <div style={containerStyle}>
      {/* Header with Back to Homepage and About Us buttons */}
      <div style={headerStyle}>
        <div style={headerContainerStyle}>
          <button 
            onClick={handleBackToHomepage}
            style={backButtonStyle}
            className="signup-header-btn"
          >
            ← Back to Homepage
          </button>
          
          {/* Logo in the center */}
          <div style={logoStyle}>
            <span style={logoIconStyle}>🏠</span>
            <span style={logoTextStyle}>PropBot</span>
          </div>
          
          <button 
            onClick={handleAboutUs}
            style={aboutButtonStyle}
            className="signup-header-btn"
          >
            About Us
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle} className="signup-main-content">
        {/* Left Side - Form */}
        <div style={formSectionStyle} className="signup-form-section">
          <div style={formContainerStyle} className="signup-form-container">
            <h1 style={titleStyle} className="signup-title">Create new account</h1>
            
            {error && <div style={errorStyle}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={formGroupStyle}>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  className="signup-input"
                  placeholder="Enter Your Full Name"
                  disabled={loading}
                />
              </div>
              
              <div style={formGroupStyle}>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  className="signup-input"
                  placeholder="Enter Your Email Id"
                  disabled={loading}
                />
              </div>
              
              <div style={formGroupStyle}>
                <label htmlFor="password" style={labelStyle}>Password</label>
                <div style={inputContainerStyle}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    className="signup-input"
                    placeholder="Enter Your Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={eyeButtonStyle}
                  >
                    {showPassword ? '👁' : '👁'}
                  </button>
                </div>
              </div>
              
              <div style={formGroupStyle}>
                <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
                <div style={inputContainerStyle}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    className="signup-input"
                    placeholder="Confirm Your Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={eyeButtonStyle}
                  >
                    {showConfirmPassword ? '👁' : '👁'}
                  </button>
                </div>
              </div>
              
              <div style={dividerStyle}></div>
              
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  ...createAccountButtonStyle,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <p style={loginLinkStyle}>
              Already have an account? <Link to="/login" style={linkStyle}>Log in</Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div style={imageSectionStyle} className="signup-image-section">
          <div style={imageContainerStyle} className="signup-image-container">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80" 
              alt="Modern house at dusk" 
              style={houseImageStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const headerStyle = {
  backgroundColor: 'white',
  padding: '1rem 0',
  borderBottom: '1px solid #e5e5e5',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const headerContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const backButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: 'transparent',
  color: '#4a6fa5',
  border: '1px solid #4a6fa5',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const aboutButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#2c5aa0',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const logoIconStyle = {
  fontSize: '24px',
};

const logoTextStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const mainContentStyle = {
  display: 'flex',
  minHeight: 'calc(100vh - 80px)',
};

const formSectionStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  backgroundColor: '#ffffff',
};

const formContainerStyle = {
  width: '100%',
  maxWidth: '450px',
};

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '30px',
  textAlign: 'center',
};

const formStyle = {
  marginBottom: '24px',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#333',
};

const inputContainerStyle = {
  position: 'relative',
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '16px',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
};

const eyeButtonStyle = {
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  color: '#999',
  padding: '0',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const dividerStyle = {
  height: '1px',
  backgroundColor: '#e5e5e5',
  margin: '24px 0',
};

const createAccountButtonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#2c5aa0',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginBottom: '20px',
};

const errorStyle = {
  color: '#dc3545',
  backgroundColor: '#f8d7da',
  padding: '12px 16px',
  borderRadius: '6px',
  marginBottom: '20px',
  border: '1px solid #f5c6cb',
  fontSize: '14px',
};

const loginLinkStyle = {
  textAlign: 'center',
  color: '#666',
  fontSize: '14px',
};

const linkStyle = {
  color: '#2c5aa0',
  textDecoration: 'none',
  fontWeight: '600',
};

const imageSectionStyle = {
  flex: 1,
  backgroundColor: '#f8f9fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
};

const imageContainerStyle = {
  width: '100%',
  height: '80%',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
};

const houseImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

export default Signup;