<script setup>
import { doc, getDoc, getFirestore } from 'firebase/firestore'

import turnOff from '@/assets/icon/turnOff.svg'

const db = getFirestore()

const emit = defineEmits(['signOut', 'dropMenu'])
defineProps({
  dropMenu: Boolean
})
</script>

<template>
  <div class="ml-8 flex items-center">
    <button @click="emit('dropMenu')" class="flex items-center">
      <img src="../assets/img/ava (1).png" alt="ava" class="w-10 rounded-full" />
      <span class="ml-5 text-xl font-medium">Vers</span>
    </button>

    <div v-if="dropMenu" class="drop-menu ml-6 items-center bg-white rounded-lg">
      <button
        @click="emit('signOut')"
        class="flex items-center py-2 pr-4 transition duration-300 hover:bg-[#dadada] hover:rounded-lg"
      >
        <turnOff class="h-12 w-8 fill-indigo-800" />
        <span class="text-xl font-medium mb-[2px] text-indigo-800">Logout</span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.drop-menu {
  position: relative;
  top: 115%;
  right: 150px;
  z-index: 10;
  animation: anim 0.8s ease-out 0s 1 normal forwards;
  transition: all 0.35s ease;
}
@keyframes anim {
  0% {
    animation-timing-function: ease-in;
    opacity: 1;
    transform: translateY(-45px);
  }

  24% {
    opacity: 1;
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateY(-24px);
  }

  65% {
    animation-timing-function: ease-in;
    transform: translateY(-12px);
  }

  82% {
    animation-timing-function: ease-in;
    transform: translateY(-6px);
  }

  93% {
    animation-timing-function: ease-in;
    transform: translateY(-4px);
  }

  25%,
  55%,
  75%,
  87% {
    animation-timing-function: ease-out;
    transform: translateY(0px);
  }

  100% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
