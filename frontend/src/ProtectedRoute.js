import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth(); // 🔥 CONTEXT SE

  const isDemo =
    sessionStorage.getItem("OPEN_DASHBOARD_AFTER_LOGIN") === "true";

  // 🔒 BLOCK ONLY NORMAL USERS
  if (!isLoggedIn && !isDemo) {
    return <Navigate to="/login" replace />;
  }

  // ✅ ALLOW ACCESS
  return children;
}

export default ProtectedRoute;
