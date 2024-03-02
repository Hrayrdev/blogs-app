import { createStore } from 'vuex'

export default createStore({
  state: {
    data: 0,
  },
  getters: {
    getSome(){
      console.log('sss')
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
