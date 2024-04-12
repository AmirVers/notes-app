<script setup>
import Add from '@/assets/icon/add.svg'

import Setting from '@/assets/icon/setting.svg'

import Username from '@/components/Username.vue'

import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const activate = (event) => {
  const current = event.target.closest('ul')
  const active = document.querySelector('.active')
  if (current && active !== current) {
    active?.classList.remove('active')
    current.classList.add('active')
  }
}

const auth = getAuth()
const registered = ref(false)
const dropMenu = ref(false)

const dropMenuManipulation = () => {
  dropMenu.value = !dropMenu.value
}

const signOutOfAccount = () => {
  signOut(auth)
    .then(() => {
      dropMenu.value = false
      registered.value = false
      alert('Signed out')
    })
    .catch((error) => {
      console.log(error)
    })
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
      <Username
        v-if="registered"
        :dropMenu="dropMenu"
        @signOut="signOutOfAccount"
        @dropMenu="dropMenuManipulation"
      />
      <div v-else class="ml-8 flex items-center">
        <RouterLink to="/register" class="text-indigo-700 text-xl font-medium"
          >Register/Login</RouterLink
        >
      </div>
      <div class="flex items-center gap-16">
        <ul class="active" @click="activate">
          <RouterLink to="/">All</RouterLink>
        </ul>
        <ul @click="activate">
          <RouterLink to="/Projects">Projects</RouterLink>
        </ul>
        <ul @click="activate">
          <RouterLink to="/Business">Business</RouterLink>
        </ul>
        <ul @click="activate">
          <RouterLink to="/Todos">Todos</RouterLink>
        </ul>
        <ul @click="activate" class="add-btn hover:opacity-70 rounded-lg transition">
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
.add-btn.active {
  opacity: 0.7;
  background: #fff;
}
.setting:hover {
  opacity: 0.9;
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
