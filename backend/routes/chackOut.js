// // routes/checkout.js
// import express from "express";
// import SSLCommerzPayment from "sslcommerz-lts";
// import Cart from "../models/Cart.js";

// const router = express.Router();

// const store_id = process.env.SSL_STORE_ID;
// const store_passwd = process.env.SSL_STORE_PASS;
// const is_live = false; // true for production

// router.post("/create", async (req, res) => {
//   const { userId, email, phone, address } = req.body;

//   try {
//     const cart = await Cart.findOne({ user: userId }).populate("items.product");
//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const totalAmount = cart.items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     const data = {
//       total_amount: totalAmount,
//       currency: "BDT",
//       tran_id: `TXN_${Date.now()}`,
//       success_url: "http://localhost:5000/api/checkout/success",
//       fail_url: "http://localhost:5000/api/checkout/fail",
//       cancel_url: "http://localhost:5000/api/checkout/cancel",
//       ipn_url: "http://localhost:5000/api/checkout/ipn",
//       shipping_method: "Courier",
//       product_name: "Cart Products",
//       product_category: "Ecommerce",
//       product_profile: "general",
//       cus_name: email,
//       cus_email: email,
//       cus_add1: address,
//       cus_phone: phone,
//     };

//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//     sslcz.init(data).then(apiResponse => {
//       let GatewayPageURL = apiResponse.GatewayPageURL;
//       res.status(200).json({ url: GatewayPageURL });
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Checkout error", error });
//   }
// });

// export default router;
