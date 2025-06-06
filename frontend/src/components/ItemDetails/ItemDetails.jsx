import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'; 
import axios from 'axios';
import './ItemDetails.scss';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { id: commonProductId } = useParams(); 
  
  const [availableStoreProducts, setAvailableStoreProducts] = useState([]); 
  const [selectedStoreProduct, setSelectedStoreProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [mainDisplayImage, setMainDisplayImage] = useState("");

  const cartItems = useSelector(state => state.cart.items);
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchProductDetailsAndStoreOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`https://localhost:3000/api/products/${commonProductId}/store-options`);
        
        if (response.data.success && response.data.storeProducts.length > 0) {
          const fetchedStoreProducts = response.data.storeProducts;
          setAvailableStoreProducts(fetchedStoreProducts);

          const initialSelected = fetchedStoreProducts[0];
          setSelectedStoreProduct(initialSelected);

          const initialDisplayImages = initialSelected.storeSpecificImages && initialSelected.storeSpecificImages.length > 0
            ? initialSelected.storeSpecificImages
            : initialSelected.productId.images || [];

          if (initialDisplayImages.length > 0) {
            setMainDisplayImage(initialDisplayImages[0]);
          } else {
            setMainDisplayImage("https://placehold.co/600x400/cccccc/333333?text=No+Image");
          }

          if (initialSelected.productId.weights && initialSelected.productId.weights.length > 0) {
            setSelectedWeight(initialSelected.productId.weights[0]);
          } else {
            setSelectedWeight(null); 
          }

        } else {
          setError(response.data.message || 'Failed to fetch product details or no stores found for this product.');
          console.error('Failed to fetch product details:', response.data.message);
        }
      } catch (err) {
        setError('Error fetching product: ' + (err.response?.data?.message || err.message));
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (commonProductId) {
      fetchProductDetailsAndStoreOptions();
    }
  }, [commonProductId]);

  const handleStoreSelect = (storeProductIdToSelect) => {
    const newSelected = availableStoreProducts.find(sp => sp._id === storeProductIdToSelect);
    if (newSelected) {
      setSelectedStoreProduct(newSelected);
      
      const newDisplayImages = newSelected.storeSpecificImages && newSelected.storeSpecificImages.length > 0
        ? newSelected.storeSpecificImages
        : newSelected.productId.images || [];

      if (newDisplayImages.length > 0) {
        setMainDisplayImage(newDisplayImages[0]);
      } else {
        setMainDisplayImage("https://placehold.co/600x400/cccccc/333333?text=No+Image");
      }

      if (newSelected.productId.weights && newSelected.productId.weights.length > 0) {
        setSelectedWeight(newSelected.productId.weights[0]);
      } else {
        setSelectedWeight(null);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '200px', fontSize: '24px', color: 'blue', backgroundColor: 'yellow', padding: '20px', zIndex: 1000, position: 'relative' }}>Loading product details...</div>;
  }
  
  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '200px', fontSize: '24px', color: 'white', backgroundColor: 'red', padding: '20px', zIndex: 1000, position: 'relative' }}>Error: {error}</div>;
  }
  
  if (!selectedStoreProduct || !selectedStoreProduct.productId || !selectedStoreProduct.storeId) { 
    console.log("Debug: No selectedStoreProduct or its populated data.");
    return <div style={{ textAlign: 'center', marginTop: '200px', fontSize: '24px', color: 'orange', backgroundColor: 'purple', padding: '20px', zIndex: 1000, position: 'relative' }}>Product not found or invalid data.</div>;
  }
  
  const productInfo = selectedStoreProduct.productId; 
  const storeInfo = selectedStoreProduct.storeId; 

  const {
    _id: currentStoreProductId, 
    price,
    stock,
    isAvailable,
    storeSpecificImages,
  } = selectedStoreProduct;

  const {
    name: productName, 
    description,
    weights,
    images: commonImagesFromProduct,
  } = productInfo;

  const commonImages = commonImagesFromProduct || [];
  
  const {
    name: storeName, 
  } = storeInfo;

  const displayImages = storeSpecificImages && storeSpecificImages.length > 0 ? storeSpecificImages : commonImages;
  
  console.log("Debug: storeSpecificImages", storeSpecificImages);
  console.log("Debug: commonImagesFromProduct", commonImagesFromProduct);
  console.log("Debug: commonImages (after || [])", commonImages);
  console.log("Debug: displayImages", displayImages);
  console.log("Debug: mainDisplayImage URL", mainDisplayImage);
  console.log("Debug: Product Name:", productName);
  console.log("Debug: Product Description:", description);
  console.log("Debug: Product Weights:", weights);
  console.log("Debug: Store Name:", storeName);
  console.log("Debug: Selected Weight:", selectedWeight);


  const itemInCart = cartItems.find(item => item._id === currentStoreProductId && item.selectedWeight === selectedWeight);
  const currentQuantityInCart = itemInCart ? itemInCart.quantity : 0;
  const canAddToCart = isAvailable && stock > currentQuantityInCart && selectedWeight !== null;

  const handleAddToCart = () => {
    if (canAddToCart) {
      dispatch(addToCart({ ...selectedStoreProduct, selectedWeight, productName })); 
      alert(`Added ${productName} (${selectedWeight} lbs) from ${storeName} to cart!`);
    } else if (selectedWeight === null && weights && weights.length > 0) {
      alert("Please select a product weight.");
    } else {
      alert(`Cannot add ${productName} to cart. Out of stock or maximum quantity reached.`);
    }
  };

  const handleWeightSelect = (weight) => {
    setSelectedWeight(weight);
  };

  const handleThumbnailClick = (imageSrc) => {
    setMainDisplayImage(imageSrc);
  };

  return (
    <div className="item-details">
      <h1>{productName || 'Product Name Not Available'}</h1> 

      <div className="store-selection-container"> 
        <label htmlFor="store-select">Select a Store:</label>
        <select 
          id="store-select" 
          onChange={(e) => handleStoreSelect(e.target.value)}
          value={selectedStoreProduct._id}
        >
          {availableStoreProducts.map(sp => (
            <option key={sp._id} value={sp._id}>
              {sp.storeId.name} - ${sp.price.toFixed(2)} {sp.stock > 0 ? `(In Stock: ${sp.stock})` : '(Out of Stock)'}
            </option>
          ))}
        </select>
        <p className="current-store-name">Currently viewing from: **{storeName || 'Unknown'}**</p>
      </div>

      <div className="product">
        <div className="product-images">
          <img className="main-image" src={mainDisplayImage} alt={productName || 'Product'} />
          <div className="image-thumbnails">
            {displayImages.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${productName || 'Product'} thumbnail ${index}`} 
                className={img === mainDisplayImage ? 'active' : ''}
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h2>Store: {storeName || 'Store Name Not Available'}</h2> 
          <p className="price">Price: ${price ? price.toFixed(2) : 'N/A'}</p>
          <p className="stock">
            In Stock: {isAvailable && stock > 0 ? `Yes (${stock} available)` : "No"}
          </p>
          {itemInCart && <p className="in-cart">In Cart: {itemInCart.quantity}</p>}

          {weights && weights.length > 0 && (
            <div className="weight-selection">
              <p>Weight:</p>
              <div className="weights">
                {weights.map((weight, index) => (
                  <button 
                    key={index}
                    className={selectedWeight === weight ? 'active' : ''}
                    onClick={() => handleWeightSelect(weight)}
                  >
                    {weight} lbs
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="actions">
            <button
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
            >
              {canAddToCart ? 'Add to Cart' : (selectedWeight === null && weights && weights.length > 0 ? 'Select Weight' : 'Out of Stock')}
            </button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="additional-info">
        <h3>About this product:</h3>
        <p className="description">{description || 'No product description available.'}</p>
      </div>

      {availableStoreProducts.length > 1 && (
        <div className="other-stores-selling">
          <h3>Other stores selling this product:</h3>
          <ul>
            {availableStoreProducts.map(sp => (
              <li key={sp._id}>
                <strong>{sp.storeId.name}</strong> - Price: ${sp.price.toFixed(2)} - Stock: {sp.stock}
                {sp._id === selectedStoreProduct._id && " (Currently viewing)"}
                {sp._id !== selectedStoreProduct._id && (
                    <button onClick={() => handleStoreSelect(sp._id)}>View from this store</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;