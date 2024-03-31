<template>

  <el-row>
    <el-col :span="4">
      <!--      <CreateBlogs @getBlogs="getBlogs"/>-->
      <Create @getBlogs="getBlogs"
              :newItem="blogRef"
              :createType="'blogs'"
              :fields="blogFields"
              :open="'блог'"
              @clearText="clearText(blogRef)"
      />
    </el-col>
    <el-col :span="4">
      <DeleteAll @getBlogs="getBlogs"/>
    </el-col>
  </el-row>


  <FilterBlogs @getBlogs="((value)=>{filterBlogs(value), counter++})"/>
  <SearchBlogs @searchBlogs='searchBlogs' @canselSearch="canselSearch"/>

  <div v-if="blogs.length>0">

    <div v-for="blog in blogs" class="blog">
      <div>
        <div class="blog-name" @click="showBlogPosts(blog)">Название:{{ blog.name }}</div>
        <div class="blog-description">Описание:{{ blog.description }}</div>
      </div>

      <div class="blog-btns">
        <UpdateBlogs @getBlogs="getBlogs" :blog="blog"/>
        <DeleteBlogs @getBlogs="getBlogs" :blog="blog"/>
      </div>
    </div>
  </div>

  <PaginationBlogs @getBlogs="getBlogs" :watch="blogs" :currentPage="counter"/>

</template>

<script setup>
import {onMounted, reactive, ref} from "vue";

import router from "@/router";
import CreateBlogs from "@/views/blogs/components/CreateBlogs.vue";
import UpdateBlogs from "@/views/blogs/components/UpdateBlogs.vue";
import DeleteBlogs from "@/views/blogs/components/DeleteBlogs.vue";
import DeleteAll from "@/views/blogs/components/DeleteAll.vue";
import {BlogsService} from "@/views/blogs/services/Blogs-service";
import PaginationBlogs from "@/views/blogs/components/PaginationBlogs.vue";
import FilterBlogs from "@/views/blogs/components/FilterBlogs.vue";
import SearchBlogs from "@/views/blogs/components/SearchBlogs.vue";
import Create from "@/views/common/Create.vue";
import {Service} from "@/views/common/Service";
import {clearText} from "@/views/common/constants";

let blogFields = [
  {
    label: 'name',
    placeholder: 'Название',
  },
  {
    label: 'description',
    placeholder: 'Описание',
  },
  {
    label: 'websiteUrl',
    placeholder: 'url',
  }
]
let blogs = ref([])
const newBlogsName = ref('')
const newBlogsDescription = ref('')
const counter = ref(1)
onMounted(() => {
  getBlogs()
})

function showBlogPosts(blog) {
  router.push({name: 'Posts', params: {blogId: blog.id}})
}

let blogRef = reactive({
  name: '',
  description: '',
  websiteUrl: 'https://learn.javascript.ru.dfsdsf.com',
})
let pageNumber = ref()
let pageSize = ref()



async function searchBlogs(searchData) {
  blogs.value = await BlogsService.getBlogs(undefined, undefined, undefined, undefined, searchData)

}

async function canselSearch(searchData) {
  blogs.value = await BlogsService.getBlogs(undefined, undefined, undefined, undefined, searchData)
}

async function filterBlogs(filterData) {
  blogs.value = await BlogsService.getBlogs(undefined, undefined, filterData.sortBy, filterData.sortDirection)
}

async function getBlogs(paginationData) {
  if (paginationData) {

    pageNumber.value = paginationData.pageNumber
    pageSize.value = paginationData.pageSize
  }

  blogs.value = await BlogsService.getBlogs(pageSize.value, pageNumber.value)
  newBlogsName.value = ''
  newBlogsDescription.value = ''


}

onMounted(() => {
  getBlogs()
})

</script>

<style lang="scss">

.pressed {
  background-color: #b5b5b5;
}

.blog {
  border: 1px solid black;
  border-radius: 10px;
  width: 467px;
  min-height: 200px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;

  &-btns {
    display: flex;
    justify-content: flex-end;
  }

  &-name {
    display: flex;
    color: teal;
    margin-bottom: 20px;
    font-size: 20px;

    &:hover {
      color: red;
      cursor: pointer;
    }
  }

  &-description {
    word-wrap: break-word;
  }

  &-additional-info {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }


}

.red {
  border: 1px solid rgba(12, 223, 36, 0.98);
}

.update-but {
  padding: 10px;
  background-color: teal;
  border: none
}
</style>