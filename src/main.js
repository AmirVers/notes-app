import './assets/main.css'
import { initializeApp } from 'firebase/app'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyDUlZSrkwJ7TqEfP0DyZjoOseP5dMeJjHk',
  authDomain: 'notesapp-b2ce0.firebaseapp.com',
  projectId: 'notesapp-b2ce0',
  storageBucket: 'notesapp-b2ce0.appspot.com',
  messagingSenderId: '654050558345',
  appId: '1:654050558345:web:a1f2cfe1e44a20d88e6158',
  measurementId: 'G-7Z8H61YHJP'
}

const app = createApp(App)

initializeApp(firebaseConfig)
app.use(createPinia())
app.use(router)

app.mount('#app')
