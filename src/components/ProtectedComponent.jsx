import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";

const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const us = await user;
        if (!us) {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return children;
  }
};

export default ProtectedComponent;
