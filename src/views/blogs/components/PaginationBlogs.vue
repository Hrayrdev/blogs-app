<template>

  <div class="demo-pagination-block">
    <div class="demonstration">Change page size</div>
    <el-pagination
        :page-sizes="pagesSizeArray"
        v-model:page-size="twoModel"
        layout="sizes, prev, pager, next"
        :total="blogsLength"
        @change="paginationFunc"
    />
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {BlogsService} from "@/views/blogs/services/Blogs-service";

let props = defineProps({
  watch: Array
  })
let emit = defineEmits(['getBlogs'])
let twoModel = ref(2)
let blogsLength = ref(0)
let blogsPaginationData = ref({
  pageNumber:1, pageSize:3
})
let pagesSizeArray = ref([1, 2, 3, 4,5])



async function paginationFunc(pageNumber) {
  blogsPaginationData.value.pageSize = twoModel.value
  blogsPaginationData.value.pageNumber = pageNumber
  emit("getBlogs", blogsPaginationData.value)
}

async function getBlogsLength () {
  blogsLength.value = await BlogsService.getBlogsLength()
}

onMounted(() =>{getBlogsLength(), paginationFunc(1)})


watch(()=> props.watch,
    ()=>{
      getBlogsLength()
    }
)

</script>

<style scoped>

</style>