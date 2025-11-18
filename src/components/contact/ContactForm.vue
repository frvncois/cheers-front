<script setup>
import { ref } from 'vue';
import ButtonMailing from '@/assets/ButtonMailing.vue';
import ButtonBorder from '@/assets/ButtonBorder.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
});

// Form state
const isSubmitting = ref(false);
const submitStatus = ref(null); // 'success', 'error', or null
const errorMessage = ref('');

// Form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();

  // Reset status
  submitStatus.value = null;
  errorMessage.value = '';

  // Basic validation
  if (!formData.value.firstName || !formData.value.lastName || !formData.value.email || !formData.value.subject || !formData.value.message) {
    errorMessage.value = props.translationStore.translations.contact[props.translationStore.currentLanguage].errorRequired || 'All fields are required';
    submitStatus.value = 'error';
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    errorMessage.value = props.translationStore.translations.contact[props.translationStore.currentLanguage].errorEmail || 'Please enter a valid email address';
    submitStatus.value = 'error';
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value)
    });

    const data = await response.json();

    if (response.ok) {
      submitStatus.value = 'success';
      // Reset form
      formData.value = {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      };
    } else {
      submitStatus.value = 'error';
      errorMessage.value = data.error || (props.translationStore.translations.contact[props.translationStore.currentLanguage].errorSending || 'Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    submitStatus.value = 'error';
    errorMessage.value = props.translationStore.translations.contact[props.translationStore.currentLanguage].errorSending || 'Failed to send message. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section data-bg="yellow">
    <div class="contact">
      <div class="is-content">
        <h1 data-animate="fade" data-animate-duration="1000" v-html="props.translationStore.translations.contact[props.translationStore.currentLanguage].contactUs"></h1>
        <p data-animate="fade" data-animate-delay="150">{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].description }}</p>
        <a data-animate="fade" data-animate-delay="200">{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].email }}</a>
        <p data-animate="fade" data-animate-delay="250" v-html="props.translationStore.translations.contact[props.translationStore.currentLanguage].address"></p>
      </div>
      <form class="is-form" data-animate="reveal" data-animate-delay="250" @submit="handleSubmit">
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].lastName }}</label>
          <input
            v-model="formData.lastName"
            type="text"
            :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].lastNamePlaceholder"
            :disabled="isSubmitting"
          />
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].firstName }}</label>
          <input
            v-model="formData.firstName"
            type="text"
            :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].firstNamePlaceholder"
            :disabled="isSubmitting"
          />
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].emailLabel }}</label>
          <input
            v-model="formData.email"
            type="email"
            :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].emailPlaceholder"
            :disabled="isSubmitting"
          />
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].subject }}</label>
          <input
            v-model="formData.subject"
            type="text"
            :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].subjectPlaceholder"
            :disabled="isSubmitting"
          />
        </div>
        <div>
          <label>{{ props.translationStore.translations.contact[props.translationStore.currentLanguage].message }}</label>
          <textarea
            v-model="formData.message"
            :placeholder="props.translationStore.translations.contact[props.translationStore.currentLanguage].messagePlaceholder"
            :disabled="isSubmitting"
          ></textarea>
        </div>

        <!-- Status messages -->
        <div v-if="submitStatus === 'success'" class="message success">
          {{ props.translationStore.translations.contact[props.translationStore.currentLanguage].successMessage || 'Your message has been sent successfully!' }}
        </div>
        <div v-if="submitStatus === 'error'" class="message error">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? (props.translationStore.translations.contact[props.translationStore.currentLanguage].sending || 'Sending...') : props.translationStore.translations.contact[props.translationStore.currentLanguage].send }}
          <ButtonMailing/>
          <ButtonBorder />
        </button>
      </form>
    </div>
    <div class="overlay">
      <div class="is-image">
        <img speed="-0.5" src="@/assets/hero.png" alt="Contact Cover"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
    > .contact {
        display: flex;
        flex-direction: row;
        padding: var(--space-2xl);
        gap: var(--space-lg);
    background: var(--yellow);
    color: var(--purple);
    position: relative;
        > .is-content {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: var(--font-xl);
            > h1 {
                font-size: var(--font-xl);
            }
        }
        > .is-form {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: var(--space-rg);
            > div {
                display: flex;
                flex-direction: column;
            }
        }
    }
    > .cover {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding-bottom: var(--space-lg);
        > .is-image {
            height: 100%;
            margin: auto;
            > img {
                height: 100%;
                object-fit: cover;
            }
        }
    }
    > .overlay {
        position: absolute;
        top: 70vh;
        width: 25em;
        height: 100%;
        pointer-events: none;
        > .is-image {
            width: 25em;
            height: 100%;
            margin: auto;
            transform: rotate(15deg);
            
            > img {
                width: 45em;
                height: 100%;
                object-fit: contain;
                margin-left: -20em;
            }
        }
    }
    & input, textarea {
        background: transparent;
        border: unset;
        border-bottom: 1px solid var(--purple);
        font-family: 'body';
        font-size: var(--font-md);
        padding: var(--space-xs) 0;
        resize: none;
        transition: opacity 0.3s ease;
        :focus {
            outline: none;
        }
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
    & button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-xs);
        position: relative;
        padding-right: 2.5ch;
        transition: opacity 0.3s ease;
        > svg:nth-child(2) {
            position: absolute;
            width: 10em;
            height: 100%;
            top: 0;
            right: 0;
            margin-right: 0;
            bottom: 0;
        }
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
    & .message {
        padding: var(--space-sm);
        border-radius: 4px;
        font-size: var(--font-sm);
        margin-top: var(--space-xs);
        &.success {
            background: rgba(0, 128, 0, 0.1);
            color: darkgreen;
            border: 1px solid rgba(0, 128, 0, 0.3);
        }
        &.error {
            background: rgba(255, 0, 0, 0.1);
            color: darkred;
            border: 1px solid rgba(255, 0, 0, 0.3);
        }
    }
}

@media screen and (max-width: 768px) {
section {
  > .contact {
      padding: var(--space-lg);
      padding-top: 50vh;
      flex-direction: column;
    }
    > .overlay {
        display: none;
    }
    > .cover {
        display: none;
    }
  }
}
</style>