//PropertyCard.jsx
import { useEffect } from 'react';

const PropertyCard = ({ property }) => {
  // Add media queries for responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .property-card {
          margin: 0 auto !important;
          max-width: 400px !important;
        }
        .property-image {
          height: 180px !important;
        }
        .property-content {
          padding: 1.25rem !important;
        }
        .property-title {
          font-size: 1.1rem !important;
        }
        .property-price {
          font-size: 1.3rem !important;
        }
        .property-details {
          gap: 0.4rem !important;
        }
        .property-detail-item {
          font-size: 0.8rem !important;
          padding: 0.2rem 0.4rem !important;
        }
      }
      
      @media (max-width: 480px) {
        .property-card {
          max-width: 100% !important;
        }
        .property-image {
          height: 160px !important;
        }
        .property-content {
          padding: 1rem !important;
        }
        .property-title {
          font-size: 1rem !important;
        }
        .property-price {
          font-size: 1.2rem !important;
        }
        .property-description {
          font-size: 0.9rem !important;
          -webkit-line-clamp: 2 !important;
        }
        .property-button {
          padding: 0.6rem !important;
          font-size: 0.9rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle cases where property data might be missing
  const {
    id,
    title = "Untitled Property",
    location = "Location not specified",
    price = 0,
    type = "unknown",
    bedrooms = 0,
    bathrooms = 0,
    area = 0,
    image = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    description = "No description available."
  } = property;

  return (
    <div style={cardStyle} className="property-card">
      <img 
        src={image} 
        alt={title}
        style={imageStyle}
        className="property-image"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
        }}
      />
      <div style={contentStyle} className="property-content">
        <h3 style={titleStyle} className="property-title">{title}</h3>
        <p style={locationStyle} className="property-location">{location}</p>
        <p style={priceStyle} className="property-price">${price.toLocaleString()}</p>
        
        <div style={detailsStyle} className="property-details">
          <span style={detailItemStyle} className="property-detail-item">
            {bedrooms} Bed
          </span>
          <span style={detailItemStyle} className="property-detail-item">
            {bathrooms} Bath
          </span>
          <span style={detailItemStyle} className="property-detail-item">
            {area} sqft
          </span>
          <span style={detailItemStyle} className="property-detail-item">
            {type}
          </span>
        </div>
        
        <p style={descriptionStyle} className="property-description">{description}</p>
        
        <button style={buttonStyle} className="property-button">View Details</button>
      </div>
    </div>
  );
};

// Styles (keep the same as before)
const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const contentStyle = {
  padding: '1.5rem',
};

const titleStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '#333',
};

const locationStyle = {
  color: '#666',
  marginBottom: '0.5rem',
};

const priceStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#007bff',
  marginBottom: '1rem',
};

const detailsStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  marginBottom: '1rem',
};

const detailItemStyle = {
  backgroundColor: '#f8f9fa',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.875rem',
  color: '#666',
};

const descriptionStyle = {
  color: '#666',
  marginBottom: '1.5rem',
  lineHeight: '1.6',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

export default PropertyCard;