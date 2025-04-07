import { useEffect, useState } from "react";
import { apiconfig } from "../pages/Service/apiconfig";
import { decodeToken } from "../utils/jwtUtils";
import { useToken } from "./useToken";

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
      if (!decoded?.sub) {
        setError("Token inválido.");
        setLoading(false);
        return;
      }

      try {
        const userResponse = await apiconfig.get(`/users/${decoded.sub}`);
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