import rawg from "../apis/rawg";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Trailers from "../components/Trailers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { db, auth } from "../authentication/firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { addGamesDetail, getGamesDetail } from "../app/gameSlice";
import { getUserData } from "../app/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DetailGame = () => {
  const gamesDetail = useSelector(getGamesDetail);
  const list = useSelector(getUserData);
  const [loading, setLoading] = useState(false);
  const [isExist, setIsExist] = useState(false);
  console.log(isExist);
  let params = useParams();
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const saveToFavorites = async (id) => {
    try {
      await updateDoc(
        doc(db, "favorites", id),
        {
          game: arrayUnion({
            id: gamesDetail.id,
            name: gamesDetail.name,
            slug: gamesDetail.slug,
            background_image: gamesDetail.background_image,
          }),
        },
        alert(`Game ${gamesDetail.name} added to whishlist`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleExist = () => {
    const param = parseInt(params.gameId);
    const databaru = list.game?.find((e) => e.id === param);
    console.log(databaru);
    if (databaru) {
      setIsExist(true);
    } else {
      setIsExist(false);
    }
  };

  useEffect(() => {
    const fetchDataGamesDetail = async () => {
      try {
        setLoading(true);
        const responseDariRAWG = await rawg.get(`/games/${params.gameId}`);
        dispatch(addGamesDetail(responseDariRAWG.data));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataGamesDetail();
    handleExist();
    // eslint-disable-next-line
  }, [list]);

  return (
    <div className="bg-gray-100" style={{ paddingTop: "3rem" }}>
      <div
        className="detailGame"
        style={{
          position: "relative",
          backgroundImage:
            gamesDetail.background_image_additional !== null
              ? `url(${gamesDetail.background_image_additional})`
              : `url(${gamesDetail.background_image})`,
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          marginTop: 0,
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(250,245,245,0) 0%, rgba(255,255,255,1) 100%)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Navbar />
          <Card
            className="boxy"
            sx={{
              background: {
                xs: "white",
                sm: "white",
                md: "rgba(79, 79, 79, 0.5)",
                xl: "rgba(79, 79, 79, 0.5)",
              },
              position: "relative",
              marginTop: 0,
              height: "max-content",
              overflow: "visible",
            }}
          >
            <Box
              className="boxy"
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                },
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "30%",
                    lg: "30%",
                  },
                }}
              >
                {loading === true ? (
                  <Skeleton height={320} width={320} />
                ) : (
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: "5px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      height: {
                        xs: "30vh",
                        sm: "30vh",
                        md: "50vh",
                        lg: "50vh",
                      },
                      objectFit: "cover",
                      width: {
                        xs: "60vh",
                        sm: "60vh",
                        md: "50vh",
                        lg: "50vh",
                      },
                    }}
                    image={`${gamesDetail.background_image}`}
                    alt={gamesDetail.title}
                  />
                )}
                <Typography
                  variant="body1"
                  sx={{
                    color: {
                      xs: "black",
                      sm: "black",
                      md: "black",
                    },
                    fontWeight: "bolder",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  Get It now :
                </Typography>
                {gamesDetail.stores?.length > 0 ? (
                  <ul
                    style={{ textAlign: "center" }}
                    className="text-black md:text-black"
                  >
                    {gamesDetail.stores &&
                      gamesDetail.stores.map((store) => {
                        const { id, name, domain } = store.store;
                        return (
                          <li key={id}>
                            <a
                              href={`https://${domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {name}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: {
                        xs: "black",
                        sm: "black",
                        md: "black",
                      },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Sorry We Couldn't Find Any Stores
                  </Typography>
                )}
                <Box
                  sx={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  {isExist ? (
                    <Link to={"/wishlist"}>
                      <Button variant="contained">Already in whishlist</Button>
                    </Link>
                  ) : (
                    <Button
                      sx={{
                        background: "green",
                        color: "white",
                        width: "100%",
                      }}
                      onClick={() => saveToFavorites(user?.uid)}
                    >
                      Save
                    </Button>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  width: {
                    md: "70%",
                    sm: "100%",
                  },
                }}
              >
                {loading === true ? (
                  <Skeleton count={10} height={30} />
                ) : (
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      width: 1,
                      color: {
                        xs: "black",
                        sm: "black",
                        md: "black",
                      },
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{ fontWeight: "bold" }}
                      variant="h3"
                    >
                      {gamesDetail.name}
                    </Typography>
                    <ul
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        alignItems: "baseline",
                      }}
                    >
                      {gamesDetail.parent_platforms &&
                        gamesDetail.parent_platforms.map((platform) => {
                          const { id, slug } = platform.platform;
                          return (
                            <li key={id}>
                              <img
                                style={{ width: "20px" }}
                                src={
                                  slug !== "3do"
                                    ? require(`../platforms/${slug}.svg`)
                                    : require(`../platforms/android.svg`)
                                }
                                alt={id}
                              />
                            </li>
                          );
                        })}
                    </ul>

                    <Typography variant="body2">
                      Developer:{" "}
                      {gamesDetail.developers?.map((developer) => {
                        const { name } = developer;
                        return <Typography variant="body2">{name}</Typography>;
                      })}
                    </Typography>
                    <Typography variant="body2">
                      Release date: {gamesDetail.released}
                    </Typography>
                    <Typography variant="body2">
                      Playtime :{" "}
                      {gamesDetail.playtime > 0
                        ? `${gamesDetail.playtime} Hours`
                        : "Unknown"}
                    </Typography>
                    <Typography variant="body2">
                      Website :{" "}
                      {gamesDetail.website ? (
                        <Typography variant="body2">
                          <a href={gamesDetail.website}>
                            {gamesDetail.website}
                          </a>
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          There are no website for this game
                        </Typography>
                      )}
                    </Typography>
                    <Rating
                      name="half-rating-read"
                      value={gamesDetail.metacritic / 2}
                      precision={0.5}
                      readOnly
                    />

                    <Typography variant="body2">
                      Description : <br />{" "}
                      {gamesDetail.description?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </Typography>
                  </CardContent>
                )}
              </Box>
            </Box>
          </Card>

          {gamesDetail.screenshots_count > 0 ? <Trailers /> : ""}

          <Footer sta="gray" />
        </div>
      </div>
    </div>
  );
};

export default DetailGame;
