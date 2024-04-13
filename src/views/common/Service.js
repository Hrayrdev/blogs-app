import {PostsService} from "@/views/posts/services/Posts-service";
import {BlogsService} from "@/views/blogs/services/Blogs-service";

export const Service = {
    async doCommand(command, subcommand, newItemData) {

        switch (command) {
            case 'posts':
                switch (subcommand) {
                    case 'create':
                        // await store.dispatch('addPosts', {newItemData})
                        // await PostsService.createPosts(newItemData)
                        break
                    case 'delete':
                        await PostsService.deletePosts(newItemData)
                        break
                    case 'get':
                        if (newItemData) {
                            switch ('sortBy' in newItemData) {
                                case true :
                                    return  await PostsService.getPosts(undefined, undefined, newItemData.sortBy, newItemData.sortDirection)
                                    break
                                case  false:
                                    return await PostsService.getPosts(newItemData.pageNumber, newItemData.pageSize)
                                    break
                            }
                        } else {
                            return await PostsService.getPosts()
                        }
                        break
                    case 'update':
                        await PostsService.updatePosts(newItemData)
                        break
                }
            case  'blogs':
                switch (subcommand) {
                    case 'create':
                        await  BlogsService.createBlog(newItemData)
                        break
                    case 'delete':
                        await BlogsService.deleteBlog(newItemData)
                        break
                    case 'get':
                        break
                    case 'update':
                    await BlogsService.updateBlog(newItemData)
                }

        }
    },
}