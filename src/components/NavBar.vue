<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EduSubmit</span>
      </router-link>
      <button
        @click="toggleMenu"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-blue-500 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
        </svg>
      </button>
      <div :class="['w-full md:block md:w-auto', { hidden: !isMenuOpen }]" id="navbar-default">
        <ul class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link
              to="/"
              class="block py-2 pl-3 pr-4 text-gray-600 hover:text-blue-600 transition rounded md:bg-transparent md:text-gray-600 md:p-0 dark:text-white"
              aria-current="page"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link
              to="/submission"
              class="block py-2 pl-3 pr-4 text-gray-600 hover:text-blue-600 transition rounded md:bg-transparent md:text-gray-600 md:p-0 dark:text-white"
            >
              Submit
            </router-link>
          </li>
          <li>
            <router-link
              to="/search"
              class="block py-2 pl-3 pr-4 text-gray-600 hover:text-blue-600 transition rounded md:bg-transparent md:text-gray-600 md:p-0 dark:text-white"
            >
              Search
            </router-link>
          </li>
          <!-- Conditionally render teacher portal link -->
          <li v-if="!isTeacherLoggedIn">
            <router-link
              to="/teacher/login"
              class="block py-2 pl-3 pr-4 text-gray-600 hover:text-blue-600 transition rounded md:bg-transparent md:text-gray-600 md:p-0 dark:text-white"
            >
              Teacher Portal
            </router-link>
          </li>
          <li v-else>
            <router-link
              to="/teacher/dashboard"
              class="block py-2 pl-3 pr-4 text-gray-600 hover:text-blue-600 transition rounded md:bg-transparent md:text-gray-600 md:p-0 dark:text-white"
            >
            Teacher Portal
            </router-link>
          </li>
          <!-- Logout button shown only when teacher is logged in -->
          <li v-if="isTeacherLoggedIn">
            <button
              @click="logout"
              class="block py-2 pl-3 pr-4 cursor-pointer text-gray-600 hover:text-blue-600 transition rounded md:bg-transparent md:text-gray-600 md:p-0 dark:text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false,
    }
  },
  computed: {
    isTeacherLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      // Remove token and redirect to home page
      localStorage.removeItem('token');
      this.$router.push('/teacher/login');
    }
  }
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
