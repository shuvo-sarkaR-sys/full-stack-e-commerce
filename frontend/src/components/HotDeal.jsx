// import { useEffect, useState } from "react";
// import axios from "axios";

// const HotDealsSection = () => {
//   const [hotDeals, setHotDeals] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products/hotdeals")
//       .then(res => setHotDeals(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <section className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🔥 Hot Deals</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {hotDeals.map(product => (
//           <div key={product._id} className="border rounded-lg p-3">
//             <img src={product.images[0]} alt={product.name} className="h-40 w-full object-cover rounded" />
//             <h3 className="font-semibold mt-2">{product.name}</h3>
//             <div>
//               <span className="text-red-500 font-bold">
//                 ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
//               </span>
//               {product.discount > 0 && (
//                 <span className="line-through text-gray-500 ml-2">${product.price}</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HotDealsSection;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const HotDeal = () => {
  const [hotDeal, setHotDeal] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/hotdeals")
      .then(res => {
        if (res.data.length > 0) {
          setHotDeal(res.data[0]); // ✅ Take only the first hot deal product
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!hotDeal) return null; // or loading spinner

  const price = hotDeal.offerPrice || hotDeal.previousPrice || 0;
  const discountedPrice = hotDeal.discount
    ? price - (price * hotDeal.discount) / 100
    : price;

  return (
    <section className="p-6">
      
      <div className="w-[400px] h-[500px] relative mx-auto border border-gray-200 rounded-lg p-4 shadow-lg">
        <h2 className=" absolute bg-red-500 text-white rounded-lg top-0 left-0 p-2 font-bold mb-4">🔥 Hot Deal</h2>
        <img
          src={hotDeal.images?.[0]?.url}
          alt={hotDeal.name}
          className="h-[70%] w-full object-cover rounded"
        />
        <h3 className="font-semibold mt-3 text-[#425A8B] text-lg text-center">{hotDeal.name}</h3>
        <div className="text-center mt-2">
          <span className="text-[#425A8B]  font-bold text-xl">
            ${discountedPrice.toFixed(2)}
          </span>
          {hotDeal.discount > 0 && (
            <span className="line-through text-gray-500 ml-2">${price}</span>
          )}
        </div>
        <Link to={`/product/${hotDeal.slug}`}>
          <button className="mt-4 w-full cursor-pointer bg-orange-500 hover:bg-[#425A8B] text-white py-2 rounded">
            Buy Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HotDeal;
