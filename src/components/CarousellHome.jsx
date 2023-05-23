import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect } from "react";
import { db } from "../authentication/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

function CarousellHome() {
  const [isi, setIsi] = useState([]);
  const [loading, setLoading] = useState(true);

  const CustomPrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <svg
        width="98"
        height="93"
        viewBox="0 0 198 193"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M101.5 192.5C154.519 192.5 197.5 149.519 197.5 96.5V96.5C197.5 43.4807 154.519 0.5 101.5 0.5H0.5V192.5H101.5Z"
          fill="white"
        />
        <path
          d="M128 51L82 96.5L128 142"
          stroke="#FF0000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  // Custom arrow component for next arrow
  const CustomNextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <svg
        width="98"
        height="93"
        viewBox="0 0 198 193"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M96.5 192.5C43.4807 192.5 0.5 149.519 0.5 96.5V96.5C0.5 43.4807 43.4807 0.5 96.5 0.5H197.5V192.5H96.5Z"
          fill="white"
        />
        <path
          d="M70 51L116 96.5L70 142"
          stroke="#FF0000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  useEffect(() => {
    const ambilData = async () => {
      try {
        const getDataFromFB = [];
        const docRef = collection(db, "utamaImage");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
          getDataFromFB.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setIsi(getDataFromFB);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    ambilData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      showStatus={false}
      renderThumbs={() => null}
      showIndicators={false}
      centerMode={true}
      centerSlidePercentage={33.33}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <CustomPrevArrow onClick={onClickHandler} aria-label={label} />
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <CustomNextArrow onClick={onClickHandler} aria-label={label} />
        )
      }
    >
      {loading ? (
        <div className="carousel-item">
          <div className="relative mx-4">
            <div className="rounded-xl overflow-hidden hover:scale-110 transition duration-300">
              <div className="w-[500px] h-[200px] bg-gray-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        isi.map((p, index) => (
          <div key={index} className="carousel-item">
            <div className="relative mx-4">
              <div className="rounded-xl overflow-hidden hover:scale-110 transition duration-300">
                <img
                  src={p.img}
                  alt={`Gambar ${index + 1}`}
                  className="max-w-[500px] h-auto"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </Carousel>
  );
}

export default CarousellHome;
