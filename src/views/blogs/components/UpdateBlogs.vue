<template>
  <el-button :key="'Удалить'" style="margin-right: 30px; font-size: 18px;" :type="'warning'" link @click="updateModal = true; updateBlog = blog">
    Редактировать
  </el-button>
  <el-dialog v-model="updateModal" title="" width="500" center>
    <div style="display: flex; flex-direction: column">
      <input-fild :class="{red: inputClass }" :placeholder="'Name'" v-model="newBlogsName"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Description'" v-model="newBlogsDescription"/>
    </div>
    <div class="dialog-footer">
      <el-button :class='{pressed: pressedButton}' type="primary" @click="adapter"
                 v-if="newBlogsName !=='' && newBlogsDescription !== ''">
        Confirm
      </el-button>
    </div>
  </el-dialog>

</template>

<script setup>
import {ref, watch} from "vue";
import InputFild from "@/components/input-fild.vue";
import {ElNotification} from "element-plus";
import {BlogsService} from "@/views/blogs/services/Blogs-service";

let url = 'https://app-h4.vercel.app'
let props = defineProps({
  blog: Object
})
const updateModal = ref(false)
const updateBlog = ref([])
const newBlogsName = ref('')
const newBlogsDescription = ref('')
const emit = defineEmits(['getBlogs'])
const pressedButton = ref(false)
const inputClass = ref(false)
newBlogsName.value = props.blog.name
newBlogsDescription.value = props.blog.description

async function adapter() {
  const isBlogCreated = await updateBlogFunc(updateBlog)
  if (isBlogCreated) {
    open1();
  } else if (isBlogCreated === false) {
    open4()
  }


}

const open1 = () => {
  ElNotification({
    title: 'Отредактировано',
    message: 'Вы отредактировали блог',
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

async function updateBlogFunc(blog) {
  if (!pressedButton.value &&newBlogsName.value.length >3 && newBlogsDescription.value.length > 3 && newBlogsDescription.value.length < 500 && newBlogsName.value.length < 14 ) {

    inputClass.value = false

    updateModal.value = false;
    pressedButton.value = true


    const data = JSON.stringify({
      name: newBlogsName.value,
      description: newBlogsDescription.value,
      websiteUrl: "https://learn.javascript.ru.dfsdsf.com"
    })
    await BlogsService.updateBlog(data, props.blog.id)

    emit('getBlogs')
    newBlogsName.value = ''
    newBlogsDescription.value = ''

    pressedButton.value = false
    return true
  } else  if (!pressedButton.value){
    inputClass.value = true
    return false

  }




}



watch(() => props.blog,
    () => {
      newBlogsName.value = props.blog.name
      newBlogsDescription.value = props.blog.description
    }
)

</script>


<style scoped>

</style>