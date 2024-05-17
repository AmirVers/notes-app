<template>
  <div class="mt-16 ml-16">
    <div class="min-w-[450px]">
      <div class="flex flex-col bg-white mt-10 p-2 px-5 rounded-2xl">
        <div class="flex border-b-2 border-slate-400">
          <img class="w-20" src="../assets/img/business.jpg" alt="bus" />
          <h4 class="flex items-center text-xl font-medium ml-4">Business</h4>
          <div class="ml-auto flex items-center">
            <button
              class="bg-indigo-300 text-white py-2 px-6 rounded-lg transition hover:opacity-95"
            >
              Edit
            </button>
          </div>
        </div>

        <div class="flex flex-col mt-5 max-w-[500px]">
          <p :style="{ fontStyle: fontStyle, fontSize: fontSize + 'px' }">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea accusantium pariatur a culpa
            reiciendis nobis molestiae praesentium architecto odit? Corrupti porro sapiente dolore,
            error velit nisi ratione consequatur commodi officia.
          </p>
          <div class="flex bg-gray-100 rounded-2xl py-1 gap-5 px-2">
            <button class="pl-3 text-2xl bold text-gray-700 font-mono">
              B
              <span class="mb-[4px] border-r-2 inline-block h-2.5 border-gray-500 ml-2"></span>
            </button>
            <button class="text-2xl italic text-gray-700 font-mono">
              I
              <span class="mb-[4px] border-r-2 inline-block h-2.5 border-gray-500 ml-2"></span>
            </button>
            <input type="file" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
