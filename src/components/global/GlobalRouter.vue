<template>
  <div v-if="showModal" class="router">
    <div class="is-wrap">
      <div class="is-header">
        <CheersIcon />
        <p>Please enter your birthdate to confirm you are of legal age</p>
      </div>
      
      <div class="is-date">
        <input 
          v-model="birthday.day"
          placeholder="DD" 
          type="number" 
          min="1" 
          max="31"
          :class="{ error: errors.birthday }"
        />
        <input 
          v-model="birthday.month"
          placeholder="MM" 
          type="number" 
          min="1" 
          max="12"
          :class="{ error: errors.birthday }"
        />
        <input 
          v-model="birthday.year"
          placeholder="YYYY" 
          type="number" 
          min="1900" 
          :max="currentYear"
          :class="{ error: errors.birthday }"
        />
      </div>
      
      <div v-if="errors.birthday" class="error-message">
        {{ errors.birthday }}
      </div>
      
      <p>Please choose your location</p>
      <div class="is-locations">
          <label v-for="location in locations" :key="location.code">
            <input 
              type="radio" 
              :value="location.code" 
              v-model="selectedLocation"
              name="location"
            />
            {{ location.name }}
          </label>
      </div>
      
      <div v-if="errors.location" class="error-message">
        {{ errors.location }}
      </div>
      
      <div v-if="errors.age" class="error-message">
        {{ errors.age }}
      </div>
      
      <div class="is-policy">
        <p>By entering this site you agree to our terms and conditions, privacy and cookie policy.</p>
      </div>
      
      <div class="is-actions">
        <label>
          <input type="checkbox" v-model="rememberMe" />
          Remember me
        </label>
        <button @click="handleConfirm" :disabled="isSubmitting">
          {{ isSubmitting ? 'Verifying...' : 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import CheersIcon from '@/assets/CheersIcon.vue'

const userStore = useUserStore()

// Component state
const showModal = ref(true)
const isSubmitting = ref(false)
const rememberMe = ref(false)

// Form data
const birthday = ref({
  day: '',
  month: '',
  year: ''
})

const selectedLocation = ref('')

// Available locations with their legal drinking ages
const locations = ref([
  { code: 'QC', name: 'Québec', legalAge: 18 },
  { code: 'CA', name: 'Canada', legalAge: 19 },
  { code: 'DE', name: 'Germany', legalAge: 16 },
  { code: 'UK', name: 'UK', legalAge: 18 }
])

// Error handling
const errors = ref({
  birthday: '',
  location: '',
  age: ''
})

const currentYear = computed(() => new Date().getFullYear())

// Validation functions
const validateBirthday = () => {
  const { day, month, year } = birthday.value
  
  if (!day || !month || !year) {
    errors.value.birthday = 'Please enter a complete birthdate'
    return false
  }
  
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()
  
  // Check if date is valid
  if (birthDate.getDate() != day || birthDate.getMonth() != month - 1 || birthDate.getFullYear() != year) {
    errors.value.birthday = 'Please enter a valid date'
    return false
  }
  
  // Check if date is not in the future
  if (birthDate > today) {
    errors.value.birthday = 'Birthdate cannot be in the future'
    return false
  }
  
  errors.value.birthday = ''
  return true
}

const validateLocation = () => {
  if (!selectedLocation.value) {
    errors.value.location = 'Please select your location'
    return false
  }
  errors.value.location = ''
  return true
}

const validateAge = () => {
  const { day, month, year } = birthday.value
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()
  
  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  // Get legal age for selected location
  const location = locations.value.find(loc => loc.code === selectedLocation.value)
  const legalAge = location ? location.legalAge : 18
  
  if (age < legalAge) {
    errors.value.age = `You must be at least ${legalAge} years old to access this site in ${location.name}`
    return false
  }
  
  errors.value.age = ''
  return true
}

const clearErrors = () => {
  errors.value = {
    birthday: '',
    location: '',
    age: ''
  }
}

const handleConfirm = async () => {
  clearErrors()
  isSubmitting.value = true
  
  try {
    // Validate all fields
    const isBirthdayValid = validateBirthday()
    const isLocationValid = validateLocation()
    
    if (!isBirthdayValid || !isLocationValid) {
      return
    }
    
    // Validate age
    const isAgeValid = validateAge()
    if (!isAgeValid) {
      return
    }
    
    // Get location details
    const locationDetails = locations.value.find(loc => loc.code === selectedLocation.value)
    
    // Prepare user data
    const userData = {
      birthday: {
        day: parseInt(birthday.value.day),
        month: parseInt(birthday.value.month),
        year: parseInt(birthday.value.year)
      },
      location: {
        code: selectedLocation.value,
        name: locationDetails.name,
        legalAge: locationDetails.legalAge
      },
      rememberMe: rememberMe.value,
      verifiedAt: new Date().toISOString()
    }
    
    // Save to store
    await userStore.setUserData(userData)
    
    // Close modal
    showModal.value = false
    
    // Emit event to parent component
    emit('verified', userData)
    
  } catch (error) {
    console.error('Error during verification:', error)
    errors.value.age = 'An error occurred during verification. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Define emits
const emit = defineEmits(['verified'])
</script>

<style scoped>
.router {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5em);
  z-index: 999;
  > .is-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: var(--space-md);
    background: var(--yellow);
    color: var(--purple);
    width: min(30em, 90vw);
    padding: var(--space-md);
    text-align: center;
    border-radius: var(--space-sm);
    > .is-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-rg);
    }
    > .is-date {
      display: flex;
      gap: var(--space-xs);
      margin: auto;
      & input {
        border: unset;
        border-bottom: 1px solid var(--purple);
        background: transparent;
        appearance: textfield;
        font-size: var(--font-md);
        text-align: center;
      }
    }
    > .is-locations {
      display: flex;
      gap: var(--space-xs);
      margin: auto;
      & input {
        display: none;
      }
      & label {
        width: 5em;
        border: 1px solid var(--purple);
        padding: var(--space-xs);
        border-radius: var(--space-sm);
        cursor: pointer;
      }
      label:has(input:checked) {
        background: var(--purple);
        color: var(--yellow);
      }
    }
    > .is-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      > button {
        background: var(--purple);
        color: var(--yellow);
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--space-sm);
      }
    }
  }
  & p {
    font-size: var(--font-md);
    line-height: 1;
  }
}


</style>