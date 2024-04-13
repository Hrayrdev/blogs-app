<template>

  <div style="display: flex; justify-content:center;">
    <el-button @click="showBlogs" type="primary">Вернуться к Блогам</el-button>
  </div>
  <el-row>
    <el-col :span="4">
      <Create :blogId="$route.params.blogId" :createType="'posts'" :newItem="postRef" :fields="postFields"
              @getPosts="getPostsFunc" :open="'пост'" @clearText="clearText(postRef)"/>
    </el-col>
    <el-col :span="4">
      <FilterPosts @getPosts="((value)=>{filterPosts(value), counter++})"/>
    </el-col>
  </el-row>
  <!--    <SearchPosts @searchPosts="searchPosts" @canselSearch="canselSearch"/>-->
  <div v-for="post in getPosts">
    <div class="post" v-if="post.blogId ===  $route.params.blogId">
      <div class="post-title">{{ post.title }}</div>
      <div class="post-description">{{ post.shortDescription }}</div>
      <div class="post-content">{{ post.content }}</div>
      <div>
        <UpdatePosts :post="post" @getPosts="getPostsFunc"/>
        <DeletePosts :post="post" @getPosts="getPostsFunc"/>
      </div>

    </div>
  </div>
  <PaginationPosts @getPosts="getPostsFunc" :blogId="$route.params.blogId" :watch="getPosts" :twoModel="counter"/>
</template>


<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import router from "@/router";
import UpdatePosts from "@/views/posts/components/UpdatePosts.vue";
import DeletePosts from "@/views/posts/components/DeletePosts.vue";
import PaginationPosts from "@/views/posts/components/PaginationPosts.vue";
import FilterPosts from "@/views/posts/components/FilterPosts.vue";
import {BlogsService} from "@/views/blogs/services/Blogs-service";
import SearchPosts from "@/views/posts/components/SearchPosts.vue";
import CreatePosts from "@/views/posts/components/CreatePosts.vue";
import Create from "@/views/common/Create.vue";
import {Service} from "@/views/common/Service";
import {clearText, command} from "@/views/common/constants";
import {useStore} from "vuex";
import {PostsService as params} from "@/views/posts/services/Posts-service";
import {useRoute} from "vue-router";

const store = useStore()

// const posts = ref([])
let showContent = ref(false)

function showBlogs() {
  router.push('/blogs')
}

let protect = ref({lamp: 'dwadwa', pov: 'dadwadwa'})
let counter = ref(0)
let url = 'https://app-h4.vercel.app'
let pageNumber = ref()
let pageSize = ref()
let postFields = [
  {
    label: 'title',
    placeholder: 'Название',
  },
  {
    label: 'shortDescription',
    placeholder: 'Описание',
  },
  {
    label: 'content',
    placeholder: 'Контент',
  }
]
let postRef = reactive({
  title: '',
  shortDescription: '',
  content: '',
})

const route = useRoute()
onMounted(async () => {
  await store.dispatch('getPosts', {"paginationData": 'sd'})
})


async function filterPosts(filterData) {
  await store.dispatch('getPosts', filterData)
}

async function getPostsFunc(paginationData) {
  let dataAndCheckInfo = []
  dataAndCheckInfo.push( { type:command.posts, action:command.get } )

  if (paginationData) {
    paginationData.blogId = route.params.blogId
    dataAndCheckInfo.push( paginationData),

    await store.dispatch('queryChecking', dataAndCheckInfo)
  } else {
    await store.dispatch('queryChecking', dataAndCheckInfo)

    // await store.dispatch('getPosts')
  }
}

const getPosts = computed(() => store.getters.getPosts)
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

.post-description {
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