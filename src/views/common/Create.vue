<template>
  <el-button class="create-btn" type="info" @click="centerDialogVisible = true">Новый {{ props.open }}</el-button>

  <el-dialog v-model="centerDialogVisible" title="" width="500" center>
    <div style="display: flex; flex-direction: column">
      <input-fild :class="{red: inputClass }" v-for="field in props.fields" v-model="newItem[field.label]"
                  @keyup.enter="adapter"/>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" @click="adapter">Создать Пост</el-button>
    </div>
  </el-dialog>
</template>


<script setup>
import InputFild from "@/components/input-fild.vue";
import {reactive, ref, watch} from "vue";
import {ElNotification} from "element-plus";
import {PostsService} from "@/views/posts/services/Posts-service";
import {BlogsService} from "@/views/blogs/services/Blogs-service";
import {Service} from "@/views/common/Service";
import {command, fieldsLength} from "@/views/common/constants";
import {useStore} from "vuex";
import router from "@/router";


let props = defineProps(['newItem', 'fields', 'createType', 'blogId', 'open'])
let emit = defineEmits(['getPosts', 'getBlogs', 'clearText'])
let newItem = reactive(props.newItem)
let inputClass = ref(false)
let centerDialogVisible = ref(false)

const pressedButton = ref(false)


async function adapter() {
  const isPostCreated = await create()
  if (isPostCreated) {
    open1()
  } else {
    open4()
  }
}

const open1 = () => {
  ElNotification({
    title: 'Создано',
    message: `Вы создали новый ${props.open}`,
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
const store = useStore()

async function create() {
  if (validation()) {

    inputClass.value = false
    centerDialogVisible.value = false
    let data = newItem
    if (props.blogId) {
      data.blogId = props.blogId
    }
    data = JSON.stringify(data)
    emit('clearText')
    let dataAndCheckInfo = []
    dataAndCheckInfo.push({type: props.createType, action: command.create})
    dataAndCheckInfo.push(data)

    await store.dispatch('queryChecking', dataAndCheckInfo)
    emit(`get${props.createType[0].toUpperCase() + props.createType.slice(1)}`)
    return true
  }
  inputClass.value = true
  return false
}

function validation() {
  let keys = Object.keys(props.newItem)
  let truthCounter = keys.length
  keys.forEach((data) => {
    if (checkField(data)) {
      truthCounter--
    }
  })
  if (truthCounter === 0) {
    return true
  } else {
    return false
  }
}

function checkField(data) {
  for (let i = 0; i < fieldsLength.length; i++) {
    let fields = fieldsLength[i]

    if (data in fields) {

      if (props.newItem[data].length > fields.min && props.newItem[data].length < fields.max) {


        return true
      } else {
        return false
      }

    }
  }
}

function clearText() {
  emit('clearText')
}

</script>
<style scoped>

</style>