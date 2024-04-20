<template>
  <div class="reg-page">
    <div class="reg-page-menu">
      <div style="" class="reg-page-menu-inputs">
        <input-fild class="my-input" :class="{red: inputClass }" :placeholder="'Email'" v-model="userEmail"/>
        <input-fild class="my-input" :class="{red: inputClass }" :placeholder="'Password'" v-model="password"/>
      </div>

      <div class="reg-page-menu-button">
        <el-button class="my-button" @click="signIn">Войти</el-button>
      </div>
    </div>
  </div>


</template>

<script setup>
import InputFild from "@/components/input-fild.vue";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {userStore} from "@/store/userStore";
import router from "@/router";


let inputClass = ref(false)
let password = ref('')
let userEmail = ref('')
let emit = defineEmits(['getUsers'])
const store = useStore()

onMounted(() => {
  store.dispatch('getUsers')
})

function signIn() {
  let answer = store.getters.users.filter((user) => {
    if (user.email === userEmail.value   && user.password === password.value) {
      return true
    }
  })[0]
  if (answer){
    router.push(`/users/${userEmail.value}`)
  }
}


</script>


<style scoped lang="scss">

.reg-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  &-menu {
    width: 500px;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #f4ddf2;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    &-inputs {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 120px;
    }
  }
}

.my-button {
  width: 203px;
  height: 35px;
  padding: 20px;
  margin: 0px;
  font-size: 18px;
  background-color: black;
  color: gray;
  border-color: gray;
}

.my-button:hover {
  background-color: black;
  color: white;
  border-color: white;
}

.my-input {
  padding: 13px;
}

</style>