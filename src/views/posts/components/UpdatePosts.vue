<template>
  <div>
    <el-button v-if="responseRequest" type="warning" link @click="centerDialogVisible = !centerDialogVisible">
      Редактировать
    </el-button>
  </div>



  <el-dialog v-model="centerDialogVisible" title="" width="500" center>
    <div style="display: flex; flex-direction: column">
      <input-fild :class="{red: inputClass }" :placeholder="'Name'" v-model="newPostTitle"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Description'" v-model="newPostDescription"/>
      <input-fild :class="{red: inputClass }" :placeholder="'Content'" v-model="newPostContent"/>
    </div>
    <div class="dialog-footer">
      <el-button v-if="checkForChange" :type="`${!pressedButton ? 'primary' : 'info'}`" @click="adapter">Редактировать Пост</el-button>
    </div>
  </el-dialog>

</template>
<script setup>


import {ElNotification} from "element-plus";
import InputFild from "@/components/input-fild.vue";
import {computed, ref, watch} from "vue";
import {PostsService} from "@/views/posts/services/Posts-service";
import {Service} from "@/views/common/Service";
import {command} from "@/views/common/constants";
import {useStore} from "vuex";
let props = defineProps({
  post: Object
})
let pressedButton = ref(false)
let centerDialogVisible = ref(false)
let newPostTitle = ref('')
let newPostDescription = ref('')
let newPostContent = ref('')
const inputClass = ref(false)
newPostTitle.value = props.post.title
newPostDescription.value =props.post.shortDescription
newPostContent.value=props.post.content
let url = 'https://app-h4.vercel.app'
let emit = defineEmits(['getPosts'])
let responseRequest = true
 let  checkForChange = computed(()=>{
    if (newPostTitle.value !== props.post.title ||
        newPostDescription.value !== props.post.shortDescription ||
        newPostContent.value !== props.post.content) {
      return true
    } else return false
  })


async function adapter() {
  responseRequest = false
  const isBlogCreated = await updatePostFunc()
  if (isBlogCreated) {
    open1();
  } else if (isBlogCreated === false) {
    open4()
  }
  responseRequest = true

}

const open1 = () => {
  ElNotification({
    title: 'Редактировано',
    message: 'Вы отредоктировали  блог',
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

async function updatePostFunc() {
  if (!pressedButton.value && newPostTitle.value.length <= 30 &&
      newPostDescription.value.length > 3 && newPostTitle.value.length > 3 &&
      newPostDescription.value.length <= 30 && newPostContent.value.length <= 1000 &&
      newPostContent.value.length > 3) {

    pressedButton.value = true
    inputClass.value = false
    centerDialogVisible.value = false


    const data = JSON.stringify({
      title: newPostTitle.value,
      shortDescription: newPostDescription.value,
      content: newPostContent.value,
      blogId: props.post.blogId,
    })
    try {
      let dataAndCheckInfo = []
      dataAndCheckInfo.push( { type:command.posts, action:command.update } )
      dataAndCheckInfo.push( {data: data, id : props.post.id} )

     await store.dispatch('queryChecking', dataAndCheckInfo)
      // await Service.doCommand(command.posts, command.update, data)
      // await PostsService.updatePosts(data, props.post.id)
    } catch (error) {
      console.error('ОШИБКА:', error)
    }

    pressedButton.value = false

    emit('getPosts')
    return true
  } else if (!pressedButton.value) {
    inputClass.value = true
    return false
  }
}

function cansel() {
  newPostTitle.value = props.post.title
  newPostDescription.value =props.post.shortDescription
  newPostContent.value=props.post.content
}

watch(() => centerDialogVisible.value,
    () => {
      if (centerDialogVisible.value) {
        setTimeout(cansel, 10)
      } else  {
        setTimeout(cansel, 300)

      }
    })

</script>
<style scoped>

</style>