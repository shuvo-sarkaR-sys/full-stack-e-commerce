import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);

  const token = localStorage.getItem("usertoken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get("http://localhost:5000/api/cart", { headers })
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateQuantity = (productId, quantity) => {
    axios.put("http://localhost:5000/api/cart/update", { productId, quantity }, { headers })
      .then(res => setCart(res.data));
  };

  const removeItem = (productId) => {
    axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, { headers })
      .then(res => setCart(res.data));
  };

  if (!cart) return <p className="p-4">Loading cart...</p>;

  const totalPrice = cart.items.reduce((sum, item) => {
    const price = item.product.offerPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <div>
          {cart.items.map(item => (
            <div key={item.product._id} className="flex items-center justify-between border-b py-3">
              <div className="flex items-center gap-3">
                <img src={item.product.images[0]?.url} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p>${item.product.offerPrice || item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                  className="w-14 border p-1 text-center rounded"
                />
                <button onClick={() => removeItem(item.product._id)} className="text-red-500 font-semibold">Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right font-bold text-lg">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
