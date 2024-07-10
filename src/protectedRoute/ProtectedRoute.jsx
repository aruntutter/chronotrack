import { useContext } from "react";
import { Navigate } from "react-router-dom";
import myContext from "../context/myContext";

const ProtectedRoute = ({ children }) => {
  const context = useContext(myContext);
  const { isAuthenticated } = context;
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
