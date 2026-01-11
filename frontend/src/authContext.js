// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const [token, setToken] = useState(() => {
//     return localStorage.getItem("token") || null;
//   });

 
//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", authToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);

//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
