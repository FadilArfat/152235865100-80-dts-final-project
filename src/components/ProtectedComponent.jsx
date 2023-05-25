import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "../containers/LoadingPage";

const ProtectedComponent = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) {
      navigate("home");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedComponent;
