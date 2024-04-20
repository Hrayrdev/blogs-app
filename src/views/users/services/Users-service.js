import {API_URL} from "@/views/common/constants";

export const UsersService = {

    url: API_URL,


    async getUsers() {
        const response = await fetch(`${this.url}/users`, {
            method: 'GET',

            headers: {
                "content-type": "application/json",
                Authorization: 'Basic YWRtaW46cXdlcnR5'
            },
        })
        return (await response.json()).items

    },


    async createUsers(data) {
        const response = await fetch(`${this.url}/users`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
                body: data,
            }
        )
    },

    async deleteUsers(id) {
        const response = await fetch(`${this.url}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic YWRtaW46cXdlcnR5'
                },
            }
        )
    }
}
