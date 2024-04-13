<template>
  <el-button :type="`${!buttonPressed ? buttonType : 'info'}`" link @click="adapter">Удалить</el-button>
</template>
<script setup>

import {ElNotification} from "element-plus";
import {PostsService} from "@/views/posts/services/Posts-service";

import {ref} from "vue";
import {Service} from "@/views/common/Service";
import {command} from "@/views/common/constants";
import {useStore} from "vuex";

let buttonPressed = ref(false)
let props = defineProps({
  post: Object
})
let buttonType = ref("danger")

let url = 'https://app-h4.vercel.app'
const emits = defineEmits(['getPosts'])

const buttons = [
  {type: 'danger', text: 'danger'},
]

async function adapter() {
  // console.log(45555)
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

const store = useStore()

async function deletePostFunc() {

  if (!buttonPressed.value) {
    let dataAndCheckInfo = []
    dataAndCheckInfo.push({type:command.posts, action:command.delete})
    dataAndCheckInfo.push(props.post.id)
    buttonPressed.value = true
    await store.dispatch('queryChecking',dataAndCheckInfo)
    // await  Service.doCommand(command.posts, command.delete, props.post.id)
    buttonPressed.value = false

    emits('getPosts')
    return true

  }
  return false
}

</script>
<style scoped>

</style>