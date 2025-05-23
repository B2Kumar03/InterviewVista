import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: { name: "", email: "" },
  login: () => {},
  logout: () => {},
});

export const UserAuth = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  // On component mount, fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data) => {
    console.log(data);
    setUser({ name: data.user.name, email: data.user.email });
    localStorage.setItem("user", JSON.stringify({ name: data.user.name, email: data.user.email }));
    localStorage.setItem("token", data.token); // token is a string, not JSON
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser({ name: "", email: "" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, login,isLoggedIn,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
