<template>
  <input v-model="inputValue" :type="props.type" :placeholder="props.placeholder" @input="updateInput">
</template>


<script setup>
import {onMounted, ref, watch} from "vue";

let props = defineProps({
  placeholder: String,
  type: String,
  modelValue: {},

})

const inputValue = ref('')
const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  inputValue.value = props.modelValue
})

const updateInput = () => {
  emit('update:modelValue', inputValue.value)
}

watch(
    () => props.modelValue,
    (count) => {
      inputValue.value = count
    }
)

</script>
<style scoped>
.red {
  border: 1px solid rgba(255, 12, 12, 0.98);
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 10px;

}
</style>