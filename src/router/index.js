import {createRouter, createWebHistory} from 'vue-router'
import BlogsList from "@/views/blogs/BlogsList.vue";
import PostsList from "@/views/posts/PostsList.vue";
import UsersList from "@/views/users/UsersList.vue";
import Likes from '@/views/likes/Likes.vue'
import RegistrationMenuView from "@/views/users/views/RegistrationMenuView.vue";
import StartMenuView from "@/views/users/views/StartMenuView.vue";
import SignInView from "@/views/users/views/SignInView.vue";
import ChatView from "@/views/users/views/ChatView.vue";

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
        path: '/likes',
        name: 'Likes',
        component: Likes
    },


    {
        path: '/',
        name: 'StartMenu',
        component: StartMenuView
    },

    {
        path: '/registration',
        name: 'Registration',
        component: RegistrationMenuView
    },
    {
        path: '/users/:userId',
        name: 'Users',
        component: UsersList
    },
    {
        path: '/signIn',
        name: 'SingIn',
        component: SignInView
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChatView,
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
