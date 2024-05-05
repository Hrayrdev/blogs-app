<template>

  <div v-if="store.getters.getUsers.length>0" style="display: flex; justify-content: space-between">


    <div style="width: 400px">
      <div>
        <el-select v-model="filterConst" placeholder="Все">
          <el-option label="Все" value="all">Все</el-option>
          <el-option label="Друзья" value="friends">Друзья</el-option>
          <el-option label="Подписки" value="subscriptions">Подписки</el-option>
          <el-option label="Подписчики" value="subscribers">Подписчики</el-option>
        </el-select>
      </div>


      <div v-for="user in filterList">
        <div v-if="user.id !== $route.params.userId" class="blog">
          <div>
            <div>Логин:{{ user.login }}</div>
            <div>Почта:{{ user.email }}</div>
          </div>

          <div v-if="positionAdmin">
            <DeleteUsers :user="user" @getUsers="getUsers"/>
          </div>

          <div>
            <AddFriends :user="user"/>
          </div>
          <div>
            <el-button @click="transition(user)"><img style="width: 25px; margin-right: 10px;" src="./icons/chat.png"
                                                      alt=""> Открыть чат
            </el-button>

            <!--            <ChatView :user="user"  />-->
          </div>

        </div>
      </div>
    </div>

    <el-button @click="router.push('/')">
      Выйти из аккаунта
    </el-button>

    <div>
      <Notification/>
    </div>

  </div>


</template>

<script setup>

import CreateUsers from "@/views/users/components/CreateUsers.vue";
import {computed, onMounted, ref, watch, provide, inject} from "vue";
import DeleteUsers from "@/views/users/components/DeleteUsers.vue";
import TestUsers from "@/views/users/components/TestUsers.vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import AddFriends from "@/views/users/components/AddFriends.vue";
import Notification from "@/views/users/components/Notification.vue";
import router from "@/router";
import ChatView from "@/views/users/views/ChatView.vue";


const filterList = computed(() => {
  let user = getUsers.value.find((user) => user.id === route.params.userId)

  switch (filterConst.value) {
    case 'all':
      return getUsers.value
      break;
    case 'friends':
      return user.friends
      break;
    case 'subscriptions':
      return user.yourRequestFriends
      break;
  }

})


let filterConst = ref('all')

const store = useStore()
const route = useRoute()

let positionAdmin = ref(false)

const getUsers = computed(() => store.getters.getUsers)


function transition(user) {
  let currentUser = getUsers.value.find((user) => user.id === route.params.userId)
  store.commit('setCurrentUser',  currentUser)
  store.commit('setUsersInterlocutor',   user)
  router.push('/chat')
}

onMounted(() => {
  // users.value = store.state.userStore.users
  store.dispatch('getUsers')
  store.getters.getUsers.forEach((user) => {
    if (user.id === route.params.userId && user.position === 'Admin') {
      positionAdmin.value = true
    }
  })


})


</script>


<style scoped>
.blog {
  width: 400px;
  height: 200px;
}

.notification {
  margin-right: 200px;
}

</style>