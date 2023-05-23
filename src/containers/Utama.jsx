import React from "react";
import Lottie from "lottie-react";
import Gaming from "../assets/new-gaming.json";
import CarousellHome from "../components/CarousellHome";
import { Link } from "react-router-dom";

function Utama() {
  return (
    <div className="">
      <div className="bg-red-600">
        <div className="container mx-auto px-4 py-16 ">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-6xl text-white font-bold mb-4">
                Welcome to our Game Library!
              </h1>
              <p className="text-white text-lg mb-8">
                Discover and explore a vast collection of games in our database.
                Whether you're searching for the latest releases or timeless
                classics, we have it all. Use our search feature to find your
                favorite games and dive into thrilling adventures.
              </p>
              <Link to={"/"}>
                <button className="bg-gray-100 hover:bg-gray-200 text-red-500 font-bold py-2 px-4 rounded">
                  Get Started
                </button>
              </Link>
            </div>
            <div className="lg:w-1/2">
              <Lottie animationData={Gaming} loop={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-0 px-0 mb-14">
        <CarousellHome />
      </div>
    </div>
  );
}

export default Utama;
