import { defineStore } from 'pinia'
import { ref } from 'vue'
export const notesStore = defineStore('notes', () => {
  const getNotes = async (notes) => {
    try {
      const data = await fetch('https://eb94cfa014448882.mokky.dev/notes')
      const res = await data.json()
      notes.value = res
    } catch (err) {
      console.log(err)
    }
  }
  return {
    getNotes
  }
})
