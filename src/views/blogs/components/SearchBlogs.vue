<template>
  <div>

  <input-fild v-model="searchData"/>
    <el-button :type='"primary"' class="my-btn" @click="searchBlog">Поиск</el-button>
    <el-button :type='"danger"' class="my-btn" @click="canselSearch">Отмена</el-button>
  </div>

</template>


<script setup>
import InputFild from "@/components/input-fild.vue";
import {ref} from "vue";
let searchData = ref('')
const  emit = defineEmits(['searchBlogs','canselSearch'])

function searchBlog() {
  emit('searchBlogs',
      {
        value: searchData.value,
        isSearch: true
      })
}
function canselSearch() {
  searchData.value = ''
  emit('searchBlogs', {
    value: searchData.value,
    isSearch: true
  })
}




</script>



<style scoped>
.my-btn{
  padding: 15px;
}
</style>