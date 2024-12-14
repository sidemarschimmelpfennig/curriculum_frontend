import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1'; // Base URL da API

export default {
  /**
   * Faz login no servidor Laravel e retorna o token de autenticação.
   * @param {Object} credentials - Objeto contendo email e senha do usuário.
   * @returns {Object} - Retorna um objeto com o token.
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.data && response.data.data.token) {
        return { token: response.data.data.token };
      }
      throw new Error('Login falhou');
    } catch (error) {
      console.error('Erro no login:', error.response || error);
      throw error;
    }
  },

  /**
   * Valida o token do usuário junto ao servidor.
   * @param {String} token - Token do usuário.
   * @returns {Boolean} - Retorna `true` se o token for válido, caso contrário `false`.
   */
  async validateToken(token) {
    try {
      const response = await axios.get(`${API_URL}/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200; // Considera o token válido se a resposta for 200
    } catch (error) {
      console.error('Erro ao validar token:', error.response || error);
      return false; // Retorna false caso o token seja inválido
    }
  },

  /**
   * Faz logout no servidor e invalida o token (opcional).
   * @param {String} token - Token do usuário.
   * @returns {void}
   */
  async logout(token) {
    try {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Erro ao fazer logout:', error.response || error);
    }
  },
};
