import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    // You can replace this alert with axios.post() to your backend route
  };

  return (
    <div>
        <Navbar/>
    <section className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">
          Have questions or feedback? We’d love to hear from you.  
          Fill out the form below or email us directly.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow space-y-5"
          >
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2"> Address</h3>
              <p className="text-gray-600">
               502 New Design Str, Melbourne, San Francisco, CA 94110, United States
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">📞 Phone</h3>
              <p className="text-gray-600">(+01) 0 123 456 789</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">📧 Email</h3>
              <p className="text-gray-600">support@shopsmart.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default Contact;
