import authService from '../../services/authService';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    isAuthenticated: false,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    CLEAR_AUTH(state) {
      state.token = '';
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await authService.login(credentials);
        commit('SET_TOKEN', response.token);
        commit('SET_AUTHENTICATED', true);
        return true; // Retorna true para indicar sucesso
      } catch (error) {
        commit('CLEAR_AUTH');
        return false; // Retorna false para indicar falha
      }
    },
    async validateToken({ state, commit }) {
      if (!state.token) return false; // Se não houver token, não é válido
      try {
        const isValid = await authService.validateToken(state.token);
        commit('SET_AUTHENTICATED', isValid);
        return isValid; // Retorna true se o token for válido
      } catch (error) {
        commit('CLEAR_AUTH');
        return false; // Retorna false caso haja falha
      }
    },
    async logout({ state, commit }) {
      try {
        await authService.logout(state.token);
      } finally {
        commit('CLEAR_AUTH'); // Limpa o estado local mesmo se o logout no servidor falhar
      }
    },
  },
};
