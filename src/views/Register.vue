<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, setDoc, collection, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

import ErrMsg from '@/components/ErrMsg.vue'
import Loading from '@/components/Loading.vue'

const router = useRouter()
const db = getFirestore()

const loading = ref(false)
const errMsg = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const signedUp = ref(false)

const userErr = ref('')
const emptyEmailErr = ref('')
const emptyPasswordErr = ref('')

const register = async () => {
  try {
    emptyEmailErr.value = ''
    emptyPasswordErr.value = ''
    userErr.value = ''

    if (!email.value) {
      emptyEmailErr.value = 'You must fill out this field'
    }
    if (!password.value) {
      emptyPasswordErr.value = 'You must fill out this field'
    }
    if (!username.value) {
      username.value = 'You must fill out this field'
    }
    if (!email.value || !password.value || userErr.value) {
      return
    }

    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

    const user = userCredential.user

    await setDoc(doc(collection(db, 'Profiles'), user.uid), {
      username: username.value,
      email: user.email,
      id: user.uid
    })

    signedUp.value = true
    loading.value = true
    setTimeout(() => {
      loading.value = false
      router.push('/')
    }, 1500)
  } catch (error) {
    console.log(error)
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/email-already-in-use':
        errMsg.value = 'Email already in use or invalid'
        break
      default:
        errMsg.value = 'Something went wrong'
        break
    }
  }
}
</script>
<template>
  <Loading v-if="loading" />

  <div v-if="signedUp" class="flex flex-col justify-center items-center translate-y-1/4">
    <img src="../assets/img/Gj.jpg" alt="Great Job" class="w-80 h-80" />
    <h4 class="text-3xl font-semibold text-center mt-5 text-violet-600">
      Congrats, you have successfully signed up <span class="ml-2">🔥🔥🔥</span>
    </h4>
  </div>

  <div v-else-if="!signedUp" class="flex justify-center items-center flex-col translate-y-32">
    <div>
      <h1 class="text-2xl font-bold tracking-wider text-center">Sign Up</h1>
    </div>

    <div class="inline-flex flex-col mt-8 gap-8">
      <div>
        <ErrMsg class="mb-5" v-if="errMsg" :err-msg="errMsg" @close="errMsg = ''"></ErrMsg>
        <h5 class="text-md tracking-wider font-medium mb-1">Username</h5>
        <input
          v-model="username"
          required
          type="text"
          maxlength="10"
          placeholder="Enter your username"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[106px]"
        />
        <Transition name="fade">
          <h3 v-if="userErr" class="text-red-500">{{ userErr }}</h3>
        </Transition>
      </div>
      <div>
        <h5 class="text-md tracking-wider font-medium mb-1">Email</h5>
        <input
          v-model="email"
          required
          type="email"
          placeholder="example@gmail.com"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[106px]"
        />
        <Transition name="fade">
          <h3 v-if="emptyEmailErr" class="text-red-500">{{ emptyEmailErr }}</h3>
        </Transition>
      </div>
      <div>
        <h5 class="text-md tracking-wider font-medium mb-1">Password</h5>
        <input
          v-model="password"
          required
          type="password"
          placeholder="Enter a password"
          class="border-2 border-gray-400 rounded-md py-1 pl-2 px-[106px]"
        />
        <Transition name="fade">
          <h3 v-if="emptyPasswordErr" class="text-red-500">{{ emptyPasswordErr }}</h3>
        </Transition>
      </div>
      <div class="flex justify-center">
        <button
          class="text-center text-white bg-indigo-500 py-2 px-32 rounded-xl"
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
