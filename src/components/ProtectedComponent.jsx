import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "../containers/LoadingPage";

const ProtectedComponent = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    const checkUser = async () => {
      try {
        if (!user) {
          navigate("login");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
    // eslint-disable-next-line
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  } else {
    return <Outlet />;
  }
};

export default ProtectedComponent;
