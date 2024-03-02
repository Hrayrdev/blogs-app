<template>
  <div>

    <input-fild v-model="searchData"/>
    <el-button :type='"primary"' class="my-btn" @click="searchPost">Поиск</el-button>
    <el-button :type='"danger"' class="my-btn" @click="canselSearch">Отмена</el-button>
  </div>
</template>

<script setup>
import InputFild from "@/components/input-fild.vue";
import {ref} from "vue";

let searchData = ref('')
const  emit = defineEmits(['searchPosts','canselSearch'])

function searchPost() {
  emit('searchPosts',
      {
        value: searchData.value,
        isSearch: true
      })
}
function canselSearch() {
  searchData.value = ''
  emit('canselSearch',
      {
    value: searchData.value,
    isSearch: true
  })
}


</script>

<style scoped>

</style>