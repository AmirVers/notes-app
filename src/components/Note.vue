<script setup>
defineProps({
  note: Object
})
</script>

<template>
  <div
    class="flex px-5 bg-gray-100 hover:cursor-pointer transition duration-300 hover:bg-indigo-100 hover:pl-5 p-3 rounded-2xl"
  >
    <img class="w-36 rounded-2xl" :src="note.imgUrl" :alt="note.title" />

    <div class="flex flex-col ml-4">
      <h2 class="text-2xl font-medium text-gray-700">{{ note.title }}</h2>
      <p class="text-gray-500 mt-2">
        {{ note.content }}
      </p>
      <span class="mt-4 text-gray-400 text-xs">{{ note.createdAt }}</span>
    </div>
  </div>
</template>
