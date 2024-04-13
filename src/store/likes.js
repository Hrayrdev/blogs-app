// import {createStore} from "vuex";
import {ref} from "vue";
import {BlogsService} from "@/views/blogs/services/Blogs-service";

// export const likes = {
//     state: {
//         loop: 5,
//         users: [{name: 'John', id: 10},
//             {name: 'Kevin', id: 20},
//             {name: 'Danil', id: 30}],
//         posts: [
//             {
//                 title: 'Post1',
//                 likes: 0,
//                 dislikes: 0,
//                 id: 1,
//                 likesId: [],
//                 likesInd: false,
//                 dislikesInd: false,
//                 newestLikes: []
//             },
//             {
//                 title: 'Post2',
//                 likes: 0,
//                 dislikes: 0,
//                 id: 2,
//                 likesId: [],
//                 likesInd: false,
//                 dislikesInd: false,
//                 newestLikes: []
//             },
//             {
//                 title: 'Post3',
//                 likes: 0,
//                 dislikes: 0,
//                 id: 3,
//                 likesId: [],
//                 likesInd: false,
//                 dislikesInd: false,
//                 newestLikes: []
//             },
//             {
//                 title: 'Post4',
//                 likes: 0,
//                 dislikes: 0,
//                 id: 4,
//                 likesId: [],
//                 likesInd: false,
//                 dislikesInd: false,
//                 newestLikes: []
//             },
//             {
//                 title: 'Post5',
//                 likes: 0,
//                 dislikes: 0,
//                 id: 5,
//                 likesId: [],
//                 likesInd: false,
//                 dislikesInd: false,
//                 newestLikes: []
//             },
//         ],
//
//     },
//
//     mutations: {
//         getBlogs(state, newUser) {
//             state.blogs = newUser
//         },
//         createUser(state, newUser) {
//             state.users.push(newUser)
//         },
//         addLike(state, value) {
//             state.loop += value
//             console.log(state.loop, 'st')
//         },
//         deleteLike(state, post) {
//             post.likes--
//         },
//         addDislike(state, post) {
//             post.dislikes++
//         },
//         deleteDislike(state, post) {
//         //     constext.state.posts.forEach((post) => {
//         //         if (post.id === postId) {
//         //             context.commit()
//         //         }
//         //     })
//         },
//         addLikeId(state, post) {
//             state.posts.forEach((data) => {
//                 if (data.id === post.postId) {
//                     data.likesId.unshift({name: post.name, id: post.id, event: post.event})
//                 }
//             })
//         },
//         deleteLikeId(state, post) {
//             state.posts.forEach((data) => {
//                 if (data.id === post.postId) {
//                     data.likesId.forEach((likedUser, index) => {
//                         if (likedUser.id === post.userId) {
//                             data.likesId.splice(index, 1)
//                         }
//                     })
//                 }
//             })
//         },
//         sortNewestLikes(state, postId) {
//
//             state.posts.forEach((post) => {
//                 if (post.id === postId) {
//
//                     post.newestLikes = (post.likesId.filter(item => item.event === 'like')).slice(0, 3)
//                 }
//             })
//         }
//
//     },
//     actions: {
//       async  getBlogs({state,commit}) {
//             let blogs = await BlogsService.getBlogs(pageSize.value, pageNumber.value)
//             commit('getBlogs', blogs)
//         },
//         addLike({state,commit}, postId) {
//             console.log(state.loop,'sl')
//             commit('addLike', postId)
//
//             // context.state.posts.forEach((post)=>{
//             //     if (post.id === postId) {
//             //         context.commit('addLike', post)
//             //     }
//             // })
//         },
//         deleteLike(context, postId) {
//             context.state.posts.forEach((post) => {
//                 if (post.id === postId) {
//                     context.commit('deleteLike', post)
//                 }
//             })
//         },
//         addDislike(context, postId) {
//             context.state.posts.forEach((post) => {
//                 if (post.id === postId) {
//                     context.commit('addDislike', post)
//                 }
//             })
//         },
//     },
//
//     getters: {
//         blogs(state){
//
//             return state.blogs
//         },
//         filteredBlogs(state){
//
//             // return state.blogs.filter()
//         },
//         getPostsMoreOneDislike(state) {
//             return state.posts.filter(_ => _.dislikes > 1)
//         }
//     },
//
//     modules: {}
//
//
// }