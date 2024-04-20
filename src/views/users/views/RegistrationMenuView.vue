<template>
  <div class="reg-page">
    <div class="reg-page-menu">
      <div style="" class="reg-page-menu-inputs">
        <input-fild class="my-input" :class="{red: inputClass }" :placeholder="'Login'" v-model="newUserLogin"/>
        <input-fild class="my-input" :class="{red: inputClass }" :placeholder="'Password'" v-model="newPassword"/>
        <input-fild class="my-input" :class="{red: inputClass }" :placeholder="'Email'" v-model="newUserEmail"/>

        <div>
          <el-radio-group v-model="position" size="large"   >
            <el-radio-button  label="Admin" value="Admin" />
            <el-radio-button  label="User" value="User" />
          </el-radio-group>
        </div>
      </div>

      <div class="reg-page-menu-button">
        <el-button class="my-button" @click="createUser">Зарегистрироваться</el-button>
      </div>
    </div>
  </div>


</template>

<script setup>
import InputFild from "@/components/input-fild.vue";
import {ref, watch} from "vue";
import {useStore} from "vuex";
import router from "@/router";

let position = ref('New York')
let inputClass = ref(false)
let newUserLogin = ref('')
let newPassword = ref('')
let newUserEmail = ref('')
let emit = defineEmits(['getUsers'])
const store = useStore()


function createUser() {
  if (examination()) {

    inputClass.value = false

    const data = {
      login: newUserLogin.value,
      password: newPassword.value,
      email: newUserEmail.value,
      friends: [],
      yourRequestFriends: [],
      requestFriendsForYou: [],
    }

    store.dispatch('createUsers', data)
    emit('getUsers')

    router.push(`/users/${newUserEmail.value}`)
    clearData()

    return true
  }
  inputClass.value = true
  return false
}

function examination() {
  if (newUserLogin.value.length > 3 &&
      newUserLogin.value.length < 30 &&
      newPassword.value.length > 6 &&
      newPassword.value.length < 20) {

    let answer = store.getters.users.filter((user) => {

      if (user.email === newUserLogin.value && user.login === newUserLogin.value) {
        return true
      }
    })[0]
    if (answer) {
      return false
    }
    return true
  }
}


function clearData() {
  newUserLogin.value = ''
  newUserEmail.value = ''
  newPassword.value = ''
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
      height: 150px;
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