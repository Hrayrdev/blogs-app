<template>
  <el-button  :type="`${!buttonPressed ? buttonType : 'info'}`" link  @click="adapter">Удалить  </el-button >

</template>

<script setup>
import {ref} from "vue";
import {ElNotification} from "element-plus";
import {UsersService} from "@/views/users/services/Users-service";
import {useStore} from "vuex";

const store = useStore()
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
    await store.dispatch('deleteUsers', props.user.email)
    buttonPressed.value = false

    emit('getUsers' )
    return true

  }
}


</script>



<style scoped>

</style>