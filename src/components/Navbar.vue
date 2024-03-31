<script setup>
import Add from '@/assets/icon/add.svg'
import arrowDown from '@/assets/icon/iconDown.svg'
import turnOff from '@/assets/icon/turnOff.svg'
import Setting from '@/assets/icon/setting.svg'
import arrowRight from '@/assets/icon/arrowRight.svg'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const auth = getAuth()
let prevActive = ref(null)

const active = (e) => {
  const currentActive = e.target.closest('ul')
  if (currentActive) {
    const firstActive = document.getElementsByClassName('active')[0]
    if (prevActive.value !== null && prevActive.value !== currentActive) {
      prevActive.value.classList.remove('active')
    }
    if (firstActive) {
      firstActive.classList.remove('active')
    }
    currentActive.classList.add('active')
    prevActive.value = currentActive
  }
}

const registered = ref(false)

const dropMenu = ref(false)

const dropMenuManipulation = () => {
  dropMenu.value = !dropMenu.value
}

const signOutOfAccount = () => {
  auth.signOut()
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      registered.value = true
    } else {
      registered.value = false
    }
  })
})
</script>

<template>
  <div class="pt-32">
    <nav class="flex justify-between bg-white max-w-screen-xl mx-auto py-1 rounded-lg">
      <div v-if="registered" class="ml-8 flex items-center">
        <button class="flex items-center">
          <img src="../assets/img/ava (1).png" alt="ava" class="w-10 rounded-full" />
          <span class="ml-5 text-xl font-medium">Vers</span>
        </button>

        <arrowDown
          v-if="dropMenu"
          @click="dropMenuManipulation"
          class="cursor-pointer w-8 translate-y-1"
        />
        <arrowRight
          v-else
          @click="dropMenuManipulation"
          class="cursor-pointer w-5 translate-y-[2px] translate-x-1"
        />

        <button
          @click="signOutOfAccount"
          v-if="dropMenu"
          class="drop-menu flex translate-y-[110%] -translate-x-[102%] items-center gap-2 bg-white rounded-lg pr-5 p-2"
        >
          <turnOff class="h-12 w-8 fill-indigo-800" />
          <span class="text-xl font-medium mb-[2px] text-indigo-800">Logout</span>
        </button>
      </div>
      <div v-else class="ml-8 flex items-center">
        <RouterLink to="/register" class="text-indigo-700 text-xl font-medium"
          >Register/Login</RouterLink
        >
      </div>
      <div class="flex items-center gap-16">
        <ul class="active" @click="active">
          <RouterLink to="/">All</RouterLink>
        </ul>
        <ul @click="active">
          <RouterLink to="/Projects">Projects</RouterLink>
        </ul>
        <ul @click="active">
          <RouterLink to="/Business">Business</RouterLink>
        </ul>
        <ul @click="active">
          <RouterLink to="/Todos">Todos</RouterLink>
        </ul>
        <ul class="hover:opacity-60 transition">
          <RouterLink to="/AddNote"><Add /></RouterLink>
        </ul>
      </div>
      <RouterLink to="/Setting" class="setting mr-12 mt-3.5">
        <Setting class="w-[40px] mt-1 mr-1" />
        <span class="text-xl tracking-wider text-gray-600">Setting</span>
      </RouterLink>
    </nav>
  </div>
</template>
<style scoped>
.setting {
  display: flex;
  align-items: center;
  border-radius: 8px;
  height: 34px;
  padding: 0 10px;
  background: #ebb332;
  opacity: 0.8;
  transition: ease 0.2s;
}
.setting:hover {
  opacity: 0.9;
}
.drop-menu {
  position: relative;
  top: 115%;
  right: 150px;
  z-index: 10;
  animation: anim 0.8s ease-out 0s 1 normal forwards;
  transition: all 0.35s ease;
}
.drop-menu:hover {
  background: #dadada;
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
ul:not(:last-child):hover {
  padding: 6px 24px;
  border-radius: 12px;
  background-color: #3780c9;
  color: #fff;
}
ul:not(:last-child) {
  transition:
    padding 0.3s ease,
    border-radius 0.3s ease,
    background-color 0.3s ease;
}
</style>
