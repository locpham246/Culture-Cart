import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails from "../components/ItemDetails/ItemDetails"; 

const ProductPage = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);  
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <ItemDetails item={product} />
    </div>
  );
};

export default ProductPage;
