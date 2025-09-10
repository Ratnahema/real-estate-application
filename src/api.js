// API functions for property data
const API_URL = "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing";

export const propertyAPI = {
  // Get all properties
  getProperties: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      // Return mock data as fallback
      return mockProperties;
    }
  },
  
  // Get property by ID
  getProperty: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      // Return mock data as fallback
      return mockProperties.find(property => property.id === id);
    }
  },
  
  // Search properties
  searchProperties: async (filters) => {
    try {
      // First get all properties
      const allProperties = await propertyAPI.getProperties();
      
      let results = [...allProperties];
      
      if (filters.location) {
        results = results.filter(property => 
          property.location && property.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.type && filters.type !== 'all') {
        results = results.filter(property => property.type === filters.type);
      }
      
      if (filters.priceRange) {
        results = results.filter(property => 
          property.price >= filters.priceRange.min && 
          property.price <= filters.priceRange.max
        );
      }
      
      return results;
    } catch (error) {
      console.error("Error searching properties:", error);
      return [];
    }
  }
};

// Mock data as fallback
const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    location: "New York, NY",
    price: 450000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    description: "Beautiful modern apartment in the heart of downtown with amazing city views."
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Los Angeles, CA",
    price: 1200000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    description: "Stunning luxury villa with private pool and panoramic views of the city."
  }
];