import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../authentication/firebase";
import { useDispatch } from "react-redux";
import { addUserData } from "../app/userSlice";
import Gaming from "../assets/listGame.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import PageWrapper from "../components/page-wrapper";

const Home = () => {
  const user = auth.currentUser;
  const dispatch = useDispatch();
  console.log("user now => ", user);

  useEffect(() => {
    const getData = async () => {
      try {
        onSnapshot(doc(db, "favorites", user?.uid), (doc) =>
          dispatch(addUserData(doc.data()))
        );
      } catch (error) {
        <Navigate to="/login" replace={true} />;
        console.log(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <PageWrapper className="overflow-hidden">
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-6xl text-black font-bold mb-4">
                Discover Exciting Games
              </h1>
              <p className="text-black text-lg mb-8">
                Search and explore a wide range of games from various genres.
                Find your favorites, read reviews, and enjoy endless hours of
                gaming fun.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:w-1/2"
            >
              <Lottie
                animationData={Gaming}
                loop={true}
                className="h-[30rem]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
