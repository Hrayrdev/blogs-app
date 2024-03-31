<template>
  <el-button type="primary" @click="createUsers">Создать 5 пользователей</el-button>
</template>

<script setup>

import {UsersService} from "@/views/users/services/Users-service";
let emit = defineEmits(['getUsers'])

const testUsers = [
    {login: 'testUS1', password:'testUS1', email:'testUS1@mail.ru'},
    {login: 'testUS2', password:'testUS2', email:'testUS2@mail.ru'},
    {login: 'testUS3', password:'testUS3', email:'testUS3@mail.ru'},
    {login: 'testUS4', password:'testUS4', email:'testUS4@mail.ru'},
    {login: 'testUS5', password:'testUS5', email:'testUS5@mail.ru'},
]

 async function createUsers () {
 for(let i = 0; i <testUsers.length; i++) {
   const data = JSON.stringify({
     login: testUsers[i].login,
     password: testUsers[i].password,
     email: testUsers[i].email,
   })
   await  UsersService.createUsers(data)
 }
 emit('getUsers')
}

</script>


<style scoped>


</style>
