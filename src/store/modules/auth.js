import axios from "@/util/axios";

export default {
  namespaced: true,
  state () {
    return {
      user: JSON.parse(localStorage.getItem('admin'))|| null,
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    login({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/login', payload).then((response) => {
          let user = response.data.data;
          commit('setUser', user);
          localStorage.setItem('admin', JSON.stringify(user));
          localStorage.setItem('permission', JSON.stringify(user.permissions));

          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          resolve(user);
        }).catch((error) => {
          reject(error.response.data)
        });
      });
    },
    logout({commit}) {
      commit('setUser', null);
      localStorage.removeItem('admin');
      localStorage.removeItem('permission');
      axios.defaults.headers.common['Authorization'] = null;
    },
  },
  getters: {
    getUser: (state) => state.user,
  }
}