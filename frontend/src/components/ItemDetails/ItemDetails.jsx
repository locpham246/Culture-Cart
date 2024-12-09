import './ItemDetails.scss'; 
const ItemDetails = ({ product }) => {
  if (!product) return <div>Product not found</div>;

  const {
    companyName = "Li's Asian Market",
    name = product.name,
    price = product.price,
    inStock = true,
    weights = product.weights || [2, 4, 6],
    description = product.description || "Description not available",
    images = product.images || ["path/to/default-image.png"], 
  } = product;

  const mainImage = images[0] || "path/to/default-image.png"; 

  return (
    <div className="item-details">
      <h1>{companyName}</h1>
      <div className="product">
        {/* Main Image */}
        <div className="product-images">
          <img className="main-image" src={mainImage} alt={name} />
          {/* Thumbnails */}
          <div className="image-thumbnails">
            {images.slice(1).map((img, index) => (
              <img key={index} src={img} alt={`${name} thumbnail ${index}`} />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h2>{name}</h2>
          <p className="price">Price: ${price}</p>
          <p className="stock">In Stock: {inStock ? "Yes" : "No"}</p>

          <div className="weight-selection">
            <p>Weights:</p>
            <div className="weights">
              {weights.map((weight, index) => (
                <button key={index}>{weight} lbs</button>
              ))}
            </div>
          </div>

          <div className="actions">
            <button className="add-to-cart">Add to cart</button>
            <button className="buy-now">Buy now</button>
          </div>
        </div>
      </div>

      <div className="additional-info">
        <h3>About this item:</h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
