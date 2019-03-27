import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    dataTodo: [],
    filterCate: 'all',
    checkAll: false,
    dataCheck: [],
    dataCheckId: []
  },
  getters: {
    GETTER_TODO_FILTER: state => {
      if (state.filterCate === 'all') {
        return state.dataTodo
      } else if (state.filterCate === 'active') {
        return state.dataTodo.filter(todo => !todo.status)
      } else if (state.filterCate === 'done') {
        return state.dataTodo.filter(todo => todo.status)
      } else {
        return state.dataTodo
      }
    }
  },
  mutations: {
    SET_DATA_TODO: function (state, data) {
      state.dataTodo = data
    },
    SET_ADD_DATA: function (state, data) {
      state.dataTodo.unshift({
        id: data.id,
        name: data.name,
        status: data.status
      })
    },
    SET_UPDATE_DATA: function (state, data) {
      let index = state.dataTodo.findIndex(item => item.id === data.id)
      state.dataTodo[index].name = data.todoUpdate
    },
    SET_DELETE_DATA: function (state, data) {
      let index = state.dataTodo.findIndex(item => item.id === data)
      state.dataTodo.splice(index, 1)
    },
    SET_CHECK_DATA: function (state, data) {
      let index = state.dataTodo.findIndex(item => item.id === data)
      state.dataTodo[index].status = !state.dataTodo[index].status

      if (state.dataTodo[index].status) {
        state.dataCheck.push(state.dataTodo[index])
        state.dataCheckId.push(state.dataTodo[index].id)
        if (state.dataCheck.length === state.dataTodo.length) {
          state.checkAll = true
        }
      } else {
        state.dataCheck.splice(index, 1)
        state.checkAll = false
      }
    },
    SET_FILTER_DATA: function (state, data) {
      if (data === 'all') state.filterCate = 'all'
      else if (data === 'active') state.filterCate = 'active'
      else if (data === 'done') state.filterCate = 'done'
      else state.filterCate = 'all'
    },
    SET_CHECK_ALL_DATA: function (state, data) {
      state.checkAll = data
      state.dataTodo.forEach(item => {
        if (state.checkAll) {
          item.status = true
          state.dataCheck.push(item)
          state.dataCheckId.push(item.id)
        } else {
          item.status = false
          state.dataCheck = []
        }
      })
    },
    SET_REMOVE_ALL_DATA: function (state) {
      state.dataTodo = state.dataTodo.filter(item => !item.status)
      if (state.dataTodo.length === 0) state.checkAll = false
    }
  },
  actions: {
    GET_DATA_TODO: function (context) {
      return new Promise(function (resolve, reject) {
        axios.get('https://todoapp-express-api.herokuapp.com/api/v1/todos').then((res) => {
          resolve(res)
          context.commit('SET_DATA_TODO', res.data.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    ADD_DATA_TODO: function (context, data) {
      return new Promise(function (resolve, reject) {
        axios.post(`https://todoapp-express-api.herokuapp.com/api/v1/todos`, {name: data}).then((res) => {
          resolve(res)
          context.commit('SET_ADD_DATA', res.data.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    DELETE_DATA_TODO: function (context, id) {
      return new Promise(function (resolve, reject) {
        axios.delete(`https://todoapp-express-api.herokuapp.com/api/v1/todos/${id}`).then((res) => {
          resolve(res)
          context.commit('SET_DELETE_DATA', id)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    EDIT_DATA_TODO: function (context, newEdit) {
      return new Promise(function (resolve, reject) {
        axios.put(`https://todoapp-express-api.herokuapp.com/api/v1/todos/${newEdit.id}`,
          {id: newEdit.id, name: newEdit.name, status: newEdit.status})
          .then((res) => {
            resolve(res)
            context.commit('SET_UPDATE_DATA', {id: res.data.data.id, todoUpdate: res.data.data.name})
          }).catch((err) => {
            console.log(err)
          })
      })
    },
    REMOVE_MORE_DATA_TODO: function (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: `https://todoapp-express-api.herokuapp.com/api/v1/todos`,
          data: {ids: context.state.dataCheckId},
          headers: {'Content-Type': 'application/json'}
        }).then(function (res) {
          resolve(res)
          context.commit('SET_REMOVE_ALL_DATA')
        }).catch(function (err) {
          console.log(err)
        })
      })
    }
  }
})
