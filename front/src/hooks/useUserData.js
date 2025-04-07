import { useEffect, useState } from "react";
import { apiconfig } from "../pages/Service/apiconfig";
import { decodeToken } from "../utils/jwtUtils";

//Foi nessecario a criação desse para reaproveitar os dados do usuario em diferentes componentes, pq o token tá sendo enviado como string.
export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token não encontrado.");
        setLoading(false);
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded?.sub) {
        setError("Token inválido.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiconfig.get(`/users/${decoded.sub}`);
        setUserData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao buscar dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { userData, loading, error };
};
