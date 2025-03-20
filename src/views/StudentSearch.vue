<template>
  <NavBar />
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Section -->
      <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
        <h2 class="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Search Your Submissions
        </h2>
        <form @submit.prevent="searchSubmissions" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
            <div class="relative">
              <input
                id="email"
                type="email"
                v-model="email"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center">
              <svg
                class="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Searching...
            </span>
            <span v-else class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Search Submissions
            </span>
          </button>
        </form>
      </div>

      <!-- Results Section -->
      <div v-if="submissions.length > 0" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th class="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th class="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th class="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="submission in submissions" :key="submission._id" class="hover:bg-gray-50 transition-colors">
                <td class="py-4 px-6">
                  <div class="text-sm font-medium text-gray-900">{{ submission.studentName }}</div>
                  <div class="text-sm text-gray-500">{{ submission.studentEmail }}</div>
                </td>
                <td class="py-4 px-6 text-sm text-gray-500">
                  <div>Type: {{ submission.fileType }}</div>
                  <div>Submitted: {{ formatDate(submission.createdAt) }}</div>
                </td>
                <td class="py-4 px-6">
                  <div class="flex flex-col items-start space-y-2">
                    <template v-if="submission.fileType === 'image'">
                      <img
                        :src="submission.fileUrl"
                        alt="Submission preview"
                        class="w-32 h-auto object-cover rounded-lg shadow-sm"
                      />
                    </template>
                    <template v-else-if="submission.fileType === 'pdf'">
                      <div class="w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                    </template>
                    <a
                      :href="submission.fileUrl"
                      target="_blank"
                      class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      View File
                    </a>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span 
                    class="px-3 py-1 text-sm font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': submission.status === 'approved',
                      'bg-yellow-100 text-yellow-800': submission.status === 'pending',
                      'bg-red-100 text-red-800': submission.status === 'rejected'
                    }"
                  >
                    {{ submission.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="searched" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="mt-2 text-xl font-medium text-gray-900">No submissions found</h3>
          <p class="mt-1 text-gray-500">We couldn't find any submissions for this email address.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'

export default {
  name: 'StudentSearch',
  components: {
    NavBar,
  },
  data() {
    return {
      email: '',
      submissions: [],
      loading: false,
      searched: false,
    }
  },
  methods: {
    async searchSubmissions() {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:5000/api/submissions/student/${this.email}`)
        this.submissions = res.data
        if (this.submissions.length === 0) {
          this.$toast.info('No submissions found for this email.')
        } else {
          this.$toast.success('Submissions found!')
        }
      } catch (err) {
        console.error(err)
        this.$toast.error('An error occurred while searching.')
      } finally {
        this.loading = false
        this.searched = true
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  },
}
</script>