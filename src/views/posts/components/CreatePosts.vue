<template>
  <el-button class="create-btn" type="success" @click="centerDialogVisible = true">Новый Пост</el-button>

  <el-dialog v-model="centerDialogVisible" title="" width="500" center>
    <div style="display: flex; flex-direction: column">
      <input-fild :class="{red: inputClass }" :placeholder="'Name'" v-model="newPostTitle"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Description'" v-model="newPostDescription"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Content'" v-model="newPostContent"/>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" @click="adapter">Создать Пост</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import InputFild from "@/components/input-fild.vue";
import {ref, watch} from "vue";
import {ElNotification} from "element-plus";
import {PostsService} from "@/views/posts/services/Posts-service";

let centerDialogVisible = ref(false)
let newPostTitle = ref('')
let newPostDescription = ref('')
let newPostContent = ref('')
let inputClass = ref(false)
let props = defineProps({
  blog: String
})
let url = 'https://app-h4.vercel.app'
let emit = defineEmits(['getPosts'])


async function adapter() {
  const isPostCreated = await createPost()
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

let a = 0

async function createPost() {
  a++

  if (newPostTitle.value.length <= 30 && newPostDescription.value.length > 3 && newPostDescription.value.length <= 30 && newPostContent.value.length <= 1000 && newPostContent.value.length > 3) {


    inputClass.value = false
    centerDialogVisible.value = false


    const data = JSON.stringify({
      title: newPostTitle.value,
      shortDescription: newPostDescription.value,
      content: newPostContent.value,
      blogId: props.blog
    })
    console.log(data)
    try {
      let s = {
        id: 1,
        name: 2,
        age: 3
      }

      await PostsService.createPosts(data)

    } catch (error) {
      console.error('ОШИБКА:', error)
    }

    emit('getPosts')
    return true
  }
  inputClass.value = true
  return false

}


watch(() => centerDialogVisible.value,
    () => {
      newPostTitle.value = '', newPostDescription.value = '', newPostContent.value = ''
    }
)

</script>

<style>
.create-btn {
  height: 50px;
  width: 150px;
  margin-bottom: 10px;
}
</style>