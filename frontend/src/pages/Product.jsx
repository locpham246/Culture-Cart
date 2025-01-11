// import { useSelector } from 'react-redux';
// import SmallHeader from "../components/SmallHeader/SmallHeader";
// import Menu from "../components/Menu/Menu";
// import Lines from "../components/ScreenLines/Lines";
// import ItemDetails from "../components/ItemDetails/ItemDetails";

// export default function Product() {
//   const selectedProduct = useSelector((state) => state.product.selectedProduct); 

//   return (
//     <div className="Product">
//         <SmallHeader />
//         <Menu />
//         <Lines />
//         <ItemDetails />
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/Lines";
import ItemDetails from "../components/ItemDetails/ItemDetails";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/product1/${id}`);
        if (response.ok) {
          const product = await response.json();
          setSelectedProduct(product); 
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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
