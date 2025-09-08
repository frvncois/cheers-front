import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isVerified: false,
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
    availableLocations: [
      { code: 'QC', name: 'Québec', legalAge: 18 },
      { code: 'ON', name: 'Ontario', legalAge: 19 },
      { code: 'DE', name: 'Germany', legalAge: 16 },
      { code: 'UK', name: 'UK', legalAge: 18 }
    ],
    sessionConfig: {
      rememberDuration: 30 * 24 * 60 * 60 * 1000,
      sessionDuration: 24 * 60 * 60 * 1000
    }
  }),

  getters: {
    isOfLegalAge: (state) => {
      if (!state.user.age || !state.user.location.legalAge) return false
      return state.user.age >= state.user.location.legalAge
    },
    userLocation: (state) => state.user.location,
    userAge: (state) => state.user.age,
    isSessionValid: (state) => {
      if (!state.user.verifiedAt) return false
      const verifiedAt = new Date(state.user.verifiedAt)
      const now = new Date()
      const duration = state.user.rememberMe
        ? state.sessionConfig.rememberDuration
        : state.sessionConfig.sessionDuration
      return (now.getTime() - verifiedAt.getTime()) < duration
    },
    shouldShowVerification: (state) => {
      return !state.isVerified || !state.isSessionValid
    }
  },

  actions: {
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

    validateBirthday(birthday) {
      const { day, month, year } = birthday
      if (!day || !month || !year) {
        return { isValid: false, error: 'Please enter a complete birthdate' }
      }
      const dayNum = parseInt(day)
      const monthNum = parseInt(month)
      const yearNum = parseInt(year)
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
      const birthDate = new Date(yearNum, monthNum - 1, dayNum)
      const today = new Date()
      if (
        birthDate.getDate() !== dayNum ||
        birthDate.getMonth() !== monthNum - 1 ||
        birthDate.getFullYear() !== yearNum
      ) {
        return { isValid: false, error: 'Please enter a valid date' }
      }
      if (birthDate > today) {
        return { isValid: false, error: 'Birthdate cannot be in the future' }
      }
      return { isValid: true, error: null }
    },

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

    async setUserData(userData) {
      try {
        const age = this.calculateAge(userData.birthday)
        const location = this.availableLocations.find(loc => loc.code === userData.location.code)
        this.user = {
          birthday: userData.birthday,
          location: location,
          age: age,
          verifiedAt: userData.verifiedAt || new Date().toISOString(),
          rememberMe: userData.rememberMe || false
        }
        this.isVerified = true
        if (userData.rememberMe) {
          await this.saveToStorage()
        } else {
          await this.saveToSession()
        }
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    async saveToStorage() {
      try {
        const userData = {
          ...this.user,
          isVerified: this.isVerified
        }
        localStorage.setItem('user_verification', JSON.stringify(userData))
      } catch (error) {}
    },

    async saveToSession() {
      try {
        const userData = {
          ...this.user,
          isVerified: this.isVerified
        }
        sessionStorage.setItem('user_verification', JSON.stringify(userData))
      } catch (error) {}
    },

    async loadFromStorage() {
      try {
        let stored = localStorage.getItem('user_verification')
        if (!stored) {
          stored = sessionStorage.getItem('user_verification')
        }
        if (stored) {
          const userData = JSON.parse(stored)
          if (userData.verifiedAt) {
            const verifiedAt = new Date(userData.verifiedAt)
            const now = new Date()
            const duration = userData.rememberMe
              ? this.sessionConfig.rememberDuration
              : this.sessionConfig.sessionDuration
            if ((now.getTime() - verifiedAt.getTime()) < duration) {
              this.user = userData
              this.isVerified = userData.isVerified || false
              return { success: true, userData: this.user }
            } else {
              await this.clearStorage()
            }
          }
        }
        return { success: false, error: 'No valid session found' }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    async clearStorage() {
      try {
        localStorage.removeItem('user_verification')
        sessionStorage.removeItem('user_verification')
      } catch (error) {}
    },

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

    getLocationByCode(code) {
      return this.availableLocations.find(loc => loc.code === code)
    },

    canAccessProducts() {
      return this.isVerified && this.isOfLegalAge && this.isSessionValid
    },

    getLocationSpecificContent(products = []) {
      if (!this.canAccessProducts()) {
        return []
      }
      return products.filter(product => {
        if (product.attributes?.availableLocations || product.availableLocations) {
          const availableLocations = product.attributes?.availableLocations || product.availableLocations
          return availableLocations.includes(this.user.location.code)
        }
        return true
      })
    }
  }
})
