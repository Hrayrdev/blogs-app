<template>
  <div style="display: flex; justify-content:center;">
    <el-button @click="showBlogs" type="primary">Вернуться к Блогам</el-button>
  </div>
  <el-row>
    <el-col :span="4">
      <CreatePosts :blog="$route.params.blogId" @getPosts="getPosts"/>
    </el-col>
    <el-col :span="4">
      <FilterPosts @getPosts="((value)=>{filterPosts(value), counter++})"/>
    </el-col>
  </el-row>
<!--    <SearchPosts @searchPosts="searchPosts" @canselSearch="canselSearch"/>-->
  <div v-for="post in posts">
    <div class="post" v-if="post.blogId === $route.params.blogId">
      <div class="post-title">{{ post.title }}</div>
      <div class="post-discritption">{{ post.shortDescription }}</div>
      <div class="post-content">{{ post.content }}</div>
      <div>
        <UpdatePosts :post="post" @getPosts="getPosts"/>
        <DeletePosts :post="post" @getPosts="getPosts"/>
      </div>

    </div>
  </div>

  <PaginationPosts   @getPosts="getPosts" :watch="posts" :twoModel="counter"  />
</template>


<script setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import UpdatePosts from "@/views/posts/components/UpdatePosts.vue";
import DeletePosts from "@/views/posts/components/DeletePosts.vue";
import CreatePosts from "@/views/posts/components/CreatePosts.vue";
import {PostsService} from "@/views/posts/services/Posts-service";
import PaginationPosts from "@/views/posts/components/PaginationPosts.vue";
import FilterPosts from "@/views/posts/components/FilterPosts.vue";
import {BlogsService} from "@/views/blogs/services/Blogs-service";
import SearchPosts from "@/views/posts/components/SearchPosts.vue";

const posts = ref([])
let showContent = ref(false)

function showBlogs() {
  router.push('/blogs')
}

let counter = ref(0)
let url = 'https://app-h4.vercel.app'
let pageNumber = ref()
let pageSize = ref()
//
// async function searchPosts(searchData){
//   posts.value = await PostsService.getPosts(  undefined, undefined,undefined,undefined,  searchData)
// }
// async  function canselSearch(searchData){
//
//   posts.value = await PostsService.getPosts(  undefined, undefined,undefined,undefined,  searchData)
// }


async function filterPosts(filterData) {
  // sortBy=undefined, sortDirection=undefined

  posts.value = await PostsService.getPosts(  undefined, undefined,filterData.sortBy, filterData.sortDirection)

}

async  function getPosts(paginationData) {
  if (paginationData) {
    pageNumber.value = paginationData.pageNumber
    pageSize.value = paginationData.pageSize
  }


  posts.value = await PostsService.getPosts(pageNumber.value, pageSize.value)
}


onMounted(() => getPosts())

</script>


<style scoped>
.post {
  padding: 20px;
  width: 400px;
  min-height: 100px;
  background-color: #004680;
  border-radius: 10px;
  margin-bottom: 15px;
}

.post-title {
  font-size: 25px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.post-discritption {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 19px;
}

.post-content {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;


}

</style>