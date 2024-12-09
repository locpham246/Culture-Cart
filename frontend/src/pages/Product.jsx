import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../store/productSlice';
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/Lines";
import ItemDetails from "../components/ItemDetails/ItemDetails";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  useEffect(() => {
    console.log('Product List:', productList);
    console.log('Current ID:', id);

    if (productList.length > 0) {
      const parsedId = parseInt(id, 10);
      const product = productList.find((product) => product.id === parsedId);

      console.log('Parsed ID:', parsedId);
      console.log('Found Product:', product);

      if (product) {
        dispatch(setSelectedProduct(product));
      } else {
        console.error('No product found for ID:', parsedId);
      }
    }
  }, [id, dispatch, productList]);

  if (!selectedProduct) {
    return <div>Product not found</div>;
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


