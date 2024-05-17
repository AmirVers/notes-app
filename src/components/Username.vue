<script setup>
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { ref } from 'vue'
import turnOff from '@/assets/icon/turnOff.svg'

defineProps({
  dropMenu: Boolean
})

const emit = defineEmits(['signOut', 'dropMenu'])

const auth = getAuth()
const currentUser = auth.currentUser

const db = getFirestore()

const loadUserInfo = async () => {
  const docRef = doc(db, 'Profiles', currentUser.uid)
  try {
    const docSnap = await getDoc(docRef)

    return docSnap.data()
  } catch (error) {
    console.log(error)
  }
}
const userInfo = ref(null)
loadUserInfo().then((res) => {
  userInfo.value = res
})
</script>

<template>
  <div v-if="userInfo" class="ml-8 flex items-center">
    <button @click="emit('dropMenu')" class="flex items-center">
      <img src="../assets/img/ava (1).png" alt="ava" class="w-10 rounded-full" />
      <span class="ml-5 text-xl font-medium">{{ userInfo.username }}</span>
    </button>

    <div v-if="dropMenu" class="drop-menu items-center bg-white rounded-lg">
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
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 30px;
  top: 75px;
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
