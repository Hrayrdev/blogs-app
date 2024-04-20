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
            state.users.forEach((user) => {
                if (user.email === payload.email) {
                    user.yourRequestFriends.unshift(payload.recipient)
                }
            })
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        deleteRequestFriends(state, payload) {
            state.users.forEach((user, index) => {
                if (user.email === payload.email) {
                    user.yourRequestFriends.forEach((request, index) => {
                        if (request.email === payload.recipient.email) {
                            user.yourRequestFriends.splice(index, 1)
                        }
                    })
                }
            })
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        addSubscriber(state, payload) {
            state.users.forEach((user) => {
                if (user.email === payload.email) {
                    user.requestFriendsForYou.unshift(payload.sender)
                }
            })
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        deleteSubscriber(state, payload) {
            state.users.forEach((user, index) => {
                if (user.email === payload.email) {
                    console.log(user.requestFriendsForYou)
                    user.requestFriendsForYou.forEach((request, index) => {
                        if (request.email === payload.sender.email) {
                            user.requestFriendsForYou.splice(index, 1)
                        }
                    })
                }
            })
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
                if (user.email === payload.sender.email) {
                    for (let request of user.yourRequestFriends) {
                        if (request.email === payload.recipient.email) {
                            return commit('deleteRequestFriends', {email: user.email, recipient: payload.recipient})
                        }
                    }
                    let recipient = JSON.parse(JSON.stringify(payload.recipient))

                    for (let i in recipient) {
                        if (i !== 'email' && i !== 'login') {
                            delete recipient[i]
                        }
                    }
                    console.log(222222)

                    commit('doRequestFriends', {email: user.email, recipient: recipient})
                }
                if (user.email === payload.recipient.email) { //find METHOD ARRAY
                    for (let request of user.requestFriendsForYou) {
                        if (request.email === payload.sender.email) {
                            return commit('deleteSubscriber', {email: user.email, sender: payload.sender})//delete
                        }
                    }
                    let sender = JSON.parse(JSON.stringify(payload.sender))

                    for (let i in sender) {
                        if (i !== "email" && i !== 'login') {
                            delete sender[i]
                        }
                    }
                    console.log(5456456456456546)

                    commit('addSubscriber', {email: user.email, sender: sender})
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

            // console.log(users)
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
            dispatch('addFriends', {sender:sender, recipient: recipient})
        }//|| user.email === payload.recipient

    },
    getters: {
        users(state) {
            // getUsers(state) {
            return state.users
        }
    }
}