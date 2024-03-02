<template>
  <el-button  :type="`${!buttonPressed ? buttonType : 'info'}`" link  @click="adapter">Удалить  </el-button >
</template>
<script setup >

import {ElNotification} from "element-plus";
import {PostsService} from "@/views/posts/services/Posts-service";
import {ref} from "vue";
let buttonPressed = ref(false)
let props = defineProps({
  post:Object
})
let buttonType = ref("danger")

let url = 'https://app-h4.vercel.app'
const emits = defineEmits(['getBlogs'])

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

  await PostsService.deletePosts(props.post.id)
    buttonPressed.value = false

    emits('getPosts' )
    return true

  }
}

</script>
<style scoped>

</style>