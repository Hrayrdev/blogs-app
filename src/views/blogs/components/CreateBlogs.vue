<template>

  <el-button class="my-button" plain @click="centerDialogVisible = true" type="primary">
    Create
  </el-button>


  <el-dialog v-model="centerDialogVisible" title="" width="500" center>
    <div style="display: flex; flex-direction: column">
      <input-fild :class="{red: inputClass }" :placeholder="'Name'" v-model="newBlogsName"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Description'" v-model="newBlogsDescription"/>
    </div>
    <div class="dialog-footer">
      <el-button plain :class='{pressed: pressedButton}' type="primary" @click="adapter">
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

const centerDialogVisible = ref(false)
const newBlogsName = ref('')
const newBlogsDescription = ref('')
const emit = defineEmits(['getBlogs'])
const pressedButton = ref(false)
const inputClass = ref(false)

async function adapter() {
  const isBlogCreated = await createBlog()
  if (isBlogCreated) {
    open1();
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

async function createBlog() {
  if (!pressedButton.value && newBlogsDescription.value.length > 3 && newBlogsDescription.value.length < 500 && newBlogsName.value.length < 14) {

    inputClass.value = false
    centerDialogVisible.value = false
    pressedButton.value = true


    const data = JSON.stringify({
      name: newBlogsName.value,
      description: newBlogsDescription.value,
      websiteUrl: "https://learn.javascript.ru.dfsdsf.com"
    })
      await BlogsService.createBlog(data)
    emit('getBlogs')

    pressedButton.value = false

    return true

  }

  inputClass.value = true
  return false


}

watch(
    () => centerDialogVisible.value,
    () => {
        newBlogsName.value = ''
        newBlogsDescription.value = ''
    }
)


</script>

<style scoped>
.my-button {
  width: 200px;
  height: 50px;
}
</style>
