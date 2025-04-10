import { useEffect, useState } from "react";
import { apiconfig } from "../pages/Service/apiconfig";
import { decodeToken } from "../pages/utils/jwtUtils";
import { useToken } from "./userToken";

export const useEnderecoData = () => {
  const [enderecoId, setEnderecoId] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, loading: tokenLoading } = useToken();

  useEffect(() => {
    const fetchEnderecoFromUser = async () => {
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
        const userResponse = await apiconfig.get(`/users/${userId}`);
        const user = userResponse.data;

        if (user.enderecos && user.enderecos.length > 0) {
          const firstEndereco = user.enderecos[0];
          setEnderecoId(firstEndereco.id);
          setEnderecos([firstEndereco]);
        } else {
          throw new Error("Nenhum endereço encontrado para o usuário.");
        }
      } catch (err) {
        console.error("Erro ao buscar endereço:", err);
        setError(err.message || "Erro ao buscar endereço.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnderecoFromUser();
  }, [token, tokenLoading]);

  return { enderecoId, enderecos, loading: loading || tokenLoading, error };
};