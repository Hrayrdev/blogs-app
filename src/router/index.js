import {createRouter, createWebHistory} from 'vue-router'
import BlogsList from "@/views/blogs/BlogsList.vue";
import PostsList from "@/views/posts/PostsList.vue";
import UsersList from "@/views/users/UsersList.vue";
import Likes from '@/views/likes/Likes.vue'
const routes = [
    {
        path: '/blogs',
        name: 'Blogs',
        component: BlogsList
    },
    {
        path: '/posts/:blogId',
        name: 'Posts',
        component: PostsList
    },
    {
        path: '/users',
        name: 'Users',
        component: UsersList
    },
    {
        path: '/likes',
        name: 'Likes',
        component: Likes
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
