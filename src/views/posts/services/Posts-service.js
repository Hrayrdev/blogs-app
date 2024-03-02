export const PostsService = {
    blogId: '',
    url: 'https://app-h4.vercel.app',
    pageNumber: null,
    pageSize: null,
    sortBy: '',
    sortDirection: '',

    async getPosts(pageNumber = undefined, pageSize = undefined, sortBy = undefined, sortDirection = undefined) {
        this.pageNumber = pageNumber ? pageNumber : this.pageNumber
        this.pageSize = pageSize ? pageSize : this.pageSize
        this.sortBy = sortBy ? sortBy : this.sortBy
        this.sortDirection = sortDirection ? sortDirection : this.sortDirection
        console.log(this.pageSize,this.pageNumber,this.sortBy,this.sortDirection, 'THIS')
        console.log(pageSize,pageNumber,sortBy,sortDirection)
        const response = await fetch(`${this.url}/posts?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&sortBy=${this.sortBy}&sortDirection=${this.sortDirection}`)

        await this.getPostsLength()
        return (await response.json()).items

    },

    async getPostsLength() {
        const response = await fetch(`${this.url}/posts`)
        return (await response.json()).items.length
    },


    async updatePosts(data, id) {
        const response = await fetch(`${this.url}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
                body: data,
            }
        )
    },

    async createPosts(data) {
        this.blogId = data.blogId
        const response = await fetch(`${this.url}/posts`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
                body: data,
            }
        )
    },
    async deletePosts(id) {
        const response = await fetch(`${this.url}/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
            }
        )
    }


}