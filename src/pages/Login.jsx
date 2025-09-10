import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Get the page user was trying to access, or default to home
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  // Add media queries for responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 1024px) {
        .login-main-container {
          grid-template-columns: 1fr !important;
        }
        .login-image-section {
          display: none !important;
        }
        .login-form-section {
          min-height: 100vh !important;
        }
      }
      
      @media (max-width: 768px) {
        .login-form-container {
          padding: 2rem 1.5rem !important;
          max-width: 400px !important;
        }
        .login-title {
          font-size: 1.8rem !important;
        }
        .login-social-buttons {
          flex-direction: row !important;
          justify-content: center !important;
          gap: 1rem !important;
        }
        .login-social-button {
          width: 50px !important;
          height: 50px !important;
        }
      }
      
      @media (max-width: 480px) {
        .login-form-container {
          padding: 1.5rem 1rem !important;
          max-width: 100% !important;
          margin: 0 1rem !important;
        }
        .login-title {
          font-size: 1.6rem !important;
        }
        .login-input {
          font-size: 16px !important; /* Prevents zoom on iOS */
        }
        .login-header-btn {
          padding: 0.4rem 0.8rem !important;
          font-size: 0.8rem !important;
        }
        .login-social-buttons {
          gap: 0.8rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRememberMe(checked);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      // Navigation will happen automatically via useEffect when currentUser changes
    } catch (error) {
      let errorMessage = 'Failed to log in. ';
      
      // Provide more specific error messages
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage += 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage += 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage += 'Too many failed attempts. Try again later.';
          break;
        default:
          errorMessage += error.message;
      }
      
      setError(errorMessage);
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError('');
      setLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError('Failed to sign in with Google: ' + error.message);
    }
    setLoading(false);
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      setError('');
      setLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError('Failed to sign in with Facebook: ' + error.message);
    }
    setLoading(false);
  };

  const handleiOSDownload = () => {
    // Replace with your actual iOS app store link
    window.open('https://apps.apple.com/your-app-link', '_blank');
  };

    const handleBackToHomepage = () => {
    // Navigate to home without authentication requirement
    navigate('/', { state: { bypassAuth: true } });
  };

  const handleAboutUs = () => {
    navigate('/about');
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
            className="login-header-btn"
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
            className="login-header-btn"
          >
            About Us
          </button>
        </div>
      </div>

      <div style={mainContainerStyle} className="login-main-container">
        {/* Left Side - Form */}
        <div style={formSectionStyle} className="login-form-section">
          <div style={formContainerStyle} className="login-form-container">
            <h1 style={titleStyle} className="login-title">Log In</h1>
            
            {error && <div style={errorStyle}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={formStyle}>
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
                  className="login-input"
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
                    className="login-input"
                    placeholder="Enter Your Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={eyeButtonStyle}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div style={checkboxRowStyle}>
                <div style={checkboxGroupStyle}>
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={handleChange}
                    style={checkboxStyle}
                  />
                  <label htmlFor="remember" style={checkboxLabelStyle}>Remember me</label>
                </div>
                <Link to="/forgot-password" style={forgotPasswordStyle}>
                  Forgot Password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  ...loginButtonStyle,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>
            
            {/* Divider */}
            <div style={dividerStyle}>
              <span style={dividerTextStyle}>OR CONTINUE WITH</span>
            </div>

            {/* Social Login Buttons - Rounded with icons */}
            <div style={socialButtonsStyle} className="login-social-buttons">
              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                style={roundSocialButtonStyle}
                className="login-social-button"
                title="Sign in with Google"
              >
                <svg style={roundSocialIconStyle} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              
              <button 
                onClick={handleFacebookSignIn}
                disabled={loading}
                style={roundSocialButtonStyle}
                className="login-social-button"
                title="Sign in with Facebook"
              >
                <svg style={roundSocialIconStyle} viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* iOS Download Button */}
              <button 
                onClick={handleiOSDownload}
                style={roundSocialButtonStyle}
                className="login-social-button"
                title="Download iOS App"
              >
                <svg style={roundSocialIconStyle} viewBox="0 0 24 24">
                  <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.50.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
            </div>

            {/* Sign up link */}
            <p style={signupLinkStyle}>
              Don't have an account? 
              <button 
                onClick={() => navigate('/signup')} 
                style={createAccountButtonStyle}
              >
                Create One
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div style={imageSectionStyle} className="login-image-section">
          <div style={imageContainerStyle}>
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

// Updated Styles
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
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
  // Removed gap property that might be causing issues
};

const logoIconStyle = {
  fontSize: '24px',
  marginRight: '8px', // Replaced gap with margin
};

const logoTextStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const mainContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1.2fr',
  maxWidth: '1200px',
  width: '100%',
  margin: '2rem auto',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  minHeight: '600px',
};

const formSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
};

const formContainerStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem 3rem 2rem',
  maxWidth: '450px',
  margin: '0 auto',
  width: '100%',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '2rem',
  textAlign: 'center',
};

const formStyle = {
  marginBottom: '1.5rem',
};

const formGroupStyle = {
  marginBottom: '1.5rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
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
  borderRadius: '8px',
  fontSize: '16px',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  outline: 'none',
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

const checkboxRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
};

const checkboxGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  // Removed gap property
};

const checkboxStyle = {
  width: '16px',
  height: '16px',
  accentColor: '#4a6fa5',
  marginRight: '0.5rem', // Added margin instead of gap
};

const checkboxLabelStyle = {
  fontSize: '14px',
  color: '#666',
  cursor: 'pointer',
};

const forgotPasswordStyle = {
  fontSize: '14px',
  color: '#4a6fa5',
  textDecoration: 'none',
  fontWeight: '500',
};

const loginButtonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#4a6fa5',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginBottom: '1.5rem',
};

const dividerStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '1.5rem 0',
  position: 'relative',
};

const dividerTextStyle = {
  backgroundColor: 'white',
  color: '#666',
  fontSize: '14px',
  padding: '0 1rem',
  position: 'relative',
  zIndex: 1,
  margin: '0 auto',
  fontWeight: '600',
};

// Updated social buttons styles for rounded appearance
const socialButtonsStyle = {
  display: 'flex',
  justifyContent: 'center',
  // Removed gap property
  marginBottom: '2rem',
  flexWrap: 'wrap',
};

const roundSocialButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  border: '2px solid #e5e5e5',
  borderRadius: '50%',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  margin: '0 0.5rem', // Added margin instead of gap
};

const roundSocialIconStyle = {
  width: '28px',
  height: '28px',
};

const errorStyle = {
  color: '#dc3545',
  backgroundColor: '#f8d7da',
  padding: '12px 16px',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  border: '1px solid #f5c6cb',
  fontSize: '14px',
};

const signupLinkStyle = {
  textAlign: 'center',
  color: '#666',
  fontSize: '14px',
  margin: 0,
};

const createAccountButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#4a6fa5',
  textDecoration: 'underline',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '14px',
  marginLeft: '0.25rem',
};

const imageSectionStyle = {
  backgroundColor: '#f8f9fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
};

const imageContainerStyle = {
  width: '100%',
  height: '100%',
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

export default Login;