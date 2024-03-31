<template>
  <el-row>
    <el-col :span="4">
      <CreateUsers @getUsers="getUsers"/>

    </el-col>
    <el-col :span="4">
    </el-col>
  </el-row>
  <TestUsers @getUsers="getUsers"/>
  <div v-loading="clas" style="width: 100%">

  <div v-if="users.length>0">

    <div v-for="user in users" class="blog" >
      <div>
        <div  >Логин:{{ user.login }}</div>
        <div >Почта:{{ user.email }}</div>
      </div>

      <div >
        <DeleteUsers :user="user" @getUsers="getUsers"/>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>

import CreateUsers from "@/views/users/components/CreateUsers.vue";
import {onMounted, ref} from "vue";
import {UsersService} from "@/views/users/services/Users-service";
import DeleteUsers from "@/views/users/components/DeleteUsers.vue";
import TestUsers from "@/views/users/components/TestUsers.vue";


let users = ref([])
let clas = ref(false)
async  function  getUsers() {
  users.value = []
  clas.value = true
  users.value = await UsersService.getUsers()
  clas.value = false
}

onMounted(()=> getUsers())

</script>



<style scoped>
.prm{
  width: 400px;
  height: 200px;
  background-color: red;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>