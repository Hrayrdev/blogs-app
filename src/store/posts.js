import {BlogsService} from "@/views/blogs/services/Blogs-service";
import {PostsService} from "@/views/posts/services/Posts-service";

export const postStore = {
    state: {
        posts: [],
    },
    mutations: {
        setPost(state, data){
            state.posts = data
        }
    },
    actions: {
        async getPosts({state, commit}, payload) {
            let requestData = {}
            let posts
            if (payload) {
                requestData.sortBy = payload.sortBy ? payload.sortBy : undefined
                requestData.sortDirection = payload.sortDirection ? payload.sortDirection : undefined
                requestData.pageNumber = payload.pageNumber ? payload.pageNumber : undefined
                requestData.pageSize = payload.pageSize ? payload.pageSize : undefined
                requestData.blogId = payload.blogId ? payload.blogId : undefined
            }

            posts = await PostsService.getPosts(requestData.pageNumber, requestData.pageSize, requestData.sortBy, requestData.sortDirection, requestData.blogId)
            commit('setPost', posts)
        },

        async addPosts({commit}, payload) {
            await PostsService.createPosts(payload)
        },

        async deletePosts(commit, payload){
            await PostsService.deletePosts(payload)
        },

        async updatePosts(commit, payload){
            await PostsService.updatePosts(payload)
        },

    },
    getters: {
        getPosts(state) {
            return state.posts
        }
    }
}
