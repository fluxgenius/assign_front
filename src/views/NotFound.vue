<!-- src/views/NotFound.vue -->
<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 class="text-6xl font-bold text-red-500">404</h1>
      <p class="text-xl mt-4 text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
      <router-link 
        to="/" 
        class="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Go Home
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  