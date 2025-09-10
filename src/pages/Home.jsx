import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { propertyAPI } from '../api';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('For Rent');
  const [houseType, setHouseType] = useState('House');
  const [location, setLocation] = useState('Indonesia');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const properties = await propertyAPI.getProperties();
        setFeaturedProperties(properties.slice(0, 3)); // Show only 3 properties on home page
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
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
      @media (max-width: 1024px) {
        .home-hero-title {
          font-size: 2.5rem !important;
        }
        .home-search-container {
          flex-direction: column !important;
        }
        .home-search-left {
          width: 100% !important;
          margin-bottom: 15px !important;
        }
        .home-list-property-right {
          width: 100% !important;
          justify-content: center !important;
        }
        .home-filter-row {
          flex-direction: column !important;
          align-items: stretch !important;
        }
        .home-filter-group {
          justify-content: center !important;
          margin-bottom: 15px !important;
        }
        .home-action-buttons {
          justify-content: center !important;
        }
      }
      
      @media (max-width: 768px) {
        .home-hero-title {
          font-size: 2rem !important;
        }
        .home-hero-subtitle {
          font-size: 1rem !important;
          margin-bottom: 2rem !important;
        }
        .home-search-input-container {
          flex-direction: column !important;
          padding: 15px !important;
          border-radius: 12px !important;
        }
        .home-search-input {
          width: 100% !important;
          margin-bottom: 10px !important;
        }
        .home-search-button {
          width: 100% !important;
          justify-content: center !important;
        }
        .home-featured-header {
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
        }
        .home-services-grid {
          grid-template-columns: 1fr !important;
        }
        .home-properties-grid {
          grid-template-columns: 1fr !important;
        }
        .home-rental-grid {
          grid-template-columns: 1fr !important;
        }
        .home-benefits-grid {
          grid-template-columns: 1fr !important;
        }
        .home-cta-form {
          flex-direction: column !important;
        }
        .home-what-we-do-grid {
          grid-template-columns: 1fr !important;
        }
        .home-filter-container {
          width: 90% !important;
          border-radius: 16px !important;
          padding: 15px !important;
        }
      }
      
      @media (max-width: 480px) {
        .home-hero-title {
          font-size: 1.8rem !important;
          margin-top: -20px !important;
        }
        .home-section-title {
          font-size: 2rem !important;
        }
        .home-filter-group {
          flex-direction: column !important;
        }
        .home-filter-select {
          width: 100% !important;
          margin-bottom: 10px !important;
        }
        .home-action-buttons {
          flex-direction: column !important;
          width: 100% !important;
        }
        .home-find-property-btn, .home-list-property-btn {
          width: 100% !important;
          margin-bottom: 10px !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSearch = () => {
    // Handle search functionality here
    console.log('Search:', { searchLocation, propertyType, houseType, location });
  };

  const handleListProperty = () => {
    // Handle list property functionality here
    console.log('List property clicked');
  };

  return (
    <div style={pageContainerStyle}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={heroOverlayStyle}>
          <div style={heroContainerStyle}>
            {/* Dream Home Section - Moved Up */}
            <div style={dreamHomeContainerStyle}>
              <h1 style={heroTitleStyle} className="home-hero-title">Find Your Dream Home in One Click!</h1>
              <p style={heroSubtitleStyle} className="home-hero-subtitle">
                Discover, Buy, or Rent Verified Properties with Ease.
              </p>
            </div>
            
            {/* Search and List Property Container */}
            <div style={searchContainerStyle} className="home-search-container">
              {/* Search Location Box - Left side */}
              <div style={searchLeftStyle} className="home-search-left">
                <div style={searchInputContainerStyle} className="home-search-input-container">
                  <span style={searchIconStyle}>📍</span>
                  <input 
                    type="text" 
                    placeholder="Search Location..." 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={searchInputStyle}
                    className="home-search-input"
                  />
                </div>
              </div>

              {/* List Property Button - Right side */}
              <div style={listPropertyRightStyle} className="home-list-property-right">
                <button style={listPropertyTopButtonStyle} onClick={handleListProperty}>
                  List Your Property
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Container - Floating at bottom */}
        <div style={filterOuterContainerStyle}>
          <div style={filterContainerStyle} className="home-filter-container">
            <div style={filterRowStyle} className="home-filter-row">
              <div style={filterGroupStyle} className="home-filter-group">
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={filterSelectStyle}
                  className="home-filter-select"
                >
                  <option value="For Rent">📋 For Rent</option>
                  <option value="For Sale">For Sale</option>
                </select>
                
                <select 
                  value={houseType}
                  onChange={(e) => setHouseType(e.target.value)}
                  style={filterSelectStyle}
                  className="home-filter-select"
                >
                  <option value="House">🏠 House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                </select>
                
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={filterSelectStyle}
                  className="home-filter-select"
                >
                  <option value="Indonesia">📍 Indonesia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                </select>
              </div>
              
              <button style={findPropertyButtonStyle} onClick={handleSearch} className="home-find-property-btn">
                Find Property
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the code remains the same */}
      {/* Main Content */}
      <div style={mainContainerStyle}>
        {/* What We Do Section */}
        <section style={whatWeDoSectionStyle}>
          <h2 style={whatWeDoTitleStyle}>What We Do</h2>
          <div style={whatWeDoGridStyle} className="home-what-we-do-grid">
            <div style={whatWeDoCardStyle}>
              <span style={iconStyle}>🏠</span>
              <h3>Buy a Home</h3>
              <p>Explore verified listings and purchase your dream home with ease.</p>
            </div>
            <div style={whatWeDoCardStyle}>
              <span style={iconStyle}>🔑</span>
              <h3>Rent a Home</h3>
              <p>Find affordable rental options across different locations.</p>
            </div>
            <div style={whatWeDoCardStyle}>
              <span style={iconStyle}>📋</span>
              <h3>List Your Property</h3>
              <p>List your property and reach thousands of potential buyers or renters.</p>
            </div>
          </div>
        </section>

        {/* Featured Property Section */}
        <section style={{ ...sectionStyle, backgroundColor: '#f8f9fa' }}>
          <div className="container">
            <div style={featuredHeaderStyle} className="home-featured-header">
              <div>
                <h2 style={sectionTitleStyle} className="home-section-title">Featured Property</h2>
                <p style={featuredSubtitleStyle}>By Finder & Projects</p>
                <h3 style={projectTitleStyle}>Kenanga Residence</h3>
              </div>
              <Link to="/properties" style={viewProjectsButtonStyle}>
                See 268 New Projects →
              </Link>
            </div>
            
            <h3 style={subsectionTitleStyle}>Best Properties Available For Sale</h3>
            <p style={subsectionDescriptionStyle}>
              Browse our top-rated properties for sale, featuring premium listings tailored to your needs. Find your dream home today!
            </p>

            {loading && <div style={loadingStyle}>Loading properties...</div>}
            
            {error && (
              <div style={errorStyle}>
                {error}
              </div>
            )}
            
            {!loading && !error && (
              <>
                <div style={propertiesGridStyle} className="home-properties-grid">
                  {featuredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                
                {featuredProperties.length === 0 && (
                  <div style={noPropertiesStyle}>
                    <p>No properties available at the moment.</p>
                  </div>
                )}
                
                <div style={viewAllStyle}>
                  <Link to="/properties" className="btn btn-secondary" style={viewMoreButtonStyle}>
                    View More Properties
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Rental Homes Section */}
        <section style={sectionStyle}>
          <div className="container">
            <h2 style={sectionTitleStyle} className="home-section-title">Find The Perfect Rental Home</h2>
            <p style={subsectionDescriptionStyle}>
              Browse our top-rated properties for rent, featuring premium listings tailored to your needs. Find your dream home today!
            </p>
            
            <div style={rentalGridStyle} className="home-rental-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} style={rentalCardStyle}>
                  <div style={rentalImageStyle}></div>
                  <div style={rentalContentStyle}>
                    <div style={rentalLocationStyle}>
                      <span>New York, NY</span>
                      <span>4.5/5</span>
                    </div>
                    <p style={rentalDescriptionStyle}>
                      Spacious apartment in a prime location with modern amenities.
                    </p>
                    <div style={rentalPriceStyle}>
                      <span style={priceStyle}>$450,000</span>
                      <button style={buyButtonStyle}>Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={ctaSectionStyle}>
          <div className="container">
            <div style={ctaContentStyle}>
              <h2 style={ctaTitleStyle}>Start Your Journey Today!</h2>
              <p style={ctaSubtitleStyle}>Create a profile in seconds and find your ideal home.</p>
              
              <div style={ctaFormStyle} className="home-cta-form">
                <input type="text" placeholder="Enter Your Name" style={ctaInputStyle} />
                <select style={ctaInputStyle}>
                  <option>Select User Type</option>
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Renter</option>
                </select>
                <input type="text" placeholder="Enter Your Location" style={ctaInputStyle} />
                <button style={ctaButtonStyle}>Continue</button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={sectionStyle}>
          <div className="container">
            <h2 style={sectionTitleStyle} className="home-section-title">We Provide Latest Properties For Our Valuable Clients</h2>
            <div style={benefitsGridStyle} className="home-benefits-grid">
              <div style={benefitItemStyle}>
                <h3 style={benefitTitleStyle}>Budget Friendly</h3>
                <p style={benefitDescriptionStyle}>
                  Lorem ipsum dolor sit amet consectetur. Venendis sed ac cenean tempus. Lectus quis pretium varius loculis sed.
                </p>
              </div>
              <div style={benefitItemStyle}>
                <h3 style={benefitTitleStyle}>Trusted By Thousand</h3>
                <p style={benefitDescriptionStyle}>
                  Lorem ipsum dolor sit amet consectetur. Venendis sed ac cenean tempus. Lectus quis pretium varius loculis sed.
                </p>
              </div>
              <div style={benefitItemStyle}>
                <h3 style={benefitTitleStyle}>Prime Location</h3>
                <p style={benefitDescriptionStyle}>
                  Lorem ipsum dolor sit amet consectetur. Venendis sed ac cenean tempus. Lectus quis pretium varius loculis sed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Page Container
const pageContainerStyle = { minHeight: '100vh' };
const mainContainerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px' };

// NEW: Dream Home Container
const dreamHomeContainerStyle = {
  textAlign: 'center',
  color: 'white',
  width: '100%',
  marginTop: '-80px', // Moved up from the center
  marginBottom: '40px',
};

// Updated Hero Styles with rounded corners
const heroStyle = {
  backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '80vh',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: '16px',
  margin: '16px',
};

const heroOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '16px',
};

const heroContainerStyle = {
  maxWidth: '1400px',
  width: '100%',
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const heroTitleStyle = {
  fontSize: '3.5rem',
  fontWeight: 'bold',
  marginBottom: '10rem',
  lineHeight: '1.2',
  marginTop: '-20px',
};

const heroSubtitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '3rem',
  opacity: 0.9,
  maxWidth: '800px',
  margin: '0 auto 6rem auto',
  marginTop: '-144px',
  
};

// NEW: Search and List Property Container
const searchContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto',
  padding: '0 20px',
  marginBottom: '-140px',
};

const searchLeftStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-start',
  marginRight: '20px',
};

const listPropertyRightStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const searchInputContainerStyle = {
  display: 'flex',
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '8px 16px',
  alignItems: 'center',
  boxShadow: '10 4px 20px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
};

const searchIconStyle = {
  fontSize: '20px',
  marginRight: '12px',
};

const searchInputStyle = {
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  padding: '9px 5px',
  color: '#333',
  height: '20px',
  width: '100%',
};

const listPropertyTopButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#dadde2',
  color: '#333',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  boxShadow: '0 4px 12px rgba(97, 22, 22, 0.15)',
};

// Filter Container - Floating at bottom
const filterOuterContainerStyle = {
  position: 'absolute',
  bottom: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 10,
};

const filterContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '50px',
  padding: '24px 40px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  width: '85%',
  maxWidth: '1000px',
};

const filterRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
};

const filterGroupStyle = {
  display: 'flex',
  gap: '15px',
  flex: 1,
  flexWrap: 'wrap',
};

const filterSelectStyle = {
  padding: '14px 20px',
  border: '1px solid #ddd',
  borderRadius: '12px',
  fontSize: '16px',
  backgroundColor: 'white',
  minWidth: '160px',
  color: '#333',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const findPropertyButtonStyle = {
  padding: '14px 32px',
  backgroundColor: '#2c5aa0',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

// What We Do Section
const whatWeDoSectionStyle = { 
  padding: '80px 0 60px', 
  textAlign: 'center' 
};

const whatWeDoTitleStyle = { 
  fontSize: '2.5rem', 
  fontWeight: 'bold', 
  marginBottom: '40px',
  color: '#333',
};

const whatWeDoGridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
  gap: '30px' 
};

const whatWeDoCardStyle = { 
  background: '#fff', 
  borderRadius: '16px', 
  padding: '40px 30px', 
  boxShadow: '0 8px 20px rgba(0,0,0,0.08)', 
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  textAlign: 'center',
};

const iconStyle = { 
  fontSize: '50px', 
  marginBottom: '20px', 
  display: 'block' 
};

// Keep all existing styles for other sections
const sectionStyle = {
  padding: '80px 0',
};

const sectionTitleStyle = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginBottom: '1rem',
  color: '#333',
  fontWeight: 'bold',
};

const sectionSubtitleStyle = {
  textAlign: 'center',
  fontSize: '1.1rem',
  color: '#666',
  marginBottom: '3rem',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const featuredHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  gap: '20px',
};

const featuredSubtitleStyle = {
  color: '#666',
  marginBottom: '0.5rem',
};

const projectTitleStyle = {
  fontSize: '1.8rem',
  color: '#2c5aa0',
  fontWeight: 'bold',
};

const viewProjectsButtonStyle = {
  color: '#2c5aa0',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const subsectionTitleStyle = {
  fontSize: '1.8rem',
  marginBottom: '1rem',
  color: '#333',
};

const subsectionDescriptionStyle = {
  fontSize: '1.1rem',
  color: '#666',
  marginBottom: '3rem',
  maxWidth: '800px',
};

const propertiesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem',
};

const viewAllStyle = {
  textAlign: 'center',
};

const viewMoreButtonStyle = {
  display: 'inline-block',
  padding: '12px 30px',
  backgroundColor: '#2c5aa0',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  transition: 'background-color 0.3s',
};

const rentalGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  marginTop: '2rem',
};

const rentalCardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const rentalImageStyle = {
  height: '200px',
  backgroundColor: '#e9ecef',
  backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '12px 12px 0 0',
};

const rentalContentStyle = {
  padding: '1.5rem',
};

const rentalLocationStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.8rem',
  fontSize: '14px',
  color: '#666',
};

const rentalDescriptionStyle = {
  marginBottom: '1.2rem',
  color: '#333',
  lineHeight: '1.5',
};

const rentalPriceStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const priceStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#2c5aa0',
};

const buyButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#2c5aa0',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
};

const ctaSectionStyle = {
  padding: '80px 0',
  backgroundColor: '#f8f9fa',
  borderRadius: '16px',
  margin: '16px',
};

const ctaContentStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
};

const ctaTitleStyle = {
  fontSize: '2.2rem',
  marginBottom: '1rem',
  color: '#333',
};

const ctaSubtitleStyle = {
  fontSize: '1.1rem',
  color: '#666',
  marginBottom: '2.5rem',
};

const ctaFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const ctaInputStyle = {
  padding: '14px 16px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '16px',
};

const ctaButtonStyle = {
  padding: '14px',
  backgroundColor: '#2c5aa0',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
};

const benefitsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  marginTop: '3rem',
};

const benefitItemStyle = {
  textAlign: 'center',
  padding: '2rem',
};

const benefitTitleStyle = {
  fontSize: '1.3rem',
  marginBottom: '1rem',
  color: '#333',
};

const benefitDescriptionStyle = {
  color: '#666',
  lineHeight: '1.6',
};

const loadingStyle = {
  textAlign: 'center',
  padding: '2rem',
  fontSize: '1.2rem',
};

const errorStyle = {
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: '#ffebee',
  color: '#c62828',
  borderRadius: '8px',
  margin: '2rem 0',
};

const noPropertiesStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#666',
};

export default Home;