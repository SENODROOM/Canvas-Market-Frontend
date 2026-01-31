// Get.jsx (Temporary with fallback)
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { portfolioData } from '../Data/Database'; // FALLBACK DATA


function Get() {
    const navigate = useNavigate();
    const [data, setData] = useState(portfolioData); // Start with local data
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(portfolioData);
    const [animateCards, setAnimateCards] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:1000/api/Products');
                
                console.log('API Response:', response); // DEBUG
                console.log('Response data:', response.data); // DEBUG
                console.log('Data type:', typeof response.data); // DEBUG
                console.log('Is array?', Array.isArray(response.data)); // DEBUG
                
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setData(response.data);
                    setFilteredData(response.data);
                    console.log('✅ API data loaded successfully');
                } else {
                    console.warn('⚠️ API returned empty or invalid data, using fallback');
                    // Keep using portfolioData
                }
                setLoading(false);
            } catch (error) {
                console.error('❌ Error fetching data:', error);
                console.log('Using fallback data from Database.jsx');
                setLoading(false);
                // Keep using portfolioData as fallback
            }
        };
        fetchData();
    }, []);

    // Get unique categories from data
    const categories = ['all', ...new Set(data.flatMap(item => item.tech || []))];

    // Filter data based on search and category
    useEffect(() => {
        setAnimateCards(false);
        setTimeout(() => setAnimateCards(true), 50);

        let filtered = data;

        // Filter by category
        if (filter !== 'all') {
            filtered = filtered.filter(item => item.tech?.includes(filter));
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [filter, searchTerm, data]);

    const handleExplore = (painting) => {
        navigate('/painting', { state: { painting } });
    };

    return (
        <>
            <main>
                <div className="get-page">
                    {/* Animated Background */}
                   

                    {/* Hero Section */}
                    <div className="bahubali">
                        <div className="about-mainheading mainheading">Get Paintings</div>
                        <div className="about-subheading subheading" id="sub">
                            <p>"Turn Your Money in Art"</p>
                        </div>
                    </div>

                    {/* Filter & Search Section */}
                    <section className="filter-section">
                        <div className="container">
                            {/* Search Bar */}
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="m21 21-4.35-4.35"/>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search by name, artist, or description..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                    {searchTerm && (
                                        <button className="clear-search" onClick={() => setSearchTerm('')}>
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Category Filters */}
                            <div className="filter-buttons">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`filter-btn ${filter === category ? 'active' : ''}`}
                                        onClick={() => setFilter(category)}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {/* Results Counter */}
                            <div className="results-info">
                                <p>Showing {filteredData.length} {filteredData.length === 1 ? 'artwork' : 'artworks'}</p>
                            </div>
                        </div>
                    </section>

                    {/* Gallery Grid */}
                    <section className="gallery-section">
                        <div className="container">
                            {loading ? (
                                <div className="loading-container">
                                    <div className="loader"></div>
                                    <p>Loading artworks...</p>
                                </div>
                            ) : (
                                <div className={`gallery-grid ${animateCards ? 'animate' : ''}`}>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((painting, index) => (
                                            <div
                                                key={painting._id || painting.id}
                                                className="painting-card"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                {/* Stock Badge */}
                                                {!painting.inStock && (
                                                    <div className="stock-badge out-of-stock">Out of Stock</div>
                                                )}

                                                {/* Image Container */}
                                                <div className="card-image-container">
                                                    <img
                                                        src={painting.image}
                                                        alt={painting.name}
                                                        className="card-image"
                                                        loading="lazy"
                                                    />
                                                    <div className="image-overlay">
                                                       
                                                           
                                                          
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className="card-content">
                                                    {/* Title & Artist */}
                                                    <div className="card-header">
                                                        <h3 className="card-name">{painting.name}</h3>
                                                        <p className="card-artist">by {painting.artist}</p>
                                                    </div>

                                                    {/* Rating */}
                                                    <div className="card-rating">
                                                        <div className="stars">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className={i < Math.floor(painting.rating || 0) ? 'star filled' : 'star'}>
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="rating-text">
                                                            {painting.rating || 0} ({painting.reviewCount || 0} reviews)
                                                        </span>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="card-description">
                                                        {painting.description && painting.description.length > 100
                                                            ? `${painting.description.substring(0, 100)}...`
                                                            : painting.description || 'No description available'}
                                                    </p>

                                                    {/* Tags */}
                                                    <div className="card-tags">
                                                        {painting.tech?.slice(0, 3).map((tech, idx) => (
                                                            <span key={idx} className="tag">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Price & Action */}
                                                    <div className="card-footer">
                                                        <div className="price-section">
                                                            <span className="price-label">Price</span>
                                                            <span className="price">${painting.price?.toFixed(2) || '0.00'}</span>
                                                        </div>
                                                        <button
                                                            className="explore-button"
                                                            onClick={() => handleExplore(painting)}
                                                            disabled={!painting.inStock}
                                                        >
                                                            {painting.inStock ? 'Explore' : 'Unavailable'}
                                                            {painting.inStock && (
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-results">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <circle cx="11" cy="11" r="8"/>
                                                <path d="m21 21-4.35-4.35"/>
                                            </svg>
                                            <h3>No artworks found</h3>
                                            <p>Try adjusting your search or filter criteria</p>
                                            <button onClick={() => { setSearchTerm(''); setFilter('all'); }} className="reset-btn">
                                                Reset Filters
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Get;