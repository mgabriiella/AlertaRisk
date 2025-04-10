import { useEffect, useState } from "react";
import { apiconfig } from "../pages/Service/apiconfig";
import { decodeToken } from "../pages/utils/jwtUtils";
import { useToken } from "./userToken";

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, loading: tokenLoading } = useToken();

  useEffect(() => {
    const fetchUser = async () => {
      if (tokenLoading) return;

      if (!token) {
        setError("Token não encontrado.");
        setLoading(false);
        return;
      }

      const decoded = decodeToken(token);
      const userId = decoded?.sub || localStorage.getItem("userId");
      if (!userId) {
        setError("ID do usuário não encontrado.");
        setLoading(false);
        return;
      }

      if (!decoded || decoded.exp * 1000 < Date.now()) {
        setError("Token expirado ou inválido.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiconfig.get(`/users/${userId}`);
        setUserData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao buscar dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, tokenLoading]);

  return { userData, loading: loading || tokenLoading, error };
};