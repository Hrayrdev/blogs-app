export const comments = {
    state:  {
        comment: 0,
    },
    mutations: {

        addComment(state, payload) {
            state.comment = payload
        },
        deleteComment(state, pool) {
            state.comment = pool *2
        }

    },
    actions: {

    },
    getters: {

    }
}
