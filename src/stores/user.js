import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // User verification status
    isVerified: false,
    
    // User data
    user: {
      birthday: {
        day: null,
        month: null,
        year: null
      },
      location: {
        code: null,
        name: null,
        legalAge: null
      },
      age: null,
      verifiedAt: null,
      rememberMe: false
    },
    
    // Available locations with their legal drinking ages - EXACTLY as specified
    availableLocations: [
      { code: 'QC', name: 'Québec', legalAge: 18 },
      { code: 'ON', name: 'Ontario', legalAge: 19 },
      { code: 'DE', name: 'Germany', legalAge: 16 },
      { code: 'UK', name: 'UK', legalAge: 18 }
    ],
    
    // Session configuration
    sessionConfig: {
      // Remember verification for 30 days if user checks "remember me"
      rememberDuration: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
      // Session expires after 24 hours if "remember me" not checked
      sessionDuration: 24 * 60 * 60 * 1000 // 24 hours in ms
    }
  }),

  getters: {
    // Check if user is of legal age in their location
    isOfLegalAge: (state) => {
      if (!state.user.age || !state.user.location.legalAge) return false
      return state.user.age >= state.user.location.legalAge
    },
    
    // Get user's location details
    userLocation: (state) => state.user.location,
    
    // Get user's age
    userAge: (state) => state.user.age,
    
    // Check if session is still valid
    isSessionValid: (state) => {
      if (!state.user.verifiedAt) return false
      
      const verifiedAt = new Date(state.user.verifiedAt)
      const now = new Date()
      const duration = state.user.rememberMe 
        ? state.sessionConfig.rememberDuration 
        : state.sessionConfig.sessionDuration
      
      return (now.getTime() - verifiedAt.getTime()) < duration
    },
    
    // Should show age verification modal
    shouldShowVerification: (state) => {
      return !state.isVerified || !state.isSessionValid
    }
  },

  actions: {
    // Calculate age from birthday
    calculateAge(birthday) {
      const { day, month, year } = birthday
      const birthDate = new Date(year, month - 1, day)
      const today = new Date()
      
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      return age
    },
    
    // Validate birthday format and logic
    validateBirthday(birthday) {
      const { day, month, year } = birthday
      
      // Check if all fields are provided
      if (!day || !month || !year) {
        return { isValid: false, error: 'Please enter a complete birthdate' }
      }
      
      // Convert to numbers
      const dayNum = parseInt(day)
      const monthNum = parseInt(month)
      const yearNum = parseInt(year)
      
      // Basic range checks
      if (dayNum < 1 || dayNum > 31) {
        return { isValid: false, error: 'Day must be between 1 and 31' }
      }
      
      if (monthNum < 1 || monthNum > 12) {
        return { isValid: false, error: 'Month must be between 1 and 12' }
      }
      
      const currentYear = new Date().getFullYear()
      if (yearNum < 1900 || yearNum > currentYear) {
        return { isValid: false, error: `Year must be between 1900 and ${currentYear}` }
      }
      
      // Create date and validate it
      const birthDate = new Date(yearNum, monthNum - 1, dayNum)
      const today = new Date()
      
      // Check if the created date matches input (handles invalid dates like Feb 30)
      if (birthDate.getDate() !== dayNum || 
          birthDate.getMonth() !== monthNum - 1 || 
          birthDate.getFullYear() !== yearNum) {
        return { isValid: false, error: 'Please enter a valid date' }
      }
      
      // Check if date is not in the future
      if (birthDate > today) {
        return { isValid: false, error: 'Birthdate cannot be in the future' }
      }
      
      return { isValid: true, error: null }
    },
    
    // Validate location selection
    validateLocation(locationCode) {
      if (!locationCode) {
        return { isValid: false, error: 'Please select your location' }
      }
      
      const location = this.availableLocations.find(loc => loc.code === locationCode)
      if (!location) {
        return { isValid: false, error: 'Invalid location selected' }
      }
      
      return { isValid: true, error: null, location }
    },
    
    // Validate age against legal requirements
    validateAge(age, locationCode) {
      const location = this.availableLocations.find(loc => loc.code === locationCode)
      
      if (!location) {
        return { isValid: false, error: 'Invalid location for age verification' }
      }
      
      if (age < location.legalAge) {
        return { 
          isValid: false, 
          error: `You must be at least ${location.legalAge} years old to access this site in ${location.name}` 
        }
      }
      
      return { isValid: true, error: null }
    },
    
    // Set user data after successful verification
    async setUserData(userData) {
      try {
        // Calculate age
        const age = this.calculateAge(userData.birthday)
        
        // Find location details
        const location = this.availableLocations.find(loc => loc.code === userData.location.code)
        
        // Update store state
        this.user = {
          birthday: userData.birthday,
          location: location,
          age: age,
          verifiedAt: userData.verifiedAt || new Date().toISOString(),
          rememberMe: userData.rememberMe || false
        }
        
        this.isVerified = true
        
        // Save to localStorage if remember me is checked
        if (userData.rememberMe) {
          await this.saveToStorage()
        } else {
          // Save to sessionStorage for current session only
          await this.saveToSession()
        }
        
        return { success: true }
      } catch (error) {
        console.error('Error setting user data:', error)
        return { success: false, error: error.message }
      }
    },
    
    // Save user data to localStorage (persistent)
    async saveToStorage() {
      try {
        const userData = {
          ...this.user,
          isVerified: this.isVerified
        }
        localStorage.setItem('user_verification', JSON.stringify(userData))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },
    
    // Save user data to sessionStorage (session only)
    async saveToSession() {
      try {
        const userData = {
          ...this.user,
          isVerified: this.isVerified
        }
        sessionStorage.setItem('user_verification', JSON.stringify(userData))
      } catch (error) {
        console.error('Error saving to sessionStorage:', error)
      }
    },
    
    // Load user data from storage
    async loadFromStorage() {
      try {
        // Try localStorage first (remember me)
        let stored = localStorage.getItem('user_verification')
        
        // If not found, try sessionStorage
        if (!stored) {
          stored = sessionStorage.getItem('user_verification')
        }
        
        if (stored) {
          const userData = JSON.parse(stored)
          
          // Verify session is still valid
          if (userData.verifiedAt) {
            const verifiedAt = new Date(userData.verifiedAt)
            const now = new Date()
            const duration = userData.rememberMe 
              ? this.sessionConfig.rememberDuration 
              : this.sessionConfig.sessionDuration
            
            if ((now.getTime() - verifiedAt.getTime()) < duration) {
              // Session is still valid
              this.user = userData
              this.isVerified = userData.isVerified || false
              return { success: true, userData: this.user }
            } else {
              // Session expired, clear storage
              await this.clearStorage()
            }
          }
        }
        
        return { success: false, error: 'No valid session found' }
      } catch (error) {
        console.error('Error loading from storage:', error)
        return { success: false, error: error.message }
      }
    },
    
    // Clear all stored user data
    async clearStorage() {
      try {
        localStorage.removeItem('user_verification')
        sessionStorage.removeItem('user_verification')
      } catch (error) {
        console.error('Error clearing storage:', error)
      }
    },
    
    // Reset user data and verification status
    resetUser() {
      this.user = {
        birthday: { day: null, month: null, year: null },
        location: { code: null, name: null, legalAge: null },
        age: null,
        verifiedAt: null,
        rememberMe: false
      }
      this.isVerified = false
      this.clearStorage()
    },
    
    // Get location by code
    getLocationByCode(code) {
      return this.availableLocations.find(loc => loc.code === code)
    },
    
    // Check if user can access products for their location
    canAccessProducts() {
      return this.isVerified && this.isOfLegalAge && this.isSessionValid
    },
    
    // Get products filtered by user location (to be used with content store)
    getLocationSpecificContent(products = []) {
      if (!this.canAccessProducts()) {
        return []
      }
      
      // Filter products based on user's location
      // This can be extended based on how products are marked for different locations
      return products.filter(product => {
        // If product has location restrictions
        if (product.attributes?.availableLocations || product.availableLocations) {
          const availableLocations = product.attributes?.availableLocations || product.availableLocations
          return availableLocations.includes(this.user.location.code)
        }
        
        // If no location restrictions, show to all verified users
        return true
      })
    }
  }
})