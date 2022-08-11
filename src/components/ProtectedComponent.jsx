import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";
import LoadingPage from "../containers/LoadingPage";

const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const us = await user;
        loading(true);
        if (!us) {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else {
    return children;
  }
};

export default ProtectedComponent;
