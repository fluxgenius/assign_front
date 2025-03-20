<template>
  <NavBar />
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl transition-all duration-300 hover:shadow-2xl">
      <h2 class="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Submit Assignment
      </h2>
      <form @submit.prevent="submitAssignment" class="space-y-6">
        <!-- Student Details -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input
              v-model="studentName"
              type="text"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
            <input
              v-model="studentEmail"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <!-- Drag & Drop File Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Assignment File</label>
          <div
            class="group border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 relative"
            @dragover.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
            @drop.prevent="handleDrop"
            @click="triggerFileSelect"
            :class="{ 'border-blue-500 bg-blue-50': dragover }"
          >
            <div class="space-y-2">
              <div class="mx-auto flex justify-center">
                <svg class="w-12 h-12 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
              <p class="text-gray-500 text-sm group-hover:text-blue-600 transition-colors">
                <span class="font-medium">Drag and drop files here or</span>
                <span class="text-blue-600 font-semibold"> click to browse</span>
              </p>
              <p class="text-xs text-gray-400">Supported formats: PNG, JPG, PDF (Max 10MB)</p>
            </div>
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              @change="handleFileChange"
              accept="image/*,application/pdf"
            />
            
            <!-- Preview Section -->
            <div v-if="previewUrl" class="mt-6">
              <div class="relative bg-gray-50 rounded-lg p-4">
                <button 
                  @click.stop="clearFile"
                  class="absolute -top-2 -right-2 cursor-pointer bg-white rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors"
                  title="Remove file"
                >
                  <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <div class="flex items-center space-x-4">
                  <div v-if="fileType === 'image'" class="flex-shrink-0">
                    <img :src="previewUrl" alt="Preview" class="w-16 h-16 rounded-lg object-cover border"/>
                  </div>
                  <div v-else class="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
                    <p class="text-sm text-gray-500">{{ formatFileSize(file.size) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
            Submitting...
          </span>
          <span v-else class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Submit Assignment
          </span>
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios'
  import NavBar from '../components/NavBar.vue'
  
  export default {
    components: {
      NavBar,
    },
    name: 'StudentSubmission',
    data() {
      return {
        studentName: '',
        studentEmail: '',
        file: null,
        fileType: '',
        previewUrl: '',
        loading: false,
        dragover: false,
      }
    },
    methods: {
      triggerFileSelect() {
        this.$refs.fileInput.click()
      },
      handleFileChange(e) {
        const selectedFile = e.target.files[0]
        this.processFile(selectedFile)
      },
      handleDrop(e) {
        const droppedFile = e.dataTransfer.files[0]
        this.processFile(droppedFile)
      },
      processFile(file) {
        if (!file) return
        // Check file type
        if (file.type.startsWith('image/')) {
          this.fileType = 'image'
        } else if (file.type === 'application/pdf') {
          this.fileType = 'pdf'
        } else {
          this.$toast.error('Unsupported file type. Please select an image or PDF.')
          return
        }
        this.file = file
        // Create a preview URL
        this.previewUrl = URL.createObjectURL(file)
      },

      clearFile() {
        this.file = null
        this.previewUrl = ''
        this.fileType = ''
        this.$refs.fileInput.value = null
      },

     formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
     },

      async submitAssignment() {
        if (!this.file) {
          this.$toast.error('Please select a file.')
          return
        }
        this.loading = true
        try {
          const formData = new FormData()
          formData.append('studentName', this.studentName)
          formData.append('studentEmail', this.studentEmail)
          formData.append('file', this.file)
          
          // Post the form data to your backend endpoint
          const res = await axios.post('http://localhost:5000/api/submissions', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.$toast.success('Submission successful!')
          // Reset form on success
          this.studentName = ''
          this.studentEmail = ''
          this.file = null
          this.previewUrl = ''
          this.fileType = ''
          this.$refs.fileInput.value = null
        } catch (err) {
          console.error(err)
          this.$toast.error('Submission failed')
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>
  