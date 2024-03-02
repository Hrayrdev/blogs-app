export const BlogsService = {
    url: 'https://app-h4.vercel.app',
    pageNumber: null,
    pageSize: null,
    sortBy: '',
    sortDirection: '',
    searchData: '',
    async getBlogs(pageSize = undefined, pageNumber = undefined, sortBy = undefined, sortDirection = undefined, searchData = undefined) {
        this.pageNumber = pageNumber ? pageNumber : this.pageNumber
        this.pageSize = pageSize ? pageSize : this.pageSize
        this.sortBy = sortBy ? sortBy : this.sortBy
        this.sortDirection = sortDirection ? sortDirection : this.sortDirection
        if (searchData) {
            this.searchData = searchData.isSearch ? searchData.value : ''
        }
        const response = await fetch(`${this.url}/blogs?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&sortBy=${this.sortBy}&sortDirection=${this.sortDirection}&searchNameTerm=${this.searchData}`)
        await this.getBlogsLength()

        return (await response.json()).items

    },
    async getBlogsLength() {


        const response = await fetch(`${this.url}/blogs?searchNameTerm=${this.searchData}`)
        return (await response.json()).items.length
    },
    async createBlog(data) {

        const response = await fetch(`${this.url}/blogs`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
                body: data,
            }
        )
    },
    async updateBlog(data, id) {
        const response = await fetch(`${this.url}/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
                body: data,
            }
        )
    },
    async deleteBlog(id) {
        const response = await fetch(`${this.url}/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
            }
        )

    }


}