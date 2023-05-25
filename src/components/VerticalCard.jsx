import React from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineCalendar,
} from "react-icons/ai";

function VerticalCard() {
  return (
    <div className="flex flex-col md:flex-row container mx-auto px-4 pb-16 gap-4 md:gap-0 ">
      <div className="bg-white rounded-lg  p-4 mb-4 md:flex md:flex-col md:w-1/3">
        <div className="md:flex-shrink-0">
          <div className="flex items-start justify-center md:justify-start ml-4 text-red-600 rounded-md">
            <AiOutlineSearch size={100} className="fill-current" />
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <h3 className="text-xl md:text-2xl py-4 font-bold">Game Search</h3>
          <p className="mt-2 text-gray-600">
            Easily search for your favorite games or discover new titles in our
            extensive game library. Our powerful search feature allows you to
            find games based on title, genre, platform, and more. With just a
            few clicks, you'll have access to a vast collection of games to
            explore.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg  p-4 mb-4 md:flex md:flex-col md:w-1/3">
        <div className="md:flex-shrink-0">
          <div className="flex items-start justify-center md:justify-start  ml-4 text-red-600 rounded-md">
            <AiOutlineHeart size={100} className="fill-current" />
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <h3 className="text-xl md:text-2xl py-4 font-bold">Wishlist</h3>
          <p className="mt-2 text-gray-600">
            Create your personalized wishlist of games you desire to play. Keep
            track of upcoming releases and save your favorite titles for later.
            Stay updated and never miss out on the games you love.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg  p-4 mb-4 md:flex md:flex-col md:w-1/3">
        <div className="md:flex-shrink-0">
          <div className="flex items-start justify-center md:justify-start  ml-4 text-red-600 rounded-md">
            <AiOutlineCalendar size={100} className="fill-current" />
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <h3 className="text-xl md:text-2xl py-4 font-bold">
            Release Calendar
          </h3>
          <p className="mt-2 text-gray-600">
            Stay informed about the latest game releases with our release
            calendar. Get access to the most up-to-date information about launch
            dates, events, and game updates. Never miss a game release and plan
            your gaming adventures ahead of time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerticalCard;
