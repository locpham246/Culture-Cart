// import SmallHeader from "../components/SmallHeader/SmallHeader";
// import Menu from "../components/Menu/Menu";
// import Lines from "../components/ScreenLines/Lines";
// import ItemDetails from "../components/ItemDetails/ItemDetails";

// export default function Product() {
//     return (
//       <div className="Product">
//           <SmallHeader />
//           <Menu />
//           <Lines />
//           <ItemDetails />
//       </div>
//     );
//   }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SmallHeader from "../components/SmallHeader/SmallHeader";
// import Menu from "../components/Menu/Menu";
// import Lines from "../components/ScreenLines/Lines";
// import ItemDetails from "../components/ItemDetails/ItemDetails";

// export default function Product() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   useEffect(() => {
//     if (searchQuery.length > 2) {
//       axios
//         .get(`http://localhost:3000/api/items/search?q=${searchQuery}`)
//         .then((response) => {
//           setItems(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching items:", error);
//         });
//     } else {
//       setItems([]);
//     }
//   }, [searchQuery]);

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//   };

//   return (
//     <div className="Product">
//       <SmallHeader onSearchChange={handleSearchChange} />
//       <Menu />
//       <Lines />
      
//       <div className="search-results">
//         {items.length > 0 && (
//           <div className="results">
//             <h3>Search Results</h3>
//             <ul>
//               {items.map((item) => (
//                 <li key={item._id} onClick={() => handleItemClick(item)}>
//                   <img src={item.image} alt={item.name} />
//                   <p>{item.name}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {selectedItem && <ItemDetails item={selectedItem} />}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/Lines";

const Product = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);

  useEffect(() => {

    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        setItem(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchItemDetails();
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="Product">
      <SmallHeader />
      <Menu />
      <Lines />

      <div className="itemDetails">
        <h1>{item.name}</h1>

        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
        <p>{item.inStock ? "In Stock" : "Out of Stock"}</p>
      </div>
    </div>
  );
};

export default Product;

  