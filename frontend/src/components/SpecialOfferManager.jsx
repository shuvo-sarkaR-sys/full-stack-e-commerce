import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/API";
const SpecialOfferManager = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSpecialOffer = async (id, specialOffer, offerEndTime, discount) => {
    try {
      await axios.put(
        `${API_BASE_URL}/products/special-offer/${id}`,
        { specialOffer: !specialOffer, offerEndTime, discount },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, specialOffer: !specialOffer } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, [field]: value } : p
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Slider Special Offer Manager</h2>
      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-gray-200 ">
          <tr>
            <th className="py-2">Name</th>
            <th>Price</th>
            <th>Discount (%)</th>
            <th>Offer Ends</th>
            <th>Set Offer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b border-gray-300">
              <td className="p-3">{p.name}</td>
              <td>${ p.offerPrice}</td>
              <td>
                <input
                  type="number"
                  value={p.discount || ""}
                  className="border border-gray-300 p-1 w-20"
                  onChange={(e) =>
                    handleInputChange(p._id, "discount", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="datetime-local"
                  value={
                    p.offerEndTime
                      ? new Date(p.offerEndTime).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange(p._id, "offerEndTime", e.target.value)
                  }
                  className="border border-gray-300 p-1"
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    handleSpecialOffer(
                      p._id,
                      p.specialOffer,
                      p.offerEndTime,
                      p.discount
                    )
                  }
                  className={`px-3 text-sm font-semibold py-1 rounded ${
                    p.specialOffer ? "bg-green-500   text-white" : "bg-gray-300"
                  }`}
                >
                  {p.specialOffer ? "Active" : "Set Offer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpecialOfferManager;
