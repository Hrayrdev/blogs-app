<template>
  <div class="flex justify-space-between flex-wrap gap-4">
    <el-button style="font-size: 18px;"  :key="'Удалить'" :type="'danger'" link @click="adapter">
      Удалить
    </el-button>
  </div>

</template>


<script setup>
import {ElNotification} from "element-plus";
import {BlogsService} from "@/views/blogs/services/Blogs-service";
import {ref} from "vue";
import {useStore} from "vuex";
import {command} from "@/views/common/constants";

let url = 'https://app-h4.vercel.app'
let props = defineProps({
  blog: Object
})
const emit = defineEmits(['getBlogs'])
const pressedButton = ref(false)

const buttons = [
  {type: 'danger', text: 'danger'},
]

const open1 = () => {
  ElNotification({
    title: 'Удалено',
    message: 'Вы удалили  блог',
    type: 'success',
  })
}


async function adapter() {
  const isBlogCreated = await deleteBlogFunc()

  if (isBlogCreated) {
    open1();
  }
}
const store = useStore()


async function deleteBlogFunc() {
  if (!pressedButton.value) {
    pressedButton.value = true
    let dataAndCheckInfo = []
    dataAndCheckInfo.push({type:command.blogs, action:command.delete})
    dataAndCheckInfo.push(props.blog.id)
    await store.dispatch('queryChecking', dataAndCheckInfo)
    emit('getBlogs')
    pressedButton.value = false
    return true
  }
  pressedButton.value = false
}


</script>


<style scoped>

</style>