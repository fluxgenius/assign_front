<template>
  <NavBar />
  <div class="min-h-screen bg-gray-50">

      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-24">
          <div class="container mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
              <div class="w-full md:w-1/2 space-y-6">
                  <h1 class="text-5xl md:text-6xl font-bold leading-tight animate-fade-in-down">
                      Next-Gen Assignment Management
                  </h1>
                  <p class="text-xl text-blue-100">
                      Transform your academic workflow with a streamlined assignment management application
                  </p>
                  <div class="flex space-x-4">
                      <router-link 
                          to="/submission"
                          class="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                          <span>Submit Assignment</span>
                      </router-link>
                  </div>
                  <div class="mt-8">
                    <p class="text-sm text-blue-200">Developed by:</p>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                      <span 
                        v-for="(developer, index) in developers" 
                        :key="index" 
                        class="text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer truncate"
                        :title="developer"
                      >
                        {{ developer }}
                      </span>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/2 mt-12 md:mt-0">
                  <div class="relative bg-white/20 backdrop-blur-lg rounded-2xl p-1 shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500">
                      <img src="/pic.png" alt="Platform Preview" class="rounded-xl shadow-lg">
                      <div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                          <div class="flex items-center space-x-2 text-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span class="font-bold">98% Success Rate</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 bg-white">
          <div class="container mx-auto px-6">
              <div class="text-center mb-16">
                  <h2 class="text-4xl font-bold mb-4">Why Choose EduSubmit?</h2>
                  <p class="text-gray-600 max-w-2xl mx-auto">A comprehensive solution for modern education needs</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div class="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white hover:shadow-xl transition-all duration-300 group">
                      <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-3">Smart Upload</h3>
                      <p class="text-gray-600"> Use our intuitive drag-and-drop interface to submit your assignments quickly</p>
                  </div>
                  
                  <div class="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white hover:shadow-xl transition-all duration-300 group">
                    <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                        <svg class="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Secure Storage</h3>
                    <p class="text-gray-600">All your files are safely stored in the cloud via Cloudinary integration</p>
                </div>
                
                  
                  <div class="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white hover:shadow-xl transition-all duration-300 group">
                      <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          </svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-3">Real-time Approval</h3>
                      <p class="text-gray-600">Teachers can review and approve submissions instantly from their dashboard</p>
                  </div>
              </div>
              
          </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-gray-400 py-12">
          <div class="container mx-auto px-6">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                      <h5 class="text-white mb-4">EduSubmit</h5>
                      <p class="text-sm">Empowering educators and students through innovative technology</p>
                  </div>
                  <!-- Add footer columns -->
              </div>
              <div class="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                  &copy; 2025 EduSubmit. All rights reserved.
              </div>
          </div>
      </footer>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  name: "Home",
  data() {
    return {
      isMenuOpen: false,
      developers: [
        'Ekwukoma Favour Chukwujindu',
        'Rasaq Abdulhakeem Kayode',
        'Uboh Favour',
        'Chidubem Elvis',
        'Ita Paul'
        ]
    }
  }
};
</script>

<style>
@keyframes fade-in-down {
  0% {
      opacity: 0;
      transform: translateY(-20px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>