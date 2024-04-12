<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, setDoc, collection, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = getFirestore()

const errMsg = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const signedUp = ref(false)

const register = async () => {
  try {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

    const user = userCredential.user

    await setDoc(doc(collection(db, 'Profiles'), user.uid), {
      username: username.value,
      email: user.email,
      id: user.uid
    })

    signedUp.value = true
    setTimeout(() => {
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
        <h4 class="text-red-600 font-semibold">{{ errMsg }}</h4>
        <h5 class="text-md tracking-wider font-medium mb-1">Username</h5>
        <input
          v-model="username"
          type="text"
          maxlength="10"
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
