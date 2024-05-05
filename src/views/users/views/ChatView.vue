<template>


  <div class="page" @keyup.enter="sendMessage">
    <div class="page-menu">
      <div class="page-menu-top">
        <div class="back" @click="transition(true)"><img style="width: 25px; margin-right: 5px " src="../icons/back.png"
                                                         alt=""> Назад
        </div>
        <div>{{ getUsersInterlocutor.login }}</div>
      </div>
      <div class="page-menu-body">
        <div v-if="getOursChat">

          <div v-for="message in getOursChat[0]">
            <div class="my-message-box" v-if="message[1]=== getCurrentUser.id">
              <div class="my-message">{{ message[0] }}</div>
            </div>

            <div class="message-me-box" v-if="message[1]=== getUsersInterlocutor.id">
              <div class="message-me">{{ message[0] }}</div>
            </div>

          </div>
        </div>


      </div>
      <div class="page-menu-bottom">
        <div style="margin-right: 10px">
          <input-fild v-model="messageText" style="width: 580px"/>
        </div>
        <div>
          <el-button @click="sendMessage"></el-button>
        </div>
      </div>

    </div>

  </div>

</template>

<script setup>
import {computed, inject, onMounted, ref, watch} from "vue";
import router from "@/router";
import {useRoute, useRouter} from "vue-router";
import store from "@/store";
import InputFild from "@/components/input-fild.vue";
import async from "async";


const getCurrentUser = computed(() => store.getters.getCurrentUser)
const getUsersInterlocutor = computed(() => store.getters.getUsersInterlocutor)
let getOursChat = computed(() => store.getters.getOursChat)
let props = defineProps({
  user: Object
})
let showPage = ref(true)
let messageText = ref('')

function transition(data) {
  if (data) {
    router.push(`/users/${getCurrentUser.value.id}`)
    return showPage.value = true
  }
  showPage.value = false
  router.push('/chat')
}

const route = useRoute()

function sendMessage() {
  let date = new Date()
  let time = {day: date.getDay(), hour: date.getHours(),}
  store.dispatch('createNewChat')
  store.dispatch('newMessage', messageText.value)
  messageText.value = ''

}

function examination(chat) {
}


onMounted(() => {
  store.dispatch('getChatUsers')
})

watch(() => messageText.value,
    () => {
    })

</script>


<style scoped lang="scss">

.message-me-box {
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
}

.message-me {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 20px;
  padding: 5px 8px 5px 15px;
  background-color: #181a1b;
  color: #e8e6e3;

}

.my-message-box {
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
}

.my-message {

  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-top-right-radius: 20px;
  padding: 5px 15px 5px 8px;
  background-color: #0e6c03;
  color: #e8e6e3;
}

.page {
  display: flex;
  justify-content: center;
  padding: 50px;


  &-menu {

    width: 650px;
    height: 650px;
    border: 1px solid;
    border-radius: 20px;
    padding: 10px;

    &-top {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    &-body {
      padding: 20px 10px 10px 10px;
      height: 530px;
      overflow: auto;
      margin-bottom: 5px;
    }

    &-bottom {
      height: 70px;
      display: flex;
    }
  }

  .back {
    display: flex;
    align-items: center;
    color: gray;
    cursor: pointer;
    width: 80px;
  }

  .back:hover {
    color: white;
  }

}


</style>