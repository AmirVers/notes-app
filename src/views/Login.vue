<script setup>
import user from '@/assets/icon/user.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const errMsg = ref('')
const login = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Success')
      router.push('/')
    })
    .catch((err) => {
      console.log(err.code)
      switch (err.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'User not found'
          router.push('/register')
          break
        case 'auth/wrong-password':
          errMsg.value = 'Wrong password'

          break
        default:
          errMsg.value = 'Email or Password was incorrect'
          break
      }
    })
}
</script>

<template>
  <div class="flex justify-center items-center flex-col translate-y-1/4">
    <div>
      <user />
    </div>
    <div class="-mt-2">
      <h3 class="text-3xl font-semibold">Welcome back</h3>
    </div>
    <RouterLink to="/register" class="flex justify-center mt-3">
      <h5 class="mr-2 text-indigo-900">Dont have an account?</h5>
      <span class="text-indigo-700 underline opacity-70 decoration-solid">Sign up here</span>
    </RouterLink>
    <div class="flex items-center mt-5 ml-3">
      <div class="border-t-2 border-l-[80px] border-r-[80px] border-solid border-gray-400"></div>
      <span class="mx-3 mb-1 text-gray-500">or</span>
      <div class="border-t-2 border-l-[80px] border-r-[80px] border-solid border-gray-400"></div>
    </div>
    <div class="inline-flex flex-col mt-5 gap-5 translate-x-2">
      <div v-if="errMsg">
        <h3 class="text-red-500">{{ errMsg }}</h3>
      </div>
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
        <h5 class="text-md tracking-wider font-medium mb-1">Password</h5>
        <input
          v-model="password"
          type="password"
          placeholder="Enter a password"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[170px]"
        />
      </div>
      <RouterLink to="/forgotPassword" class="text-indigo-900 flex justify-center"
        >Forgot Password?</RouterLink
      >
      <div>
        <button
          @click="login"
          class="text-center text-white bg-indigo-500 py-2 px-[155px] rounded-xl"
        >
          Sign in
        </button>
      </div>
    </div>
  </div>
</template>
