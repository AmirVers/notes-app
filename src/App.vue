<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="bg-gray-100 min-h-screen rounded-2xl">
    <div class="max-w-[1440px] mx-auto">
      <Navbar
        v-if="
          $route.path !== '/login' &&
          $route.path !== '/register' &&
          $route.path !== '/forgotPassword'
        "
      />
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
