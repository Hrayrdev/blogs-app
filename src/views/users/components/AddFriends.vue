<template>
  <div v-if="checkFriend === 1">
    <el-button @click="requestFriend"><img src="@/views/users/icons/user-add.svg"></el-button>
  </div>

  <div v-if="checkFriend === 4">
    <el-button @click="deleteFriend"><img style="width: 24px" src="@/views/users/icons/add-friend.png">
    </el-button>

  </div>

  <div v-if="checkFriend === 2">
    <el-button @click="requestFriend">Заявка отправлена</el-button>
  </div>

  <div v-if="checkFriend === 3">
    <el-button @click="acceptRequest">Добавить</el-button>
    <el-button @click="deviationRequest">Отклонить</el-button>
  </div>

  <div>

  </div>

</template>


<script setup>

import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router"

const getUsers = computed(() => store.getters.users)

const store = useStore()
const route = useRoute()
let props = defineProps({
  user: Object,
})


const checkFriend = computed(() => {
  let nowUser = getUsers.value.find((user) => user.email === route.params.usersEmail)
  for (let friend of nowUser.friends) {
    if (friend.email === props.user.email) {
      return 4
    }
  }

  for (let request of nowUser.yourRequestFriends) {
    if (request.email === props.user.email) {
      return 2
    }
  }
  for (let request of nowUser.requestFriendsForYou) {
    if (request.email === props.user.email) {
      return 3
    }
  }
  return 1
})

function requestFriend() {
  getUsers.value.forEach((user) => {
    if (user.email === route.params.usersEmail) {
      store.dispatch('addFriends', {sender: user, recipient: props.user})
    }
  })
}

function acceptRequest() {
  getUsers.value.forEach((user) => {
    if (user.email === route.params.usersEmail) {
      store.dispatch('acceptRequestFriend', {sender: props.user.email, recipient: user.email})
    }
  })
}

function deviationRequest(){
  getUsers.value.forEach((user) => {
    if (user.email === route.params.usersEmail) {
      store.dispatch('deviationRequestFriend', {sender: props.user.email, recipient: user.email})
    }
  })
}

function deleteFriend(){
  getUsers.value.forEach((user) => {
    if (user.email === route.params.usersEmail) {
      store.dispatch('deleteFriend', {sender: props.user.email, recipient: user.email})
    }
  })
}

</script>


<style scoped>
.image-auto {
  width: 100%;
  display: block;
  height: auto;
}
</style>