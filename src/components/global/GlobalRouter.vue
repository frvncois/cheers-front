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
      
      <div v-if="errors.general" class="error-message">
        {{ errors.general }}
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
import { ref, computed, onMounted } from 'vue'
import CheersIcon from '@/assets/CheersIcon.vue'

// Receive userStore as prop from App.vue
const props = defineProps({
  userStore: {
    type: Object,
    required: true
  }
})

// Component state - ALWAYS START WITH MODAL VISIBLE
const showModal = ref(true)
const isSubmitting = ref(false)

// Form data
const birthday = ref({
  day: '',
  month: '',
  year: ''
})
const selectedLocation = ref('')
const rememberMe = ref(false)

// Get locations from store
const locations = computed(() => props.userStore.availableLocations)
const currentYear = computed(() => new Date().getFullYear())

// Error handling
const errors = ref({
  birthday: '',
  location: '',
  age: '',
  general: ''
})

// Clear all errors
const clearErrors = () => {
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = ''
  })
}

// Main form validation and submission handler
const handleConfirm = async () => {
  clearErrors()
  isSubmitting.value = true
  
  try {
    // Step 1: Validate birthday
    const birthdayValidation = props.userStore.validateBirthday(birthday.value)
    if (!birthdayValidation.isValid) {
      errors.value.birthday = birthdayValidation.error
      return
    }
    
    // Step 2: Validate location
    const locationValidation = props.userStore.validateLocation(selectedLocation.value)
    if (!locationValidation.isValid) {
      errors.value.location = locationValidation.error
      return
    }
    
    // Step 3: Calculate age and validate against legal requirements
    const age = props.userStore.calculateAge(birthday.value)
    const ageValidation = props.userStore.validateAge(age, selectedLocation.value)
    if (!ageValidation.isValid) {
      errors.value.age = ageValidation.error
      return
    }
    
    // Step 4: Prepare user data for storage
    const userData = {
      birthday: {
        day: parseInt(birthday.value.day),
        month: parseInt(birthday.value.month),
        year: parseInt(birthday.value.year)
      },
      location: {
        code: selectedLocation.value,
        name: locationValidation.location.name,
        legalAge: locationValidation.location.legalAge
      },
      rememberMe: rememberMe.value,
      verifiedAt: new Date().toISOString()
    }
    
    // Step 5: Save user data to store
    const result = await props.userStore.setUserData(userData)
    if (!result.success) {
      errors.value.general = result.error || 'Failed to save verification data'
      return
    }
    
    // Step 6: Success - close modal and emit verification event
    showModal.value = false
    emit('verified', {
      success: true,
      user: props.userStore.user,
      canAccessProducts: props.userStore.canAccessProducts()
    })
    
  } catch (error) {
    console.error('Error during verification:', error)
    errors.value.general = 'An unexpected error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Check for existing valid session but DON'T auto-hide modal
onMounted(async () => {
  try {
    const loadResult = await props.userStore.loadFromStorage()
    
    if (loadResult.success && props.userStore.isVerified && props.userStore.isSessionValid) {
      // User has valid session - pre-fill form but keep modal visible
      if (props.userStore.user.birthday) {
        birthday.value = {
          day: props.userStore.user.birthday.day.toString(),
          month: props.userStore.user.birthday.month.toString(),
          year: props.userStore.user.birthday.year.toString()
        }
      }
      
      if (props.userStore.user.location?.code) {
        selectedLocation.value = props.userStore.user.location.code
      }
      
      rememberMe.value = props.userStore.user.rememberMe || false
      
      // KEEP MODAL VISIBLE - user must click confirm every time
    }
  } catch (error) {
    console.error('Error loading stored verification:', error)
  }
})

// Define emits
const emit = defineEmits(['verified'])

// Expose methods for parent component if needed
defineExpose({
  showModal: () => { 
    showModal.value = true 
    clearErrors()
  },
  hideModal: () => { 
    showModal.value = false 
  },
  resetForm: () => {
    birthday.value = { day: '', month: '', year: '' }
    selectedLocation.value = ''
    rememberMe.value = false
    clearErrors()
  },
  forceVerification: () => {
    props.userStore.resetUser()
    showModal.value = true
    clearErrors()
  }
})
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

.error-message {
  color: var(--error-color, #e74c3c);
  font-size: var(--font-sm);
  margin-top: calc(var(--space-xs) * -0.5);
  text-align: center;
}

.is-date input.error {
  border-bottom-color: var(--error-color, #e74c3c);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>