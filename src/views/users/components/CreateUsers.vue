<template>
  <el-button class="create-btn" type="success" @click="centerDialogVisible = true">Новый User</el-button>

  <el-dialog v-model="centerDialogVisible" title="" width="500" center>
    <div style="display: flex; flex-direction: column">
      <input-fild :class="{red: inputClass }" :placeholder="'Login'" v-model="newUserLogin"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Password'" v-model="newUserPassword"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Email'" v-model="newUserEmail"/>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" @click="adapter">Создать Пост</el-button>
    </div>
  </el-dialog>


</template>

<script setup>
import InputFild from "@/components/input-fild.vue";
import {ref} from "vue";
import {ElNotification} from "element-plus";
import {UsersService} from "@/views/users/services/Users-service";


let centerDialogVisible =  ref(false)
let inputClass = ref(false)
let newUserLogin = ref('')
let newUserPassword = ref('')
let newUserEmail = ref('')
let emit = defineEmits(['getUsers'])


async function adapter() {
  const isPostCreated = await createUser()
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



async  function createUser() {
  if (newUserLogin.value.length>3 && newUserLogin.value.length< 30 && newUserPassword.value.length > 6 && newUserPassword.value.length < 20  ) {

    inputClass.value = false
    centerDialogVisible.value = false

    const data = JSON.stringify({
          login: newUserLogin.value,
          password: newUserPassword.value,
          email: newUserEmail.value,

    })

    await UsersService.createUsers(data)
    emit('getUsers')

    return true
  }
  inputClass.value = true
  return false
}





</script>

<style scoped>

</style>