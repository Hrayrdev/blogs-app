<template>
  <div v-if="store.getters.users.length>0" style="display: flex; justify-content: space-between">
    <div>

      <div v-for="user in store.getters.users">
        <div v-if="user.email !== $route.params.usersEmail" class="blog">
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
        </div>
      </div>
    </div>

    <div >
      <Notification />
    </div>
  </div>
</template>

<script setup>

import CreateUsers from "@/views/users/components/CreateUsers.vue";
import {computed, onMounted, ref, watch} from "vue";
import DeleteUsers from "@/views/users/components/DeleteUsers.vue";
import TestUsers from "@/views/users/components/TestUsers.vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import AddFriends from "@/views/users/components/AddFriends.vue";
import Notification from "@/views/users/components/Notification.vue";


const answer = true

const store = useStore()
const route = useRoute()
let positionAdmin = ref(false)

const getUsers = computed(()=> store.getters.users)

onMounted(() => {
  // users.value = store.state.userStore.users
  store.dispatch('getUsers')
  store.getters.users.forEach((user) => {
    if (user.email === route.params.usersEmail && user.position === 'Admin') {
      positionAdmin.value = true
    }
  })


  function checkFriends() {
    console.log(route.params.userEmail)
    return true
  }


})


</script>


<style scoped>
.blog {
  width: 400px;
  height: 200px;
}
.notification{
  margin-right: 200px;
}

</style>