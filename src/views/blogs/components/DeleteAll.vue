<template>

  <el-button class="my-button" type="danger"  @click="adapter">Delete All</el-button>
</template>


<script setup>
import {ElNotification} from "element-plus";
import {BlogsService} from "@/views/blogs/services/Blogs-service";
import {useStore} from "vuex";

let url = 'https://app-h4.vercel.app'
let emit = defineEmits(['getBlogs'])



const open1 = () => {
  ElNotification({
    title: 'Удалено',
    message: 'Вы удалили все блоги',
    type: 'success',
  })
}



async function adapter() {
  const isBlogCreated = await deleteAll()
  if (isBlogCreated) {
    open1();
  }
}

const store = useStore()

async function deleteAll() {
  await  store.dispatch('deleteAll')
  emit('getBlogs')
  return true
}
</script>


<style scoped>
.my-button {
  width: 200px;
  height: 50px;
}
</style>