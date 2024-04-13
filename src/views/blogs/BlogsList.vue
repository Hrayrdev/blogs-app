<template>

  <el-row>
    <el-col :span="4">
      <!--      <CreateBlogs @getBlogs="getBlogs"/>-->
      <Create @getBlogs="getFBlogs"
              :newItem="blogRef"
              :createType="'blogs'"
              :fields="blogFields"
              :open="'блог'"
              @clearText="clearText(blogRef)"
      />
    </el-col>
    <el-col :span="4">
      <DeleteAll @getBlogs="getFBlogs"/>
    </el-col>
  </el-row>


  <FilterBlogs @getBlogs="((value)=>{getFBlogs(value), counter++})"/>
  <SearchBlogs @searchBlogs='getFBlogs'/>
  <div v-if="getBlogs.length>0">

    <div v-for="blog in getBlogs" class="blog">
      <div>
        <div class="blog-name" @click="showBlogPosts(blog)">Название:{{ blog.name }}</div>
        <div class="blog-description">Описание:{{ blog.description }}</div>
      </div>

      <div class="blog-btns">
        <UpdateBlogs @getBlogs="getFBlogs" :blog="blog"/>
        <DeleteBlogs @getBlogs="getFBlogs" :blog="blog"/>
      </div>
    </div>
  </div>

  <PaginationBlogs @getBlogs="getFBlogs" :watch="getBlogs" :currentPage="counter"/>

</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import router from "@/router";
import UpdateBlogs from "@/views/blogs/components/UpdateBlogs.vue";
import DeleteBlogs from "@/views/blogs/components/DeleteBlogs.vue";
import DeleteAll from "@/views/blogs/components/DeleteAll.vue";
import PaginationBlogs from "@/views/blogs/components/PaginationBlogs.vue";
import FilterBlogs from "@/views/blogs/components/FilterBlogs.vue";
import SearchBlogs from "@/views/blogs/components/SearchBlogs.vue";
import Create from "@/views/common/Create.vue";
import {clearText, command} from "@/views/common/constants";
import { useStore} from "vuex";

const store = useStore()

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
const newBlogsName = ref('')
const newBlogsDescription = ref('')
const counter = ref(1)

onMounted(() => {
  store.commit('deleteComment', 23)
  getFBlogs()
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
// let getData = reactive({
//   pageSize: '',
//   pageNumber: '',


async function searchBlogs(searchData) {
  // await store.dispatch('queryChecking', searchData)
  await store.dispatch('incrementAction', searchData)
}


async function filterBlogs(filterData) {
  await store.dispatch('incrementAction', filterData)
}

async function getFBlogs(paginationData) {
  let dataAndCheckInfo = []
  dataAndCheckInfo.push({type:command.blogs, action:command.get})
  dataAndCheckInfo.push(paginationData)
  await store.dispatch('queryChecking', dataAndCheckInfo)
  newBlogsName.value = ''
  newBlogsDescription.value = ''


}

onMounted(() => {
  getFBlogs()
})

const getBlogs = computed(() => store.getters.getBlogs)


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