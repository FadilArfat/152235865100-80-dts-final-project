import React from "react";
import Ea from "../assets/Electronic_Arts-Logo.wine.svg";
import Activision from "../assets/Blizzard_Entertainment-Logo.wine.svg";
import Ubisoft from "../assets/Ubisoft-Logo.wine.svg";
import T2 from "../assets/Take-Two_Interactive-Logo.wine.svg";
import Nintendo from "../assets/Nintendo-Logo.wine.svg";
import SquareEnix from "../assets/Square_Enix-Logo.wine.svg";

function Featured() {
  const logo = [Ea, Activision, Ubisoft, T2, Nintendo, SquareEnix];
  return (
    <div className="w-full text-center">
      <div>
        <p className="text-gray-500 font-bold">FEATURED PUBLISHERS</p>
      </div>
      <div className="flex flex-wrap justify-center mt-4 md:mt-0 md:space-x-0 md:pt-[1rem]">
        {logo.map((isi, i) => (
          <img
            key={i}
            className="w-[200px] filter grayscale hover:filter-none transition duration-300 ease-in-out"
            src={isi}
            alt={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Featured;
