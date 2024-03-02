import {createRouter, createWebHistory} from 'vue-router'
import BlogsList from "@/views/blogs/BlogsList.vue";
import PostsList from "@/views/posts/PostsList.vue";

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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
