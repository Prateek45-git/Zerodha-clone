export const openDashboardSafely = async (navigate) => {
  try {
    const res = await fetch(
      "https://zerodha-backend.onrender.com/api/auth/demo-login",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (res.ok) {
      window.location.href = "http://localhost:3001";
    }
  } catch {
    navigate("/login");
  }
};

