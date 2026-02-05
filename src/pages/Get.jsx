// Get.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { portfolioData } from '../Data/Database';
import { GetHeader } from "../MyComponents/GetHeader";
import { FilterSection } from "../MyComponents/FilterSection";
import { GalleryGrid } from "../MyComponents/GalleryGrid";

function Get() {
    const navigate = useNavigate();
    const [data, setData] = useState(portfolioData);
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
                
                console.log('API Response:', response);
                console.log('Response data:', response.data);
                console.log('Data type:', typeof response.data);
                console.log('Is array?', Array.isArray(response.data));
                
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setData(response.data);
                    setFilteredData(response.data);
                    console.log('✅ API data loaded successfully');
                } else {
                    console.warn('⚠️ API returned empty or invalid data, using fallback');
                }
                setLoading(false);
            } catch (error) {
                console.error('❌ Error fetching data:', error);
                console.log('Using fallback data from Database.jsx');
                setLoading(false);
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

    const handleResetFilters = () => {
        setSearchTerm('');
        setFilter('all');
    };

    return (
        <main>
            <div className="get-page">
                <GetHeader />

                <FilterSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    categories={categories}
                    selectedFilter={filter}
                    onFilterChange={setFilter}
                    resultsCount={filteredData.length}
                />

                <GalleryGrid
                    loading={loading}
                    filteredData={filteredData}
                    animateCards={animateCards}
                    onExplore={handleExplore}
                    onResetFilters={handleResetFilters}
                />
            </div>
        </main>
    );
}

export default Get;