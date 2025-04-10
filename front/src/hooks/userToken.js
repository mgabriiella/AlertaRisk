import { useState, useEffect } from "react";

export const useToken = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    setLoading(true);
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken || null);
    } catch (error) {
      console.error("Erro ao buscar o token:", error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return { token, loading, fetchToken };
};