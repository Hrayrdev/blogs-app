import {createStore} from 'vuex'
import {comments} from "@/store/comments";
import {likes} from "@/store/likes";
import {BlogsService} from "@/views/blogs/services/Blogs-service";
import { blogsStore} from "@/store/blogs";
import {postStore} from "@/store/posts";
import {command} from "@/store/command";
export default createStore({
    state: {
    },

    mutations: {

    },

    actions: {



    },
    getters: {

    },
    modules: {
        comment: comments,
        // like: likes,
        blogsStore: blogsStore,
        posts: postStore,
        command:command,

    }

})


