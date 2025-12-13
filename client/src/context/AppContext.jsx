import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  // ----------------------
  // Token & Refresh Logic
  // ----------------------
  const setAuthToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = newToken;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const setAuthUser = (userObj) => {
    setUser(userObj || null);
  };

  const refreshToken = async () => {
    try {
      // include existing token in Authorization header so server can validate and refresh
      const currentToken = token || localStorage.getItem('token') || '';
      const headers = currentToken ? { Authorization: currentToken } : {};
      const { data } = await axios.post("/api/auth/refresh", {}, { withCredentials: true, headers });
      if (data?.success && data?.token) {
        setAuthToken(data.token);
        return data.token;
      } else {
        setAuthToken(null);
        return null;
      }
    } catch (err) {
      console.error('Refresh token error:', err?.response?.data || err.message || err);
      setAuthToken(null);
      return null;
    }
  };

  // ----------------------
  // Axios Interceptors
  // ----------------------
  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) config.headers.Authorization = token;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const status = error?.response?.status;

        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers["Authorization"] = newToken;
            return axios(originalRequest);
          } else {
            toast.error("Session expired. Please login again.");
          }
        } else if (status >= 400) {
          toast.error(error.response?.data?.message || "An error occurred");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [token]);

  // ----------------------
  // Fetch Blogs
  // ----------------------
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/add/all");
      if (data.success) setBlogs(data.blogs);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // Theme Toggle
  // ----------------------
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // ----------------------
  // Initial Load
  // ----------------------
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "undefined") {
      const cleanToken = storedToken.replace(/^"+|"+$/g, "");
      setAuthToken(cleanToken);
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const value = {
    axios,
    token,
    user,
    setToken: setAuthToken,
    setUser: setAuthUser,
    blogs,
    setBlogs,
    input,
    setInput,
    theme,
    toggleTheme,
    fetchBlogs,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
