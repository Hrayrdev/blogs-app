<template>
  <el-button class="create-btn" type="success" @click="centerDialogVisible = true">Новый User</el-button>

  <el-dialog v-model="centerDialogVisible" title="" width="500" center>
    <div style="display: flex; flex-direction: column">
      <input-fild :class="{red: inputClass }" :placeholder="'Login'" v-model="newUserLogin"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Password'" v-model="newPassword"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Email'" v-model="newUserEmail"/>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" @click="adapter">Создать Пост</el-button>
    </div>
  </el-dialog>


</template>

<script setup>
import InputFild from "@/components/input-fild.vue";
import {onMounted, ref, watch} from "vue";
import {ElNotification} from "element-plus";
import {UsersService} from "@/views/users/services/Users-service";
import {useStore} from "vuex";

const store = useStore()

let centerDialogVisible = ref(false)
let inputClass = ref(false)
let newUserLogin = ref('')
let newPassword = ref('')
let newUserEmail = ref('')
let emit = defineEmits(['getUsers'])

onMounted(()=>{
  store.dispatch('getUsers')

})

async function adapter() {
  const isPostCreated =  createUser()
  if (isPostCreated) {
    open1()
  } else {
    open4()
  }
}


const open1 = () => {
  ElNotification({
    title: 'Создано',
    message: 'Вы создали новый блог',
    type: 'success',
  })
}


const open4 = () => {
  ElNotification({
    title: 'Ошибка',
    message: 'Некорректные данные',
    type: 'error',
  })
}


 function createUser() {
  if (newUserLogin.value.length > 3 &&
      newUserLogin.value.length < 30 &&
      newPassword.value.length > 6 &&
      newPassword.value.length < 20) {

    inputClass.value = false
    centerDialogVisible.value = false

    const data = {
      login: newUserLogin.value,
      password: newPassword.value,
      email: newUserEmail.value,
      friends: [],
      yourRequestFriends: [],
      requestFriendsForYou: [],
    }
    console.log(data)
     store.dispatch('createUsers', data)
    emit('getUsers')

    return true
  }
  inputClass.value = true
  return false
}

function clearData() {
  newUserLogin.value = ''
  newUserEmail.value = ''
  newPassword.value = ''
}


watch(() => centerDialogVisible.value,
    () => {
      clearData()
    }
)
</script>

<style scoped>

</style>