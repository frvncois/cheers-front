import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const userData = ref(null)
  const isVerified = ref(false)
  const isLoading = ref(false)
  
  // Storage key for localStorage
  const STORAGE_KEY = 'ageVerification'
  
  // Getters
  const userLocation = computed(() => {
    return userData.value?.location || null
  })
  
  const userAge = computed(() => {
    if (!userData.value?.birthday) return null
    
    const { day, month, year } = userData.value.birthday
    const birthDate = new Date(year, month - 1, day)
    const today = new Date()
    
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  })
  
  const isLegalAge = computed(() => {
    if (!userData.value) return false
    return userAge.value >= userData.value.location.legalAge
  })
  
  const shouldRememberUser = computed(() => {
    return userData.value?.rememberMe || false
  })
  
  // Actions
  const setUserData = async (data) => {
    try {
      isLoading.value = true
      
      // Validate required data
      if (!data.birthday || !data.location) {
        throw new Error('Invalid user data: birthday and location are required')
      }
      
      // Set user data
      userData.value = {
        ...data,
        verifiedAt: data.verifiedAt || new Date().toISOString()
      }
      
      isVerified.value = true
      
      // Save to localStorage if user wants to be remembered
      if (data.rememberMe) {
        await saveToStorage()
      }
      
      console.log('User data saved successfully:', userData.value)
      
    } catch (error) {
      console.error('Error saving user data:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  const loadUserData = async () => {
    try {
      isLoading.value = true
      
      const storedData = localStorage.getItem(STORAGE_KEY)
      
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        
        // Check if the stored data is still valid (e.g., not older than 30 days)
        const verifiedAt = new Date(parsedData.verifiedAt)
        const now = new Date()
        const daysDiff = Math.floor((now - verifiedAt) / (1000 * 60 * 60 * 24))
        
        if (daysDiff <= 30) {
          userData.value = parsedData
          isVerified.value = true
          console.log('User data loaded from storage')
          return true
        } else {
          // Data is too old, remove it
          await clearUserData()
          console.log('Stored user data expired, cleared')
        }
      }
      
      return false
      
    } catch (error) {
      console.error('Error loading user data:', error)
      await clearUserData()
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  const saveToStorage = async () => {
    try {
      if (userData.value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData.value))
        console.log('User data saved to localStorage')
      }
    } catch (error) {
      console.error('Error saving to storage:', error)
      // Don't throw error, as this is not critical
    }
  }
  
  const clearUserData = async () => {
    try {
      userData.value = null
      isVerified.value = false
      localStorage.removeItem(STORAGE_KEY)
      console.log('User data cleared')
    } catch (error) {
      console.error('Error clearing user data:', error)
    }
  }
  
  const updateLocation = async (locationData) => {
    try {
      if (!userData.value) {
        throw new Error('No user data available')
      }
      
      userData.value.location = locationData
      
      // Save to storage if user has rememberMe enabled
      if (shouldRememberUser.value) {
        await saveToStorage()
      }
      
      console.log('User location updated:', locationData)
      
    } catch (error) {
      console.error('Error updating location:', error)
      throw error
    }
  }
  
  const validateUser = () => {
    if (!userData.value) {
      console.warn('No user data available')
      return false
    }
    
    if (!isLegalAge.value) {
      console.warn('User is not of legal age')
      return false
    }
    
    return true
  }
  
  const init = async () => {
    await loadUserData()
  }
  
  return {
    userData,
    isVerified,
    isLoading,
    
    // Getters
    userLocation,
    userAge,
    isLegalAge,
    shouldRememberUser,
    
    // Actions
    setUserData,
    loadUserData,
    clearUserData,
    updateLocation,
    validateUser,
    init
  }
})