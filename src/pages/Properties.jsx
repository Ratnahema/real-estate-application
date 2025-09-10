//properties.jsx
import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { propertyAPI } from '../api';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    type: 'all',
    priceRange: { min: 0, max: 10000000 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all properties on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching properties from API...");
        
        const data = await propertyAPI.getProperties();
        console.log("Fetched properties:", data);
        
        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
        // Set empty arrays as fallback
        setProperties([]);
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Add media queries for responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @media (max-width: 1024px) {
        .properties-filters {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        .properties-grid {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
        }
      }
      
      @media (max-width: 768px) {
        .properties-page-title {
          font-size: 2rem !important;
        }
        .properties-filters {
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
        }
        .properties-filter-group {
          margin-bottom: 0 !important;
        }
        .properties-clear-btn {
          margin-top: 0 !important;
        }
        .properties-grid {
          grid-template-columns: 1fr !important;
          gap: 1.5rem !important;
        }
        .properties-container {
          padding: 1rem !important;
        }
        .properties-filters-container {
          padding: 1.5rem !important;
        }
      }
      
      @media (max-width: 480px) {
        .properties-page-title {
          font-size: 1.8rem !important;
        }
        .properties-subtitle {
          font-size: 1rem !important;
        }
        .properties-filter-input {
          padding: 0.6rem !important;
          font-size: 0.9rem !important;
        }
        .properties-clear-btn, .properties-retry-btn, .properties-clear-filters-btn {
          padding: 0.6rem 1.2rem !important;
          font-size: 0.9rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (properties.length === 0) return;

    const applyFilters = () => {
      let filtered = [...properties];

      // Location filter
      if (filters.location && filters.location.trim() !== '') {
        filtered = filtered.filter(property => 
          property.location && 
          property.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Type filter
      if (filters.type && filters.type !== 'all') {
        filtered = filtered.filter(property => 
          property.type && 
          property.type.toLowerCase() === filters.type.toLowerCase()
        );
      }

      // Price range filter
      if (filters.priceRange) {
        filtered = filtered.filter(property => {
          const price = parseFloat(property.price) || 0;
          return price >= filters.priceRange.min && price <= filters.priceRange.max;
        });
      }

      console.log("Filtered properties:", filtered);
      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(`Filter changed: ${name} = ${value}`);
    
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    let min = 0, max = 10000000;
    
    if (value === 'low') {
      max = 300000;
    } else if (value === 'medium') {
      min = 300001;
      max = 700000;
    } else if (value === 'high') {
      min = 700001;
    }
    
    console.log(`Price range changed: ${min} - ${max}`);
    
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      type: 'all',
      priceRange: { min: 0, max: 10000000 }
    });
  };

  return (
    <div style={pageStyle}>
      <div className="container properties-container">
        <div style={headerStyle}>
          <h1 style={pageTitleStyle} className="properties-page-title">Properties for Sale</h1>
          <p style={subtitleStyle} className="properties-subtitle">
            {loading ? "Loading..." : `${filteredProperties.length} properties found`}
          </p>
        </div>
        
        {error && (
          <div style={errorStyle}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} style={retryButtonStyle} className="properties-retry-btn">
              Try Again
            </button>
          </div>
        )}
        
        {/* Filters */}
        <div style={filtersContainerStyle} className="properties-filters-container">
          <div style={filtersStyle} className="properties-filters">
            <div style={filterGroupStyle} className="properties-filter-group">
              <label htmlFor="location" style={labelStyle}>Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Search by city, state..."
                value={filters.location}
                onChange={handleFilterChange}
                style={filterInputStyle}
                className="properties-filter-input"
              />
            </div>
            
            <div style={filterGroupStyle} className="properties-filter-group">
              <label htmlFor="type" style={labelStyle}>Property Type</label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                style={filterInputStyle}
                className="properties-filter-input"
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            
            <div style={filterGroupStyle} className="properties-filter-group">
              <label htmlFor="price" style={labelStyle}>Price Range</label>
              <select
                id="price"
                name="price"
                onChange={handlePriceRangeChange}
                style={filterInputStyle}
                className="properties-filter-input"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $300,000</option>
                <option value="medium">$300,000 - $700,000</option>
                <option value="high">Over $700,000</option>
              </select>
            </div>
            
            <div style={filterGroupStyle} className="properties-filter-group">
              <button 
                onClick={clearFilters}
                style={clearButtonStyle}
                className="properties-clear-btn"
                type="button"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Properties Grid */}
        {loading ? (
          <div style={loadingContainerStyle}>
            <div style={loadingSpinnerStyle}></div>
            <p style={loadingTextStyle}>Loading properties...</p>
          </div>
        ) : (
          <>
            {filteredProperties.length > 0 ? (
              <div style={propertiesGridStyle} className="properties-grid">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div style={noResultsStyle}>
                <div style={noResultsIconStyle}>🏠</div>
                <h3 style={noResultsTitleStyle}>No properties found</h3>
                <p style={noResultsTextStyle}>
                  {properties.length === 0 
                    ? "No properties are currently available." 
                    : "Try adjusting your filters to see more results."
                  }
                </p>
                {properties.length > 0 && (
                  <button onClick={clearFilters} style={clearFiltersButtonStyle} className="properties-clear-filters-btn">
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
        
        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div style={debugStyle}>
            <h4>Debug Info:</h4>
            <p>Total properties: {properties.length}</p>
            <p>Filtered properties: {filteredProperties.length}</p>
            <p>Current filters: {JSON.stringify(filters)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  padding: '2rem 0',
  minHeight: '80vh',
  backgroundColor: '#f8f9fa',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
};

const pageTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '0.5rem',
};

const subtitleStyle = {
  fontSize: '1.1rem',
  color: '#666',
  marginBottom: '0',
};

const filtersContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  marginBottom: '3rem',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const filtersStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1.5rem',
  alignItems: 'end',
};

const filterGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  fontSize: '0.9rem',
  fontWeight: '600',
  color: '#333',
  marginBottom: '0.5rem',
};

const filterInputStyle = {
  padding: '0.75rem',
  border: '2px solid #e9ecef',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: 'border-color 0.3s ease',
  outline: 'none',
};

const clearButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginTop: '1.5rem',
};

const propertiesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '2rem',
  padding: '1rem 0',
};

const loadingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem',
  textAlign: 'center',
};

const loadingSpinnerStyle = {
  width: '50px',
  height: '50px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #007bff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem',
};

const loadingTextStyle = {
  fontSize: '1.2rem',
  color: '#666',
};

const errorStyle = {
  textAlign: 'center',
  padding: '3rem 2rem',
  backgroundColor: '#ffebee',
  color: '#c62828',
  borderRadius: '12px',
  margin: '2rem 0',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const retryButtonStyle = {
  marginTop: '1rem',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600',
};

const noResultsStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const noResultsIconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem',
};

const noResultsTitleStyle = {
  fontSize: '1.8rem',
  color: '#333',
  marginBottom: '1rem',
};

const noResultsTextStyle = {
  fontSize: '1.1rem',
  color: '#666',
  marginBottom: '1.5rem',
  lineHeight: '1.6',
};

const clearFiltersButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const debugStyle = {
  marginTop: '3rem',
  padding: '1rem',
  backgroundColor: '#e9ecef',
  borderRadius: '8px',
  fontSize: '0.9rem',
  color: '#495057',
};

export default Properties;