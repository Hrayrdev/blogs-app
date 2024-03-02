<template>

  <el-button class="my-button" type="danger"  @click="adapter">Delete All</el-button>
</template>


<script setup>
import {ElNotification} from "element-plus";

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


async function deleteAll() {
  const response = await fetch(`${url}/testing/all-data`, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          Authorization: 'Basic YWRtaW46cXdlcnR5'
        }
      }
  )
  const s = await response
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