import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { fetchStores } from '../../redux/storeSlice'; 
import './StoreList.scss';

const StoreList = () => {
    const dispatch = useDispatch(); 
    const { stores, isLoading, error } = useSelector((state) => state.stores);

    const [selectedCategory, setSelectedCategory] = React.useState('All'); 

    const fetchStoresData = useCallback(() => {

        dispatch(fetchStores(selectedCategory));
    }, [dispatch, selectedCategory]);
    useEffect(() => {
        fetchStoresData(); 
    }, [fetchStoresData]); 

    const handleCategoryChange = (category) => {
        setSelectedCategory(category); 
    };

    return (
        <div className="store-list-component">
            <h1>Our Stores</h1>
            <div className="category-filters">
                <button
                    className={selectedCategory === 'All' ? 'active' : ''}
                    onClick={() => handleCategoryChange('All')}
                >
                    All Stores
                </button>
                <button
                    className={selectedCategory === 'Asian' ? 'active' : ''}
                    onClick={() => handleCategoryChange('Asian')}
                >
                    Asian Stores
                </button>
                <button
                    className={selectedCategory === 'Hispanic' ? 'active' : ''}
                    onClick={() => handleCategoryChange('Hispanic')}
                >
                    Hispanic Stores
                </button>
                <button
                    className={selectedCategory === 'African' ? 'active' : ''}
                    onClick={() => handleCategoryChange('African')}
                >
                    African Stores
                </button>
            </div>

            {isLoading && <div className="loading-message">Loading stores...</div>}

            {error && <div className="error-message">Error: {error}</div>} 

            {!isLoading && !error && stores.length === 0 && (
                <div className="no-stores-found">No stores found in this category.</div>
            )}

            {!isLoading && !error && stores.length > 0 && (
                <div className="stores-grid">
                    {stores.map(store => (
                        <div key={store._id} className="store-card">
                            <Link to={`/stores/${store._id}/products`}>
                                <img
                                    src={store.logo || '/images/store_placeholder.png'}
                                    alt={store.name}
                                    className="store-image"
                                />
                                <h2>{store.name}</h2>
                                <p>{store.address}</p>
                                <p>Phone: {store.phoneNumber}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StoreList;