import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const HotDeal = () => {
  const [hotDeal, setHotDeal] = useState(null);

    useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      const heroProduct = res.data.find((p) => p.heroOffer === true);
      setHotDeal(heroProduct);
    });
  }, []);

  if (!hotDeal) return null; // or loading spinner

  const price = hotDeal.offerPrice || hotDeal.previousPrice || 0;
  const discountedPrice = hotDeal.discount
    ? price - (price * hotDeal.discount) / 100
    : price;

  return (
    <section  >
      
      <div className="w-full md:w-[350px] h-[500px] relative mx-auto bg-[#FFF4F6] border border-gray-200 rounded-lg p-4 ">
        <h2 className=" absolute bg-orange-500 text-white rounded-lg text-sm top-0 left-0 p-2 font-bold mb-4">Hot Deal</h2>
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
