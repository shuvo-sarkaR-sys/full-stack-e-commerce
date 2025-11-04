import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
        <Navbar/>
    <section className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to <span className="font-semibold text-blue-600">ShopSmart</span> —
          your trusted destination for high-quality products at unbeatable prices.  
          Our mission is to provide an exceptional shopping experience with
          reliable service, secure payment options, and fast delivery.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">💎 Our Vision</h3>
            <p className="text-gray-600">
              To make online shopping easier, more affordable, and accessible for everyone — anytime, anywhere.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">🚀 Our Mission</h3>
            <p className="text-gray-600">
              We aim to deliver quality products and excellent customer support to build long-term trust.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">🤝 Our Promise</h3>
            <p className="text-gray-600">
              100% customer satisfaction, safe transactions, and fast shipping— guaranteed.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="text-gray-600 space-y-2">
            <li>✅ Free and fast shipping on eligible items</li>
            <li>✅ 24/7 customer support</li>
            <li>✅ Easy returns and secure checkout</li>
            <li>✅ Regular deals and exclusive offers</li>
          </ul>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default About;
