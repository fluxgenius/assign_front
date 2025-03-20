<template>
  <NavBar />
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Teacher Dashboard
        </h2>
        <p class="mt-2 text-lg text-gray-600">Review and manage student submissions</p>
      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by student name or email..."
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Submissions Card -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <svg class="animate-spin h-12 w-12 text-blue-600" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
        <div v-else>
          <div v-if="filteredSubmissions.length > 0">
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Submission</th>
                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr 
                    v-for="submission in filteredSubmissions" 
                    :key="submission._id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <div class="text-sm font-medium text-gray-900">{{ submission.studentName }}</div>
                      <div class="text-sm text-gray-500">{{ submission.studentEmail }}</div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <template v-if="submission.fileType === 'image'">
                            <img
                              :src="submission.fileUrl"
                              alt="Submission preview"
                              class="w-16 h-16 object-cover rounded-lg shadow-sm"
                            />
                          </template>
                          <template v-else>
                            <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                              </svg>
                            </div>
                          </template>
                        </div>
                        <div>
                          <a
                            :href="submission.fileUrl"
                            target="_blank"
                            class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            View Submission
                          </a>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        :class="{
                          'bg-green-100 text-green-800': submission.status === 'approved',
                          'bg-yellow-100 text-yellow-800': submission.status === 'pending',
                          'bg-red-100 text-red-800': submission.status === 'rejected'
                        }"
                      >
                        {{ submission.status.charAt(0).toUpperCase() + submission.status.slice(1) }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <button
                          v-if="submission.status === 'pending'"
                          @click="approveSubmission(submission._id)"
                          class="inline-flex items-center cursor-pointer px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                        >
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          Approve
                        </button>
                    
                        <button
                        v-if="submission.status === 'pending'"
                          @click="deleteSubmission(submission._id)"
                          class="inline-flex cursor-pointer items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                        >
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                          Delete
                        </button>
                    
                        <span v-else class="text-gray-400">—</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else class="text-center py-20">
            <div class="max-w-md mx-auto">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="mt-2 text-xl font-medium text-gray-900">No submissions found</h3>
              <!-- <p class="mt-1 text-gray-500">When students submit assignments, they'll appear here.</p> -->
              <p class="mt-1 text-gray-500">Try adjusting your search query.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'

export default {
  name: 'Dashboard',
  components: {
    NavBar,
  },
  data() {
    return {
      submissions: [],
      searchQuery: '',
      loading: false,
    }
  },
  computed: {
    filteredSubmissions() {
      if (!this.searchQuery) {
        return this.submissions
      }
      const query = this.searchQuery.toLowerCase()
      return this.submissions.filter(submission => {
        return (
          submission.studentName.toLowerCase().includes(query) ||
          submission.studentEmail.toLowerCase().includes(query)
        )
      })
    }
  },
  created() {
    this.fetchSubmissions()
  },
  methods: {
    async fetchSubmissions() {
      this.loading = true
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/submissions', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.submissions = res.data
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async approveSubmission(id) {
      try {
        const token = localStorage.getItem('token')
        await axios.put(`http://localhost:5000/api/submissions/${id}/approve`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.$toast.success('Submission approved!')
        this.fetchSubmissions()
      } catch (err) {
        console.error(err)
        this.$toast.error('Error approving submission.')
      }
    },
    async deleteSubmission(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/submissions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$toast.success('Submission deleted successfully!');
        this.fetchSubmissions(); // Refresh the list
      } catch (err) {
        console.error(err);
        this.$toast.error('Error deleting submission.');
      }
    }

  },
}
</script>