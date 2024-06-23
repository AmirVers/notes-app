<script setup>
defineProps({
  errMsg: String
})
</script>

<template>
  <div
    class="bg-[#1b1818] border border-[#f8514966] rounded-md p-[14px] flash-err flex justify-between items-center"
  >
    <h4 class="text-white text-sm">{{ errMsg }}</h4>
    <button @click="$emit('close')" class="text-red-500 text-xl">&times;</button>
  </div>
</template>

<style scoped>
.flash-err {
  background-image: linear-gradient(to right, #1b1818, #f851491a, #1b1818);
}
</style>
