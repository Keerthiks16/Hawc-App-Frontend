import AsyncStorage from "@react-native-async-storage/async-storage"; // <-- IMPORT THIS
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://lms.hawc.in/api/login", {
        email: email,
        password: password,
      });

      if (response.data.success) {
        const userData = response.data.data;
        setUserInfo(userData);
        setUserToken(userData.token);

        // Store user data using AsyncStorage
        await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
        await AsyncStorage.setItem("userToken", userData.token);
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    // Remove data from AsyncStorage
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUserInfo = await AsyncStorage.getItem("userInfo");

      if (storedToken && storedUserInfo) {
        setUserToken(storedToken);
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (e) {
      console.error("Error checking login status:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLecturer = userInfo?.role_name !== "student";

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo, isLecturer }}
    >
      {children}
    </AuthContext.Provider>
  );
};
