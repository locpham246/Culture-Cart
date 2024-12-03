// src/pages/Product.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { setProductList, setSelectedProduct } from '../store/productSlice';
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/Lines";
import ItemDetails from "../components/ItemDetails/ItemDetails";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productList = useSelector((state) => state.product.productList);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  useEffect(() => {
    // If the productList is empty, we can set it (this can be fetched from an API)
    if (productList.length === 0) {
      const products = [
        { id: "1", name: "Product 1", price: 20, description: "Description 1", images: ["img1.jpg"], weights: [2, 4, 6] },
        { id: "2", name: "Product 2", price: 30, description: "Description 2", images: ["img2.jpg"], weights: [2, 3, 5] },
        // More products
      ];
      dispatch(setProductList(products));
    }
  }, [dispatch, productList]);

  useEffect(() => {
    // Set selected product based on the id from the URL
    if (!selectedProduct || selectedProduct.id !== id) {
      const product = productList.find((product) => product.id === id);
      if (product) {
        dispatch(setSelectedProduct(product));
      }
    }
  }, [id, dispatch, productList, selectedProduct]);

  if (!selectedProduct) {
    return <div>Product not found</div>; // Handle when product is not found
  }

  return (
    <div className="Product">
      <SmallHeader />
      <Menu />
      <Lines />
      <ItemDetails product={selectedProduct} />
    </div>
  );
};

export default Product;
