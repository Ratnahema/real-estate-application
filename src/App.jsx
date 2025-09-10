import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';

// Custom ProtectedRoute component that allows bypass
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // Allow access if user is authenticated OR if bypassAuth flag is set
  if (currentUser || location.state?.bypassAuth) {
    return children;
  }
  
  // Redirect to login if not authenticated and no bypass
  return <Navigate to="/login" state={{ from: location }} replace />;
};


// Loading component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.2rem'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <div className="loading-spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #2c5aa0',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p>Loading...</p>
    </div>
  </div>
);

// 404 Page component
const NotFound = () => (
  <div style={{ 
    textAlign: 'center', 
    padding: '4rem 2rem',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/" style={{ 
      color: '#007bff', 
      textDecoration: 'underline',
      marginTop: '1rem'
    }}>
      Go back to Home
    </a>
  </div>
);

// Component to conditionally render footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <div className="App">
      <Navbar />
      <main>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/properties" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Properties />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Add other routes as needed */}
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;