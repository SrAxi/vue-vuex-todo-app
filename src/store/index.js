import Vue from 'vue'
import Vuex from 'vuex'
import {
    A_ADD_TODO,
    A_DELETE_TODO,
    A_EDIT_TODO,
    A_UPDATE_TODOS,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    SET_TODOS
} from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
    },
    mutations: {
        [SET_TODOS]: (state, payload) => state.todos = payload,
        [ADD_TODO]: (state, payload) => state.todos = [...state.todos, payload],
        [EDIT_TODO]: (state, payload) => {
            state.todos = [...state.todos.map(item => item.description === payload.description ? payload : item)]
        },
        [DELETE_TODO]: (state, payload) => {
            state.todos = [...state.todos.filter(item => item.description !== payload.description)]
        },
    },
    actions: {
        [A_UPDATE_TODOS]: ({ commit }, payload) => commit(SET_TODOS, payload),
        [A_ADD_TODO]: ({ commit }, payload) => commit(ADD_TODO, payload),
        [A_EDIT_TODO]: ({ commit }, payload) => commit(EDIT_TODO, payload),
        [A_DELETE_TODO]: ({ commit }, payload) => commit(DELETE_TODO, payload),
    },
    modules: {}
})
