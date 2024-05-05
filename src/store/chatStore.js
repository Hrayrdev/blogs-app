import {localeContextKey} from "element-plus";

export const chatStore = {
    state: {
        currentUser: [],
        usersInterlocutor: [],
        chats: [],

    },
    mutations: {
        setCurrentUser(state, payload) {
            state.currentUser = payload
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
        },
        setUsersInterlocutor(state, payload) {
            state.usersInterlocutor = payload
            localStorage.setItem('usersInterlocutor', JSON.stringify(state.usersInterlocutor))
        },
        setChats(state, payload) {
            state.chats = payload
            localStorage.setItem('chats', JSON.stringify(state.chats))

        }
    },
    actions: {
        createNewChat({state, commit}, payload) {
            let chats = []
            if (JSON.parse(localStorage.getItem('chats'))) {
                chats = JSON.parse(localStorage.getItem('chats'))
            }
            let currentChat = []
            currentChat.push([])
            currentChat.push(state.currentUser.id)
            currentChat.push(state.usersInterlocutor.id)
            let chat = chats.find((chat) => chat[1] === state.currentUser.id && chat[2] === state.usersInterlocutor.id || chat[2] === state.currentUser.id && chat[1] === state.usersInterlocutor.id)
            if (!chat) {
                chats.push(currentChat)
                commit('setChats', chats)
            }


        },
        async getChatUsers({state, commit}, payload) {
            let chats = await JSON.parse(localStorage.getItem('chats'))
            let currentUser = await JSON.parse(localStorage.getItem('currentUser'))
            let usersInterlocutor =await JSON.parse(localStorage.getItem('usersInterlocutor'))
             if (currentUser && usersInterlocutor) {
                 await commit('setCurrentUser', currentUser)
                 await commit('setUsersInterlocutor', usersInterlocutor)
                if (chats) {
                    await commit('setChats', chats)
                }
            }
        },
        newMessage({state, commit}, payload) {
            let chats = JSON.parse(localStorage.getItem('chats'))
            let chat = chats.find((chat) => chat[1] === state.currentUser.id && chat[2] === state.usersInterlocutor.id || chat[2] === state.currentUser.id && chat[1] === state.usersInterlocutor.id)
            if (payload) {
                chat[0].push([payload, state.currentUser.id])
            }
            commit('setChats', chats)
        },
    },


    getters: {
        getCurrentUser(state) {
            return state.currentUser
        },
        getUsersInterlocutor(state) {
            return state.usersInterlocutor
        },
        getOursChat(state) {

                let chat = state.chats.find((chat) => chat[1] === state.currentUser.id && chat[2] === state.usersInterlocutor.id || chat[2] === state.currentUser.id && chat[1] === state.usersInterlocutor.id)

                return chat

        }


    },
}