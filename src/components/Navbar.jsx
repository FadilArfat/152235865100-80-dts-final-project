import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, keluarDariAplikasi } from "../authentication/firebase";
import {
  BiBookHeart,
  BiLogOut,
  BiHome,
  BiMenu,
  BiJoystickAlt,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import { getUserData } from "../app/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
  let navigate = useNavigate();
  const list = useSelector(getUserData);
  const [user] = useAuthState(auth);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const buttonLogoutOnClickHandler = async () => {
    await keluarDariAplikasi();
    navigate("/home");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex-grow z-10 relative">
      <AppBar position="fixed" style={{ background: "white" }}>
        <Toolbar
          sx={{ width: "90%", margin: "0 5% 0 5%", borderRadius: "10%" }}
        >
          <Link to="/" style={{ display: "flex", flexGrow: 1 }}>
            <Typography
              component="div"
              sx={{
                typography: { sm: "h6", xs: "caption" },
                flexGrow: 1,
                fontWeight: "bolder",
                textShadow: "text-shadow: -10px 1px 2px #000000",
              }}
              style={{ color: "red", fontWeight: "bolder" }}
            >
              GAMING{" "}
              <span style={{ color: "red", background: "white" }}>AND</span>{" "}
              CHILL
            </Typography>
          </Link>
          {!user && (
            <div className="flex flex-row md:gap-4 items-center">
              <Link to="/login">
                <p className="text-red-500 hover:text-red-700 font-bold">
                  Login
                </p>
              </Link>
              <Link to="/register">
                <button className="md:bg-red-500 bg-none hover:bg-red-700 text-red-500 md:text-white font-bold py-2 px-4 rounded">
                  Sign up
                </button>
              </Link>
            </div>
          )}
          {isMobile
            ? user && (
                <div className="relative">
                  <Button
                    onClick={toggleDropdown}
                    sx={{ color: "black" }}
                    startIcon={<BiMenu />}
                  >
                    Menu
                  </Button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg text-black ">
                      <MenuItem onClick={() => navigate("/home")}>
                        <BiHome style={{ marginRight: "5px" }} size={14} />
                        Home
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/")}>
                        <BiJoystickAlt
                          style={{ marginRight: "5px" }}
                          size={14}
                        />
                        Games
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/wishlist")}>
                        <BiBookHeart style={{ marginRight: "5px" }} size={14} />
                        WishList
                      </MenuItem>

                      <MenuItem onClick={buttonLogoutOnClickHandler}>
                        <BiLogOut style={{ marginRight: "5px" }} size={14} />
                        Logout
                      </MenuItem>
                    </div>
                  )}
                </div>
              )
            : user && (
                <div className="flex gap-4">
                  <NavLink
                    exact
                    to="/home"
                    className={({ isActive }) => {
                      return (
                        "flex flex-row items-center " +
                        (isActive ? "text-red-600" : "text-black")
                      );
                    }}
                  >
                    <BiHome style={{ marginRight: "5px" }} size={14} />
                    Home
                  </NavLink>
                  <NavLink
                    exact
                    to="/"
                    className={({ isActive }) => {
                      return (
                        "flex flex-row items-center " +
                        (isActive ? "text-red-600" : "text-black")
                      );
                    }}
                  >
                    <BiJoystickAlt style={{ marginRight: "5px" }} size={14} />
                    Games
                  </NavLink>
                  <NavLink
                    exact
                    to="/wishlist"
                    className={({ isActive }) => {
                      return (
                        "flex flex-row items-center mr-4 " +
                        (isActive ? "text-red-600" : "text-black")
                      );
                    }}
                  >
                    <BiBookHeart style={{ marginRight: "5px" }} size={14} />
                    WishList
                  </NavLink>
                </div>
              )}
          {user && !isMobile && (
            <Button
              color="inherit"
              onClick={buttonLogoutOnClickHandler}
              sx={{ background: "red" }}
            >
              <BiLogOut />
              Logout
            </Button>
          )}
          {user && (
            <Avatar
              alt="Remy Sharp"
              src={
                list.images === null || ""
                  ? "/static/images/avatar/1.jpg"
                  : list.images
              }
              sx={{ width: 26, height: 26, marginLeft: "1rem" }}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
