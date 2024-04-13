export const command = {
    state: {},
    mutations: {},
    actions: {
       async queryChecking({dispatch}, data) {
            let type = data[0].type
            let command = data[0].action
           let newItemData
           if (data[1]) {
               newItemData = data[1]
           }


            switch (type) {
                case 'posts':
                    switch (command) {
                        case 'create':
                           await dispatch('addPosts', newItemData)
                            break
                        case 'delete':
                            await dispatch('deletePosts', newItemData)
                            break
                        case 'get':
                            await dispatch('getPosts', newItemData)
                            break
                        case 'update':
                            await dispatch('updatePosts', newItemData)
                            break
                    }
                case  'blogs':
                    switch (command) {
                        case 'create':
                            await dispatch('addBlogs', newItemData)
                            break
                        case 'delete':
                            await dispatch('deleteBlogs', newItemData)
                            break
                        case 'get':
                            // console.log(newItemData)
                            await dispatch('incrementAction', newItemData)
                            break
                        case 'update':
                            await dispatch('updateBlog', newItemData)
                            break
                    }

            }
        },


    },
    getters: {}

}