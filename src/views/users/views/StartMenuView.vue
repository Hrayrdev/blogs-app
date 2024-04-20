<template>
  <div class="entrance">
    <div class="entrance-menu">
      <div class="entrance-menu-butt">
        <el-button class="my-button" @click="router.push('signIn')" >Войти</el-button>
        <el-button class="my-button" @click="router.push('registration')" >Зарегистрироваться</el-button>
      </div>

    </div>
  </div>


</template>

<script setup>

import router from "@/router";
import {onMounted} from "vue";
import {useStore} from "vuex";

const store= useStore()

</script>


<style scoped lang="scss">
.entrance {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  &-menu {
    width: 500px;
    height: 300px;
    border-radius: 20px;
    border: 1px solid #f4ddf2;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    &-butt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 120px;
    }
  }
}
.my-button{
  width: 200px;
  height: 35px;
  padding: 20px;
  margin: 0px;
  font-size: 18px;
  background-color: black;
  color:gray;
  border-color: gray;
}
.my-button:hover{
  background-color: black;
  color:white;
  border-color: white;
}


</style>