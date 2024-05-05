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
const getUsers = computed(() => store.getters.getUsers)


const checkRequest = computed(num => {

  let answer = getUsers.value.find((user) => user.id === route.params.userId)
  return answer.requestFriendsForYou
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