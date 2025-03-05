import axios from "axios";
import { API_URL } from "../constants/url";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      refreshToken,
    });
    const newAccessToken = response.data.accessToken;

    localStorage.setItem("token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("❌ Error al refrescar el token:", error);
    return null;
  }
};
