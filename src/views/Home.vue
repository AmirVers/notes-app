<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { notesStore } from '@/stores/notesStore'
import noteIco from '@/assets/icon/note.svg'
import Note from '@/components/Note.vue'
import editNote from '@/components/EditNote.vue'

const registred = ref(false)
const auth = getAuth()
const noteInfo = notesStore()
const notes = ref([])
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      registred.value = true
    } else {
      registred.value = false
    }
  })
  noteInfo.getNotes(notes)
})
</script>

<template>
  <div>
    <div v-if="registred" class="flex translate-x-24">
      <div class="bg-white py-1 rounded-3xl mt-10 w-2/5">
        <div class="flex items-center">
          <noteIco class="mt-1" /><span class="text-xl font-medium -translate-x-1">All Notes</span>
        </div>
        <div class="mt-4 ml-5 text-lg text-indigo-400 font-medium">
          <h4>{{ notes.length }} Notes</h4>
        </div>
        <div class="mt-10 ml-5 flex flex-col gap-4 pb-6 pr-4 overflow-hidden">
          <Note v-for="note in notes.slice(0, 3)" :key="note.id" :note="note" />
          <div v-if="notes.length > 3" class="text-gray-500">
            <RouterLink to="/Notes" class="underline hover:opacity-70"
              >And {{ notes.length - 3 }} more...</RouterLink
            >
          </div>
        </div>
      </div>
      <div>
        <editNote />
      </div>
    </div>
    <div v-else class="mt-10 flex justify-center items-center flex-col">
      <span class="text-9xl mb-10">😢</span>
      <h3 class="text-3xl font-semibold text-center text-indigo-500">
        To see or to make notes, you need to register
      </h3>
    </div>
  </div>
</template>
