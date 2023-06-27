import React from "react";
import Lottie from "lottie-react";
import Gaming from "../assets/new-gaming.json";
import CarousellHome from "../components/CarousellHome";
import { Link } from "react-router-dom";
import { auth } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Featured from "../components/Featured";
import VerticalCard from "../components/VerticalCard";
import Footer from "../components/Footer";
import PageWrapper from "../components/page-wrapper";
import { motion } from "framer-motion";

function Utama() {
  const [user] = useAuthState(auth);
  return (
    <PageWrapper className="overflow-hidden">
      <div className="bg-red-600 min-h-screen">
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
              <Link to={user ? "/" : "/login"}>
                <button className="bg-gray-100 hover:bg-gray-200 text-red-500 font-bold py-2 px-4 rounded">
                  Get Started
                </button>
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:w-1/2"
            >
              <Lottie animationData={Gaming} loop={true} />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        className="mx-0 px-0 my-14"
      >
        <CarousellHome />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        exit={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        className="md:pb-[10rem]"
      >
        <Featured />
      </motion.div>
      <div className="pt-[8rem] ">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          viewport={{ once: true }}
          className="text-black font-bold text-2xl md:text-5xl container px-8"
        >
          Discover Exciting Features
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
          exit={{ opacity: 0, x: -20 }}
          viewport={{ once: true }}
        >
          <VerticalCard />
        </motion.div>
      </div>

      <Footer sta={"gray"} />
    </PageWrapper>
  );
}

export default Utama;
