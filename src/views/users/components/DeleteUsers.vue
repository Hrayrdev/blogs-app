<template>
  <el-button  :type="`${!buttonPressed ? buttonType : 'info'}`" link  @click="adapter">Удалить  </el-button >

</template>

<script setup>
import {ref} from "vue";
import {ElNotification} from "element-plus";
import {UsersService} from "@/views/users/services/Users-service";

let buttonPressed = ref(false)
let buttonType = ref("danger")
let props = defineProps({
  user: Object
})
let emit = defineEmits(['getUsers'])

async function adapter() {
  const isBlogCreated = await deleteUsersFunc()
  if (isBlogCreated) {
    open1();
  }
}

const open1 = () => {
  ElNotification({
    title: 'Удалено',
    message: 'Вы удалили  блог',
    type: 'success',
  })
}

async function deleteUsersFunc() {
  if (!buttonPressed.value) {

    buttonPressed.value = true

    await UsersService.deleteUsers(props.user.id)
    buttonPressed.value = false

    emit('getUsers' )
    return true

  }
}


</script>



<style scoped>

</style>