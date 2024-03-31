<template>
  <el-button  :type="`${!buttonPressed ? buttonType : 'info'}`" link  @click="adapter">Удалить  </el-button >
</template>
<script setup >

import {ElNotification} from "element-plus";
import {PostsService} from "@/views/posts/services/Posts-service";

import {ref} from "vue";
import {Service} from "@/views/common/Service";
import {command} from "@/views/common/constants";
let buttonPressed = ref(false)
let props = defineProps({
  post:Object
})
let buttonType = ref("danger")

let url = 'https://app-h4.vercel.app'
const emits = defineEmits(['getPosts'])

const buttons = [
  { type: 'danger', text: 'danger' },
]

async function adapter() {
  const isBlogCreated = await deletePostFunc()

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


async function deletePostFunc() {

  if (!buttonPressed.value) {

  buttonPressed.value = true

  await  Service.doCommand(command.posts, command.delete, props.post.id)
    buttonPressed.value = false

    emits('getPosts' )
    return true

  }
}

</script>
<style scoped>

</style>