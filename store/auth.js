import { recovery, persist } from '@/front/persistence'

export const state = () => ({
  token: recovery('token'),
  user: recovery('user')
})

export const mutations = {
  setUser(state, user) {
    persist('user', user)
    state.user = user
  },

  setToken(state, token) {
    persist('token', token)
    state.token = token
  }
}

export const getters = {
  isLoggedIn({ token }) {
    return !!token
  },

  currentUser({ user }) {
    return user
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    const payload = { email, password }
    return this.$axios.post('/api/auth/', payload).then((res) => {
      this.$axios.setToken(res.data.token, 'Bearer')
      commit('setToken', res.data.token)
      return commit('setUser', res.data.user[0])
    })
  },

  register({ commit, dispatch }, { email, password, role, fullName }) {
    return this.axios.post('/api/users', {
      email,
      password,
      role,
      fullName
    })
  },

  logout({ commit }) {
    commit('setToken', false)
    commit('setUser', false)
  }
}
