<template>
  <input-fild v-model="newUserName"/>
  <button type="primary" @click="createUser">add</button>
  <br>
  <br>
  <br>
  <div v-if="!userLogin">
    <div v-for="user in users">
      <div @click=" usersId = user.id;examination(true, user); " style="font-size: 20px;">{{ user.name }}</div>
      <br>
      <br></div>
  </div>


  <div v-if="userLogin" style="display:flex;">
    <div>


      <div v-for="(post,index) in posts">
        <div style="font-size: 20px;" @click=" examination(false)">{{ post.title }}</div>
        <div style="display: flex">
          <div>

            <el-button :type="`${post.likesInd ? 'success'   : 'info'}`" style="padding: 50px"
                       @click="updateLikeStatus(LIKES_STATUSES.LIKE, index)">Likes:{{
                post.likes
              }}
            </el-button>
            <div   v-for="user in post.newestLikes">
              <div v-if="user.event === LIKES_STATUSES.LIKE">

                {{ user.name }}
              </div>
            </div>

          </div>

          <div>

            <el-button :type="`${post.dislikesInd ? 'danger'   : 'info'}`" style="padding: 50px"
                       @click="updateLikeStatus(LIKES_STATUSES.DISLIKE, index)">Dislikes:{{
                post.dislikes
              }}
            </el-button>

          </div>

        </div>
      </div>
    </div>
    <div style="font-size: 30px;">{{ userName }}</div>
  </div>
</template>

<script setup>
import InputFild from "@/components/input-fild.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";

const LIKES_STATUSES = {LIKE: 'like', DISLIKE: 'dislike', NONE: 'none'}
let userLogin = ref(false)
let newUserName = ref('')
let userName = ref('')
let likesTypes = ref(false)
let dislikesTypes = ref(false)
let users = ref([])

let posts = ref([

])
let usersId = ref('')
let likesUser = ref([])






function updateLikeStatus(status, id) {

  let post = posts.value[id]
  if (post.likesId.length > 0) {
    let coincidence = 0
    post.likesId.forEach((data) => {
      if (data.id === usersId.value) {
        coincidence = 1
      }
    })
    if (coincidence === 0) {
      finalInspection(status, post)
    } else {

      if (status === LIKES_STATUSES.LIKE) {
        for (let i = 0; i < post.likesId.length; i++) {
          if (post.likesId[i].id === usersId.value) {
            if (status === post.likesId[i].event) {
              console.log(4)
              store.dispatch('deleteLike', post.id)
              store.commit('deleteLikeId' ,{userId: usersId.value, postId: post.id})
              store.commit('sortNewestLikes',  post.id)


            } else {
              store.dispatch("addLike", post.id)
              store.commit('deleteDislike', post.id)
              post.likesId[i].event = LIKES_STATUSES.LIKE
              let clone = JSON.parse(JSON.stringify(post.likesId[i]))
              clone.id = usersId.value
              clone.postId = post.id
              store.commit('deleteLikeId' ,{userId: usersId.value, postId: post.id})
              store.commit('addLikeId', clone)
              store.commit('sortNewestLikes', post.id)
            }
          }
        }
      } else if (status === LIKES_STATUSES.DISLIKE) {
        for (let i = 0; i < post.likesId.length; i++) {
          if (post.likesId[i].id === usersId.value) {
            if (status === post.likesId[i].event) {
              store.commit('deleteDislike', post.id)
              store.commit('deleteLikeId' ,{userId: usersId.value, postId: post.id})
            } else {
              store.commit('addDislike' ,post.id)
              store.dispatch('deleteLike' ,post.id)
              post.likesId[i].event = LIKES_STATUSES.DISLIKE
              let clone = JSON.parse(JSON.stringify(post.likesId[i]))
              clone.id = usersId.value
              clone.postId = post.id
              store.commit('deleteLikeId' ,{userId: usersId.value, postId: post.id})
              store.commit('addLikeId', clone)
              store.commit('sortNewestLikes',  post.id)

            }
          }
        }
      }
    }
  } else {

    finalInspection(status, post)
  }
  examination()

}

function finalInspection(status, post) {
  let name = JSON.parse(JSON.stringify(userName.value))
  if (status === LIKES_STATUSES.LIKE) {
    store.dispatch('addLike', post.id)
    store.commit('addLikeId', {name: name, id: usersId.value, event: LIKES_STATUSES.LIKE, postId:post.id})
    store.commit('sortNewestLikes', post.id)

  } else if (status === LIKES_STATUSES.DISLIKE) {
    store.commit('addDislike', post.id)
    store.commit('addLikeId', {name: name, id: usersId.value, event: LIKES_STATUSES.DISLIKE, postId:post.id})

  }
}

function examination(type, user) {
  if (user) {
    usersId.value = user.id
    userName.value = user.name
  }
  if (type || type === false) {
    userLogin.value = type
  }
  posts.value.forEach((post) => {
    for (let i = 0; i < post.likesId.length; i++) {
      if (post.likesId[i].id === usersId.value) {
        if (post.likesId[i].event === LIKES_STATUSES.LIKE) {
          post.likesInd = true
          post.dislikesInd = false
          return

        } else if (post.likesId[i].event === LIKES_STATUSES.DISLIKE) {
          post.likesInd = false
          post.dislikesInd = true
          return
        }
      } else {
        post.likesInd = false
        post.dislikesInd = false
      }
    }
    post.likesInd = false
    post.dislikesInd = false
  })
}

const store = useStore()

onMounted(()=>{
  users.value = store.state.users
  posts.value = store.state.posts

})

function createUser() {
  // users.value.push({name: newUserName.value, id: Date.now()})
  store.commit('createUser', {name: newUserName.value, id: Date.now()})
  newUserName.value = ''
  console.log(store.state.users)
}


function likesIdSort(array) {

  array.forEach((data) => {
    let variable = 0
    if (data.event === LIKES_STATUSES.LIKE) {
      if (likesUser.value.length === 0) {

      } else {

        for (let i = 0; i < likesUser.value.length; i++) {
          if (likesUser.value[i].id === data.id) {
            variable = 1
          }
        }
      }
    }

    if (variable === 0) {
      likesUser.value.unshift(data)
      console.log(likesUser.value)
    }
  })
  return true
}
</script>


<style scoped>

</style>