<template>
  <el-select
      v-model="firstSelect"
      class="m-2"
      placeholder="Select"
      size="large"
      style="width: 240px; margin-right: 100px"
      @change="change"
  >
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>

  <el-select

      v-if="showFilter"
      v-model="secondSelect"
      class="m-2"
      placeholder="Select"
      size="large"
      style="width: 240px"
      @change="filterFunc"
  >
    <el-option
        v-for="item in sortSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<script setup>
import {ref} from "vue";

let firstSelect = ref('Сортировать по:')
let secondSelect = ref('Сортировать по:')
const options = [
  {
    label: 'Имени',
    value: 'name',

  },
  {
    label: 'Описанию',
    value: 'description',
  },
  {
    label: 'Дате создания',
    value: 'createdAt',
  },
]
const sortSelect = [
  {
    label: 'Возрастанию',
    value: 'asc',

  },
  {
    label: 'Убыванию',
    value: 'desc',
  },
]
let showFilter = ref(false)
const filter = ref({sortBy: ''})
let emit = defineEmits(['getBlogs'])

async  function change(data) {
  if (data === 'createdAt') {
    if (filter.value.sortDirection){
      delete  filter.value.sortDirection
    }
    filter.value.sortBy = data
    showFilter = false
   await filterFunc()
  } else {
    showFilter = true
    filter.value.sortBy = data
    secondSelect = 'Сортировать по:'
  }
}

async function filterFunc(sortDirection) {
  console.log(filter.value)
  if (sortDirection){
    filter.value.sortDirection = sortDirection
    emit("getBlogs", filter.value)
  } else {
    emit("getBlogs", filter.value)
  }


}


</script>

<style scoped>

</style>