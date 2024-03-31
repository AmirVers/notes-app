<script setup>
import { ref } from 'vue'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const sent = ref(false)
const router = useRouter()

const resetPassword = () => {
  const auth = getAuth()
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      sent.value = true
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
      const errCode = err.code
      switch (errCode) {
        case 'auth/invalid-email':
          alert('Invalid email')
          break
        case 'auth/user-not-found':
          alert('User not found')
          break
        default:
          alert('Something went wrong')
          break
      }
    })
}
</script>

<template>
  <div v-if="sent" class="flex justify-center items-center h-screen">
    <h4 class="text-3xl font-semibold text-violet-600">
      Successfully sent a link to your email, <br />
      to reset your password✔
    </h4>
  </div>
  <div v-else class="flex justify-center items-center flex-col translate-y-1/4">
    <div class="mb-4">
      <img src="../assets/img/Gj.jpg" class="w-56 h-40 rounded-full" alt="Img" />
    </div>
    <div class="text-3xl font-semibold flex justify-center tracking-wide">
      Forgot your password?
    </div>
    <div class="text-lg font-semibold flex justify-center text-indigo-700 mt-5 mb-5">
      Enter your email below to reset it
    </div>
    <div class="inline-flex flex-col mt-5 gap-5 translate-x-2">
      <div>
        <h5 class="text-md tracking-wider font-medium mb-1">Email</h5>
        <input
          v-model="email"
          type="email"
          placeholder="example@gmail.com"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[170px]"
        />
      </div>

      <div>
        <button
          @click="resetPassword"
          class="text-center text-white bg-indigo-500 py-2 px-[127px] rounded-xl"
        >
          Reset password
        </button>
      </div>
      <RouterLink to="/register" class="flex justify-center mt-3">
        <h5 class="mr-2 text-indigo-900">Dont have an account?</h5>
        <span class="text-indigo-700 underline opacity-70 decoration-solid">Sign up here</span>
      </RouterLink>
    </div>
  </div>
</template>
