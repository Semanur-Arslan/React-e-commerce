import { useState, createContext, useEffect, useContext } from "react";
import { fetchLogout, fetchMe } from "../Api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access-token');
        if (token) {
          const me = await fetchMe();
          setUser(me);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        console.error('Failed to fetch user details:', e);
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem('access-token', data.accessToken)
    localStorage.setItem('refresh-token', data.refreshToken)
  };

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);

    await fetchLogout();

    localStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token")
  }

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  if (loading) {
    return (
      <div>loading...</div>
    )
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }