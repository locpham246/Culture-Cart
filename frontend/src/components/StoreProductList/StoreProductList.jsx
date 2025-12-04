import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './StoreProductList.scss'; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const StoreProductList = () => {
    const { storeId } = useParams(); 
    const [store, setStore] = useState(null);
    const [storeProducts, setStoreProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStoreAndProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const storeResponse = await axios.get(`${API_BASE_URL}/api/stores/${storeId}`);
                if (storeResponse.data.success) {
                    setStore(storeResponse.data.store);
                } else {
                    setError(storeResponse.data.message || 'Failed to fetch store details.');
                    setLoading(false);
                    return;
                }

                const productsResponse = await axios.get(`${API_BASE_URL}/api/store-products?storeId=${storeId}`);
                if (productsResponse.data.success) {
                    const availableProducts = productsResponse.data.storeProducts.filter(sp => sp.isAvailable && sp.stock > 0);
                    setStoreProducts(availableProducts);
                } else {
                    setError(productsResponse.data.message || 'Failed to fetch products for this store.');
                }
            } catch (err) {
                setError('Error fetching data: ' + (err.response?.data?.message || err.message));
                console.error('Error fetching store products:', err);
            } finally {
                setLoading(false);
            }
        };

        if (storeId) {
            fetchStoreAndProducts();
        }
    }, [storeId]);

    return (
        <div className="store-product-list-component">
            {store ? (
                <h1>Products from {store.name}</h1>
            ) : (
                <h1>Store Products</h1>
            )}

            {loading && <div className="loading-message">Loading products...</div>}
            {error && <div className="error-message">Error: {error}</div>}

            {!loading && !error && storeProducts.length === 0 && (
                <div className="no-products-found">No products found for this store.</div>
            )}

            {!loading && !error && storeProducts.length > 0 && (
                <div className="products-grid">
                    {storeProducts.map(sp => (
                        <div key={sp._id} className="product-card">
                            <Link to={`/product-details/${sp.productId._id}`}>
                                <img
                                    src={(sp.storeSpecificImages && sp.storeSpecificImages.length > 0) ? sp.storeSpecificImages[0] : (sp.productId.images && sp.productId.images.length > 0 ? sp.productId.images[0] : 'https://via.placeholder.com/300x200?text=Product+Image')}
                                    alt={sp.productId.name}
                                    className="product-image"
                                />
                                <h3>{sp.productId.name}</h3>
                                <p className="product-price">${sp.price.toFixed(2)}</p>
                                <p className="product-stock">Stock: {sp.stock}</p>
                                <p className="product-category">{sp.productId.category}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StoreProductList;
