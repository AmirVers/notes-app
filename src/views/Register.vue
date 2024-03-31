<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const signedUp = ref(false)
const router = useRouter()
const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Success')
      signedUp.value = true
      setTimeout(() => {
        router.push('/')
      }, 1500)
    })
    .catch((err) => {
      console.log('Error', err.code)
      const errCode = err.code
      switch (errCode) {
        case 'auth/invalid-email':
          alert('Invalid email')
          break
        case 'auth/email-already-in-use':
          alert('Email already in use')
          router.push('/login')
          break
        case 'auth/weak-password':
          alert('Weak password')
          break
        default:
          alert('Something went wrong')
          break
      }
    })
}
</script>
<template>
  <div v-if="signedUp" class="flex flex-col justify-center items-center translate-y-1/4">
    <img src="../assets/img/Gj.jpg" alt="Great Job" class="w-80 h-80" />
    <h4 class="text-3xl font-semibold text-center mt-5 text-violet-600">
      Congrats, you have successfully signed up <span class="ml-2">🔥🔥🔥</span>
    </h4>
  </div>
  <div v-else class="flex justify-center items-center flex-col translate-y-1/4">
    <div>
      <h1 class="text-2xl font-bold tracking-wider text-center">Sign Up</h1>
    </div>
    <div class="inline-flex flex-col mt-8 gap-8">
      <div>
        <h5 class="text-md tracking-wider font-medium mb-1">Username</h5>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[106px]"
        />
      </div>
      <div>
        <h5 class="text-md tracking-wider font-medium mb-1">Email</h5>
        <input
          v-model="email"
          type="email"
          placeholder="example@gmail.com"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[106px]"
        />
      </div>
      <div>
        <h5 class="text-md tracking-wider font-medium mb-1">Password</h5>
        <input
          v-model="password"
          type="password"
          placeholder="Enter a password"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[106px]"
        />
      </div>
      <div>
        <button
          class="text-center text-white bg-indigo-500 py-2 px-[120px] rounded-xl"
          @click="register"
        >
          Sign Up
        </button>
      </div>
      <div>
        <RouterLink to="/login" class="flex justify-center">
          <h5 class="text-indigo-900 mr-2">Already have an account?</h5>
          <span class="text-indigo-700 underline opacity-70 decoration-solid"> Sign In </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
