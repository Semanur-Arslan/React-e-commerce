import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bgImage1 from "../../images/bg-image.png";
import bgImage2 from "../../images/bg-image2.png";
import nature from "../../images/natural-48.png";
import glowing from "../../images/glowing.png";
import infoImg from "../../images/info-img.png";
import liImage from "../../images/li-element.svg";
import people1 from "../../images/people-1.png";
import people2 from "../../images/people-2.png";
import people3 from "../../images/people-3.png";
import star1 from "../../images/star-1.svg";
import star2 from "../../images/star-2.svg";
import star3 from "../../images/star-3.svg";

import { fetchProductList } from "../../Api";
import Card from "../../components/Card";

function Home() {
  const carouselRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [populer, setPopuler] = useState([]);

  useEffect(() => {
    fetchProductList({ pageParam: 1 }).then((data) => {
      setProducts(data.slice(0, 8));
      setPopuler(data.slice(0, 4));
    });

    const interval = setInterval(() => {
      const currentSlide = carouselRef.current.querySelector(
        ".carousel-item:not(.hidden)"
      );
      const nextSlide =
        currentSlide.nextElementSibling ||
        carouselRef.current.firstElementChild;

      currentSlide.classList.add("slide-out");
      nextSlide.classList.remove("hidden");
      setTimeout(() => {
        currentSlide.classList.remove("slide-out");
        currentSlide.classList.add("hidden");
      }, 1000); // Animasyon süresi
    }, 5000); // Otomatik geçiş süresi

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="carousel w-full h-96 relative overflow-hidden"
        ref={carouselRef}
      >
        <div
          id="slide1"
          className="carousel-item absolute top-0 left-0 w-full h-full bg-cover bg-center justify-center"
          style={{ backgroundImage: `url(${bgImage1})` }}
        >
          <div className="absolute inset-0 flex justify-center items-center w-3/4">
            <div className="text-white text-center  bg-white bg-opacity-50 p-3 md:p-10 rounded flex flex-col items-center">
              <img src={nature} alt="nature" />
              <h2 className=" text-xl md:text-3xl font-bold md:font-medium mb-4 text-accent">
                The nature candle
              </h2>
              <p className="text-sm md:text-lg text-accent">
                All handmade with natural soy wax, Candleaf is a companion for
                all your pleasure moments{" "}
              </p>
              <Link to={"/product"}>
                <button className="btn btn-primary border-0	mt-6 text-white">
                  Discovery our collection
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          id="slide2"
          className="carousel-item absolute top-0 left-0 w-full h-full bg-cover bg-center hidden"
          style={{ backgroundImage: `url(${bgImage2})` }}
        >
          <div className="absolute inset-0 flex justify-center items-center w-3/4">
            <div className="text-white text-center bg-white bg-opacity-50 p-3 md:p-10 rounded flex flex-col items-center">
              <img src={glowing} alt="glowing" />
              <h2 className="text-xl md:text-3xl font-bold md:font-medium mb-4 text-accent">
                The stylish candle
              </h2>
              <p className="text-sm md:text-lg text-accent">
                It accompanies every moment with its eye-catching and stylish
                designs.
              </p>
              <Link to={"/product"}>
                <button className="btn btn-primary border-0	mt-6 text-white">
                  See Our Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-24 mt-6">
        <h2 className="text-3xl font-medium mb-4 text-accent text-center mt-5">
          Products
        </h2>
        <p className="text-md  mb-4 text-accent text-center">
          Order it for you or for your beloved ones{" "}
        </p>

        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div w="%100" key={product._id}>
              <Card item={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-info mt-16 grid grid-cols-2 gap-4 items-center px-24">
        <div className="flex flex-col justify-start ">
          <h3 className="text-4xl font-medium mb-4 text-accent ">
            Clean and fragrant soy wax
          </h3>
          <p className="text-sm  mb-4 text-accent  text-primary">
            Made for your home and for your wellness
          </p>

          <ul className="text-accent text-sm mt-4 mb-8">
            <li className="py-2 flex">
              <img src={liImage} alt="info-img" />
              <h5 className="text-md font-medium mx-2">Eco-sustainable :</h5>
              <p className="text-md">
                All recyclable materials, 0% CO2 emissions
              </p>
            </li>
            <li className="py-2 flex">
              <img src={liImage} alt="info-img" />
              <h5 className="text-md font-medium mx-2">Hyphoallergenic :</h5>
              <p className="text-md">
                100% natural, human friendly ingredients
              </p>
            </li>
            <li className="py-2 flex">
              <img src={liImage} alt="info-img" />
              <h5 className="text-md font-medium mx-2">Handmade :</h5>
              <p className="text-md">All candles are craftly made with love.</p>
            </li>
            <li className="py-2 flex">
              <img src={liImage} alt="info-img" />
              <h5 className="text-md font-medium mx-2">Long burning :</h5>
              <p className="text-md">No more waste. Created for last long.</p>
            </li>
          </ul>

          <Link to={"/about"}>
            <button className="btn btn-primary btn-sm">Learn more</button>
          </Link>
        </div>
        <div className="flex justify-end ">
          <img src={infoImg} alt="info-img" />
        </div>
      </div>

      <div className="px-24 py-12 bg-neutral ">
        <h2 className="text-3xl font-medium mb-4 text-accent text-center mt-5">
          Testimonials
        </h2>
        <p className="text-md  mb-4 text-accent text-center">
          Some quotes from our happy customers
        </p>

        <div className="grid grid-cols-3 gap-12 mt-12 flex flex-col items-center text-center">
          <div className="card bg-white shadow-sm rounded flex flex-col items-center">
            <div className="w-24 mt-6">
          <img src={people1} alt="people" />
          </div>
            <div className="card-body flex flex-col items-center">
            <div className="w-32">
          <img src={star1} alt="star" />
          </div>
              <h2 className="font-medium">“I love it! No more air fresheners”</h2>
              <p className="text-secondary">Luisa</p>
              
            </div>
          </div>
          <div className="card  bg-white shadow-sm rounded flex flex-col items-center ">
          <div className="w-24 mt-6">
          <img src={people3} alt="people" />
          </div>
            <div className="card-body flex flex-col items-center">
            <div className="w-32">
          <img src={star3} alt="star" />
          </div>
          <h2 className="font-medium">“Looks very natural, the smell is awesome”</h2>
              <p className="text-secondary">Mart</p>
            </div>
          </div>
          <div className="card  bg-white shadow-sm rounded flex flex-col items-center">
          <div className="w-24 mt-6">
          <img src={people2} alt="people" />
          </div>
            <div className="card-body flex flex-col items-center">
            <div className="w-32">
          <img src={star2} alt="star" />
          </div>
          <h2 className="font-medium">“Raccomended for everyone”</h2>
              <p className="text-secondary">Edoardo</p>
            </div>
          </div>

        </div>
      </div>


      <div className="px-24 mt-12">
        <h2 className="text-3xl font-medium mb-4 text-accent text-center mt-5">
        Popular
        </h2>
        <p className="text-md  mb-4 text-accent text-center">
        Our top selling product that you may like
        </p>

        <div className="grid grid-cols-4 gap-6 mt-6">
          {populer.map((product) => (
            <div w="%100" key={product._id}>
              <Card item={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
