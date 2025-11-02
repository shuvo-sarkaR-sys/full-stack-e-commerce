import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
const SpecialOfferSlider = () => {
  const [offers, setOffers] = useState([]);
  const [timeNow, setTimeNow] = useState(new Date()); // 🕒 Tracks current time continuously
console.log(offers)
  // Fetch offers from backend
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const filtered = res.data.filter(
          (p) => p.specialOffer && new Date(p.offerEndTime) > new Date()
        );
        console.log("special offers", filtered);
        setOffers(filtered);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  // 🧩 Update current time every second (keeps countdown live)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // // ⏳ Calculate remaining time
  // const getRemainingTime = (endTime) => {
  //   const diff = new Date(endTime) - timeNow;
  //   if (diff <= 0) return "Expired";
  //   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor(diff / (1000 * 60 * 60));
  //   const mins = Math.floor((diff / (1000 * 60)) % 60);
  //   const secs = Math.floor((diff / 1000) % 60);
  //   return `${days}d ${hours}h ${mins}m ${secs}s`;
  // };

   
   
  // Return separate parts for countdown
  const getRemainingParts = (endTime) => {
    const diff = new Date(endTime) - timeNow;
    if (diff <= 0) return { expired: true, days: 0, hours: 0, mins: 0, secs: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    return { expired: false, days, hours, mins, secs };
  };

  return (
    <div className="my-8">
      <div className="md:mx-18 mx-4  justify-between items-center mb-5 flex">
        <h2 className="md:text-3xl text-xl text-[#425A8B] font-bold   text-center">Latest Deals</h2>

        {offers.length > 0 && (
          <div className="text-lg  flex flex-wrap items-center gap-2">
            <span className="text-[#425A8B] font-semibold">Offer ends in:</span>
            {(() => {
              const parts = getRemainingParts(offers[0].offerEndTime);
              if (parts.expired) return <span className="text-[#425A8B]">Expired</span>;
              return (
                <div className="flex text-white gap-2 items-center">
                  <span className="px-2 py-1 bg-orange-500 rounded">
                    <strong>{parts.days}</strong> <small>D</small>
                  </span>
                  <span className="px-2 py-1 bg-orange-500 rounded">
                    <strong>{parts.hours}</strong> <small>H</small>
                  </span>
                  <span className="px-2 py-1 bg-orange-500 rounded">
                    <strong>{parts.mins}</strong> <small>M</small>
                  </span>
                  <span className="px-2 py-1 bg-orange-500 rounded">
                    <strong>{parts.secs}</strong> <small>S</small>
                  </span>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      <div className="md:mx-18 mx-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 3000}}
          loop={true}
        >
          {offers.map((product) => {
            const price = product.offerPrice || product.previousPrice || 0;
            const discountedPrice = product.discount
              ? price - (price * product.discount) / 100
              : price;
            const remaining = getRemainingParts(product.offerEndTime);

            return (
              <SwiperSlide key={product._id}>
                <div className="relative border border-gray-200 p-4 rounded-xl shadow-md bg-white">
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}

                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-[70%] m-auto   rounded-lg"
                  />
                  <h3 className="font-semibold line-clamp-1 mt-2">{product.name}</h3>

                  <div className="mt-2 flex flex-wrap-reverse items-center justify-between">
                    <span className="text-gray-500 text-sm line-through mr-2">
                      Regular Price: ${price}
                    </span>
                    <span className="text-green-600 text-sm font-bold">
                      Offer Price ${discountedPrice.toFixed(2)}
                    </span>
                  </div>

                 
                  <Link to={`/product/${product.slug}`}>
                    <button className="bg-orange-500 hover:bg-[#425A8B] mt-2 cursor-pointer text-white py-2 w-full rounded">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SpecialOfferSlider;
