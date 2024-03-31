<template>
  <div class="demo-pagination-block">
    <div class="demonstration">Change page size</div>
    <el-pagination
        :page-sizes="pagesSizeArray"
        v-model:page-size="twoModel"
        layout="sizes, prev, pager, next"
        :total="postsLength"
        v-model:current-page="pagerCount"
        @change="paginationFunc"
    />
  </div>

</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {PostsService} from "@/views/posts/services/Posts-service";
import router from "@/router";

let pagerCount = ref(1)
let twoModel = ref(2)
let postsLength = ref(7)
let pagesSizeArray = ref([1, 2, 3, 4, 5])
let postsPaginationData = ref({
  pageNumber: 1, pageSize: 3
})
let blogId
let emit = defineEmits(['getPosts'])
let props = defineProps({
      watch: Array,
      twoModel: Number,
      blogId: String
    }
)


async function paginationFunc(pageNumber) {
  postsPaginationData.value.pageSize = twoModel.value
  postsPaginationData.value.pageNumber = pageNumber
  emit('getPosts', postsPaginationData.value)
}


async function getPostLength() {
  console.log(blogId)
  postsLength.value = await PostsService.getPostsLength(props.blogId)
}

onMounted(() => {
  getPostLength(), paginationFunc(1)
})


watch(
    () => props.watch,
    () => {
      getPostLength()

    }
)
watch(
    () => props.twoModel,
    () => {
      pagerCount.value = 1
    }
)
watch(
    () => props.blogId,
    () => {
      if (props.blogId) {
        console.log(props.blogId)
        blogId = props.blogId
      }
    }
)

</script>

<style scoped>

</style>