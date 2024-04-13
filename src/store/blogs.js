import {BlogsService} from "@/views/blogs/services/Blogs-service";

export const blogsStore = {
    state: {
        blogs: [],
        pageNumber: 1,
        pageSize: 2,
    },
    mutations: {
        setBlogs(state, blogs) {
            state.blogs = blogs
        },
        changePageNum(state,num) {
            state.pageNumber = num
        },
        changePageSize(state, newSize) {
            state.pageSize = newSize
        }

    },
    actions: {
        async incrementAction({commit, state}, payload) {
            let requestData = {}
            let blogs
            if (payload) {
                requestData.sortBy = payload.sortBy ? payload.sortBy : undefined
                requestData.sortDirection = payload.sortDirection ? payload.sortDirection : undefined
                payload.pageNumber ? commit('changePageNum', payload.pageNumber) : undefined
                payload.pageSize ? commit('changePageSize', payload.pageSize) : undefined
                requestData.searchData = payload.isSearch === Boolean(payload.isSearch) ? payload : undefined
            }
            if(requestData.sortBy === 'createdAt') {
                requestData.sortDirection = requestData.sortBy
            }
            requestData ? blogs = await BlogsService.getBlogs(state.pageSize, state.pageNumber, requestData.sortBy,requestData.sortDirection,requestData.searchData) : blogs = await BlogsService.getBlogs()
            commit('setBlogs', blogs)
        },
        async addBlogs(commit, payload) {
            await BlogsService.createBlog(payload)
        },
        async deleteBlogs(state, payload) {

            await BlogsService.deleteBlog(payload)
        },
        async deleteAll (state) {
            await BlogsService.deleteAll()
        },
        async updateBlog (state, payload) {
            await BlogsService.updateBlog(payload.data, payload.id)
        }


    },
    getters: {
        getBlogs(state) {
            return state.blogs
        }
    },

}