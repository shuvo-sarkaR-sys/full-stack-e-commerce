//  import { useEffect, useState } from "react";
// import axios from "axios";

// const HotDealManager = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products")
//       .then(res => setProducts(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleHotDealToggle = async (id, isHotDeal, discount) => {
//     try {
//       await axios.put(`http://localhost:5000/api/products/hotdeal/${id}`, {
//         isHotDeal: !isHotDeal,
//         discount: discount || 0,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });

//       setProducts(prev =>
//         prev.map(p =>
//           p._id === id ? { ...p, isHotDeal: !isHotDeal } : p
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDiscountChange = (id, value) => {
//     setProducts(prev =>
//       prev.map(p =>
//         p._id === id ? { ...p, discount: value } : p
//       )
//     );
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">🔥 Hot Deal Management</h2>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th>Name</th>
//             <th>Price</th>
//             <th>Hot Deal</th>
//             <th>Discount (%)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product._id} className="border-b">
//               <td className="p-2">{product.name}</td>
//               <td className="p-2">${product.previousPrice}</td>
              
//               <td className="p-2">
//                 <button
//                   className={`px-3 py-1 rounded ${
//                     product.isHotDeal ? "bg-green-500 text-white" : "bg-gray-300"
//                   }`}
//                   onClick={() => handleHotDealToggle(product._id, product.isHotDeal, product.discount)}
//                 >
//                   {product.isHotDeal ? "Active" : "Inactive"}
//                 </button>
//               </td>
//               <td className="p-2">
//                 <input
//                   type="number"
//                   value={product.discount}
//                   className="border p-1 w-20"
//                   onChange={e => handleDiscountChange(product._id, e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HotDealManager;
import { useEffect, useState } from "react";
import axios from "axios";

const HotDealManager = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleHotDealToggle = async (id, isHotDeal, discount) => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/hotdeal/${id}`,
        { isHotDeal: !isHotDeal, discount: discount || 0 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isHotDeal: !isHotDeal } : p
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDiscountChange = (id, value) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, discount: value } : p))
    );
  };

  const handleHeroOffer = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/hero/${id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Refresh product list to reflect new hero offer
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);

      alert("✅ Hero offer set successfully!");
    } catch (error) {
      console.error("Hero offer error:", error);
      alert("Failed to set hero offer");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🔥 Hot Deal Management</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Price</th>
            <th>Hot Deal</th>
            <th>Discount (%)</th>
            <th>Hero Offer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="p-2">{product.name}</td>
              <td className="p-2">${product.previousPrice}</td>

              <td className="p-2">
                <button
                  className={`px-3 py-1 rounded ${
                    product.isHotDeal
                      ? "bg-green-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() =>
                    handleHotDealToggle(
                      product._id,
                      product.isHotDeal,
                      product.discount
                    )
                  }
                >
                  {product.isHotDeal ? "Active" : "Inactive"}
                </button>
              </td>

              <td className="p-2">
                <input
                  type="number"
                  value={product.discount || ""}
                  className="border p-1 w-20"
                  onChange={(e) =>
                    handleDiscountChange(product._id, e.target.value)
                  }
                />
              </td>

              <td className="p-2">
                <button
                  className={`px-3 py-1 rounded ${
                    product.heroOffer ? "bg-yellow-500 text-white" : "bg-gray-300"
                  }`}
                  onClick={() => handleHeroOffer(product._id)}
                >
                  {product.heroOffer ? "Hero Active" : "Set Hero"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotDealManager;
