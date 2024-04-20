<template>
  <div>
    <div v-if="checkRequest">
      <div class="aaaa" v-for="request in checkRequest">
        <div>Логин:{{ request.login }}</div>
        <div>Почта:{{ request.email }}</div>
        <AddFriends :user="request" />
      </div>

    </div>
  </div>

</template>


<script setup>

import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import AddFriends from "@/views/users/components/AddFriends.vue";

const store = useStore()
const route = useRoute()
let userName = ref([])
const getUsers = computed(() => store.getters.users)


const checkRequest = computed(num => {

  let answer = getUsers.value.find((user) => user.email === route.params.usersEmail)
  return answer.requestFriendsForYou
  // for (let i = 0; i < getUsers.value.length; i++) {
  //   if (getUsers.value[i].email === route.params.usersEmail) {
  //     return   getUsers.value[i].requestFriendsForYou
  //   }
  // }
  // store.getters.users.forEach((user)=>{
  //   if (user.email === route.params.usersEmail) {
  //     console.log(45665456  )
  //     return   user
  //   }
  // })
})

onMounted(() => {

})


</script>


<style scoped>
.aaaa {
  padding: 5px;
  border: 1px solid;
  border-radius: 10px;
  width: 400px;
  height: 200px;
}
</style>