export const userStore = {
    state: {
        users: [],
        // currentUser
    },
    mutations: {
        setUsers(state, payload) {
            state.users = payload
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        deleteUsers(state, payload) {
            state.users.splice(payload, 1)
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        doRequestFriends(state, payload) {
            state.users = payload
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        deleteRequestFriends(state, payload) {
            state.users = payload
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        addSubscriber(state, payload) {
            state.users = payload
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        deleteSubscriber(state, payload) {
            state.users = payload
            localStorage.setItem('users', JSON.stringify(state.users))
        },


    },
    actions: {
        createUsers({state, commit}, payload) {

            let users = JSON.parse(localStorage.getItem('users'))
            if (users && payload) {
                users.unshift(payload)
                return commit('setUsers', users)
            }
            return commit('setUsers', [payload])
        },
        getUsers({state, commit}) {
            let users = JSON.parse(localStorage.getItem('users'))
            if (users) {
                commit('setUsers', users)
            }
        },

        deleteUsers({state, commit}, payload) {
            state.users.forEach((user, index) => {
                if (user.email === payload) {
                    commit('deleteUsers', index)
                }
            })
        },

        addFriends({state, commit}, payload) {

            state.users.forEach((user) => {
                let users = JSON.parse(JSON.stringify(state.users))

                if (user.email === payload.sender.email) {
                    let request = user.yourRequestFriends.find((request) => request.email === payload.recipient.email)
                    if (request) {
                        let delUser = users.find((element) => element.email === user.email)
                        let request = delUser.yourRequestFriends.findIndex((request) => request.email === payload.recipient.email)
                        delUser.yourRequestFriends.splice(request, 1)
                        return commit('deleteRequestFriends', users)
                    }

                    let recipient = JSON.parse(JSON.stringify(payload.recipient))
                    for (let i in recipient) {
                        if (i !== 'email' && i !== 'login' ) {
                            delete recipient[i]
                        }
                    }
                    let doReqFriends = users.find((element)=> element.email === user.email)
                    doReqFriends.yourRequestFriends.unshift(recipient)
                    commit('doRequestFriends', users)
                }
                if (user.email === payload.recipient.email) { //find METHOD ARRAY\
                    let request = user.requestFriendsForYou.find((request) => request.email === payload.sender.email)
                    if (request) {
                        let usersTest = users.find((usersTest) => usersTest.email === user.email)
                        let request = usersTest.requestFriendsForYou.findIndex((request, num) => request.email === payload.sender.email)
                        usersTest.requestFriendsForYou.splice(request, 1)
                        return commit('deleteSubscriber', users)
                    }
                    let sender = JSON.parse(JSON.stringify(payload.sender))

                    for (let i in sender) {
                        if (i !== "email" && i !== 'login') {
                            delete sender[i]
                        }
                    }

                    let addSubUser = users.find((element) => element.email === user.email)
                    addSubUser.requestFriendsForYou.unshift(sender)
                    commit('addSubscriber', users)
                }
            })
        },
        acceptRequestFriend({state, commit}, payload) {
            const users = JSON.parse(JSON.stringify(state.users))

            let sender = users.find((user) => user.email === payload.sender)
            sender.yourRequestFriends.forEach((request, index) => {
                if (request.email === payload.recipient) {
                    sender.friends.unshift(request);
                    sender.yourRequestFriends.splice(index, 1)
                }
            })

            let recipient = users.find((user) => user.email === payload.recipient)

            recipient.requestFriendsForYou.forEach((request, index) => {
                if (request.email === payload.sender) {
                    recipient.friends.unshift(request)
                    recipient.requestFriendsForYou.splice(index, 1)
                }
            })
            commit('setUsers', users)
        },
        deviationRequestFriend({state, commit}, payload) {
            const users = JSON.parse(JSON.stringify(state.users))

            let sender = users.find((user) => user.email === payload.sender)
            sender.yourRequestFriends = sender.yourRequestFriends.filter((request) => request.email !== payload.recipient)

            let recipient = users.find((user) => user.email === payload.recipient)

            recipient.requestFriendsForYou = recipient.requestFriendsForYou.filter((request) => request.email !== payload.sender)

            commit('setUsers', users)
        },
        deleteFriend({state, commit, dispatch}, payload) {
            let users = JSON.parse(JSON.stringify(state.users))
            let sender
            let recipient
            users.forEach((user) => {
                if (user.email === payload.sender) {
                    user.friends = user.friends.filter((friend) => friend.email !== payload.recipient)
                    sender = user
                }
                if (user.email === payload.recipient) {
                    user.friends = user.friends.filter((friend) => friend.email !== payload.sender)
                    recipient = user
                }
            })

            commit('setUsers', users)
            dispatch('addFriends', {sender: sender, recipient: recipient})
        }

    },
    getters: {
            getUsers(state) {
            return state.users
        }
    }
}