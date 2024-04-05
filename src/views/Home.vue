<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import noteIco from '@/assets/icon/note.svg'
import Note from '@/components/Note.vue'

const registred = ref(false)
const auth = getAuth()

const notes = ref([])

const getNotes = async () => {
  try {
    const data = await fetch('https://eb94cfa014448882.mokky.dev/notes')
    const res = await data.json()
    notes.value.push(...res)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      registred.value = true
    } else {
      registred.value = false
    }
  })
  getNotes()
})
</script>

<template>
  <div v-if="registred" class="flex translate-x-24">
    <div class="bg-white py-1 rounded-3xl mt-10 w-2/5">
      <div class="flex items-center">
        <noteIco class="mt-1" /><span class="text-xl font-medium -translate-x-1">All Notes</span>
      </div>
      <div class="mt-4 ml-5 text-lg text-indigo-400 font-medium">
        <h4>124 Notes</h4>
      </div>
      <div class="mt-10 ml-5 flex flex-col gap-4 pb-6 pr-4">
        <Note v-for="note in notes" :key="note.id" :note="note" />
      </div>
    </div>
  </div>
  <div v-else class="mt-10 flex justify-center items-center flex-col">
    <span class="text-9xl mb-10">😢</span>
    <h3 class="text-3xl font-semibold text-center text-indigo-500">
      To see or to make notes, you need to register
    </h3>
  </div>
</template>
