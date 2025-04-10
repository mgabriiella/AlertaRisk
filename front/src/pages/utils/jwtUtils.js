//Como o token tá vinco como string, colocamos um decodificador para pegar infos do user(mais o ID);
// A estrutura:
// {
//     "userId": "1234",
//     "nome": "nome Exemplo",
//     "role": "user",
//     "exp": 1712100000
//   }

export function decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error("Erro ao decodificar token:", e);
      return null;
    }
  }
  