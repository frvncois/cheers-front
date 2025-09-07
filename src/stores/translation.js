import { defineStore } from 'pinia'

export const useTranslationStore = defineStore('translation', {
  state: () => ({
    currentLanguage: 'fr-CA',
    availableLanguages: [
      { code: 'fr-CA', name: 'Français' },
      { code: 'en', name: 'English' }
    ],
    
    translations: {
      navigation: {
        'fr-CA': {
          home: 'Accueil',
          products: 'Produits',
          about: 'À propos',
          blog: 'Blog',
          contact: 'Contact',
          saintLaurent: 'Saint-Laurent',
          instagram: 'Instagram',
          facebook: 'Facebook',
          newsletter: 'Infolettre'
        },
        en: {
          home: 'Home',
          products: 'Products',
          about: 'About',
          blog: 'Blog',
          contact: 'Contact',
          saintLaurent: 'Saint-Laurent',
          instagram: 'Instagram',
          facebook: 'Facebook',
          newsletter: 'Newsletter'
        }
      },

      ageVerification: {
        'fr-CA': {
          title: 'Vérification de l\'âge',
          subtitle: 'Veuillez entrer votre date de naissance pour confirmer que vous êtes en âge légal',
          dayPlaceholder: 'JJ',
          monthPlaceholder: 'MM',
          yearPlaceholder: 'AAAA',
          locationPrompt: 'Veuillez choisir votre localisation',
          policyText: 'En entrant sur ce site, vous acceptez nos conditions d\'utilisation, notre politique de confidentialité et notre politique de cookies.',
          rememberMe: 'Se souvenir de moi',
          confirm: 'Confirmer',
          verifying: 'Vérification...',
          errors: {
            invalidBirthday: 'Veuillez entrer une date de naissance valide',
            locationRequired: 'Veuillez sélectionner une localisation',
            underAge: 'Vous devez être en âge légal pour accéder à ce site',
            generalError: 'Une erreur s\'est produite. Veuillez réessayer.'
          }
        },
        en: {
          title: 'Age Verification',
          subtitle: 'Please enter your birthdate to confirm you are of legal age',
          dayPlaceholder: 'DD',
          monthPlaceholder: 'MM',
          yearPlaceholder: 'YYYY',
          locationPrompt: 'Please choose your location',
          policyText: 'By entering this site you agree to our terms and conditions, privacy and cookie policy.',
          rememberMe: 'Remember me',
          confirm: 'Confirm',
          verifying: 'Verifying...',
          errors: {
            invalidBirthday: 'Please enter a valid birthdate',
            locationRequired: 'Please select a location',
            underAge: 'You must be of legal age to access this site',
            generalError: 'An error occurred. Please try again.'
          }
        }
      },

      // Home Page Content
      home: {
        'fr-CA': {
          heroTitle1: 'Chaque <span>gramme</span> est',
          heroTitle2: 'le <span>fruit</span> de',
          heroTitle3: 'notre savoir-faire',
          passionateProducer: 'Producteur passionné',
          produce: 'Produire un',
          cannabis: 'cannabis',
          thatHonors: 'qui fait',
          honor: 'honneur',
          toThe: 'à la',
          culture: 'culture',
          qualityCannabis: 'Cannabis de qualité'
        },
        en: {
          heroTitle1: 'Every <span>gram</span> is',
          heroTitle2: 'the <span>result</span> of',
          heroTitle3: 'our expertise',
          passionateProducer: 'Passionate Producer',
          produce: 'Producing',
          cannabis: 'cannabis',
          thatHonors: 'that honors',
          honor: 'the',
          toThe: '',
          culture: 'culture',
          qualityCannabis: 'Quality Cannabis'
        }
      },

      // Contact Form
      contact: {
        'fr-CA': {
          title: 'Contactez-nous',
          description: 'Que vous ayez des suggestions, des questions ou simplement envie de partager votre expérience, nous sommes impatients de vous lire et de continuer à vous offrir le meilleur du cannabis de qualité supérieure.',
          email: 'contact@cheerscannabis.com',
          address: '560-50, rue de La Gabelle<br>Varennes, QC , J3X 2J4',
          firstName: 'Prénom',
          firstNamePlaceholder: 'Prénom',
          lastName: 'Nom',
          lastNamePlaceholder: 'Votre nom',
          emailLabel: 'Courriel',
          emailPlaceholder: 'Courriel',
          subject: 'Objet du message',
          subjectPlaceholder: 'Sujet',
          message: 'Message',
          messagePlaceholder: 'Message',
          send: 'Envoyer',
          sending: 'Envoi en cours...',
          successMessage: 'Votre message a été envoyé avec succès!',
          errorMessage: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
        },
        en: {
          title: 'Contact Us',
          description: 'Whether you have suggestions, questions or simply want to share your experience, we are eager to hear from you and continue to offer you the best in premium cannabis.',
          email: 'contact@cheerscannabis.com',
          address: '560-50, rue de La Gabelle<br>Varennes, QC , J3X 2J4',
          firstName: 'First Name',
          firstNamePlaceholder: 'First Name',
          lastName: 'Last Name',
          lastNamePlaceholder: 'Your last name',
          emailLabel: 'Email',
          emailPlaceholder: 'Email',
          subject: 'Subject',
          subjectPlaceholder: 'Subject',
          message: 'Message',
          messagePlaceholder: 'Message',
          send: 'Send',
          sending: 'Sending...',
          successMessage: 'Your message was sent successfully!',
          errorMessage: 'Error sending message. Please try again.'
        }
      },

      // Newsletter/Mailing List
      newsletter: {
        'fr-CA': {
          title: 'Une infolettre pour rester à la page',
          description: 'Inscrivez-vous à notre infolettre pour recevoir les dernières nouvelles, offres exclusives et conseils.',
          emailPlaceholder: 'Adresse courriel',
          subscribe: 'S\'inscrire',
          subscribing: 'Inscription...',
          successMessage: 'Merci de votre inscription!',
          errorMessage: 'Erreur lors de l\'inscription. Veuillez réessayer.',
          alreadySubscribed: 'Cette adresse est déjà inscrite.'
        },
        en: {
          title: 'A newsletter to stay up to date',
          description: 'Subscribe to our newsletter to receive the latest news, exclusive offers and tips.',
          emailPlaceholder: 'Email address',
          subscribe: 'Subscribe',
          subscribing: 'Subscribing...',
          successMessage: 'Thank you for subscribing!',
          errorMessage: 'Error during subscription. Please try again.',
          alreadySubscribed: 'This email is already subscribed.'
        }
      },

      // Products Section
      products: {
        'fr-CA': {
          sectionTitle: 'Découvrez nos autres gammes et produits de la famille Cheers',
          cultivatedWith: 'Cultivé avec passion',
          sharedWith: 'Partagé avec plaisir',
          craftedDescription: 'Notre équipe travaille sans relâche pour perfectionner nos techniques de culture. Nous investissons continuellement dans la recherche et le développement pour rester à la pointe de l\'industrie et répondre aux besoins de nos clients.',
          craftsmanshipTitle: 'Chaque gramme est le fruit de notre savoir-faire',
          thcRange: 'THC',
          cbdRange: 'CBD',
          aroma: 'Arômes',
          terpenes: 'Terpènes',
          availability: 'Disponibilité',
          notAvailable: 'Non disponible',
          learnMore: 'En savoir plus',
          buy: 'Acheter',
          where: 'Où acheter',
          outOfStock: 'Rupture de stock',
          backInStock: 'Bientôt de retour',
          breadcrumb: 'Produits',
          productNotFound: 'Produit non trouvé'
        },
        en: {
          sectionTitle: 'Discover our other ranges and products from the Cheers family',
          cultivatedWith: 'Cultivated with passion',
          sharedWith: 'Shared with pleasure',
          craftedDescription: 'Our team works tirelessly to perfect our cultivation techniques. We continuously invest in research and development to stay at the forefront of the industry and meet our customers\' needs.',
          craftsmanshipTitle: 'Every gram is the result of our expertise',
          thcRange: 'THC',
          cbdRange: 'CBD',
          aroma: 'Aroma',
          terpenes: 'Terpenes',
          availability: 'Availability',
          notAvailable: 'Not available',
          learnMore: 'Learn more',
          buy: 'Buy',
          where: 'Where to buy',
          outOfStock: 'Out of stock',
          backInStock: 'Coming back soon',
          breadcrumb: 'Products',
          productNotFound: 'Product not found'
        }
      },

      // About Section
      about: {
        'fr-CA': {
          tagline: 'Chaque gramme est le fruit de notre savoir-faire',
          cultivatedWith: 'Cultivé avec passion',
          sharedWith: 'Partagé avec plaisir',
          contactUs: 'Contactez-nous'
        },
        en: {
          tagline: 'Every gram is the result of our expertise',
          cultivatedWith: 'Cultivated with passion',
          sharedWith: 'Shared with pleasure',
          contactUs: 'Contact us'
        }
      },

      // Saint-Laurent Section
      saintLaurent: {
        'fr-CA': {
          introTitle1: 'Saint Laurent partage une vision commune',
          introTitle2: 'avec Cheers Cannabis',
          aboutTitle: 'En savoir plus sur Saint-Laurent',
          aboutDescription1: 'Nous nous engageons à offrir des produits de cannabis répondant aux plus hauts standards de qualité, en sélectionnant rigoureusement nos variétés et en contrôlant chaque étape de la production.',
          aboutTitle2: 'Découvrez nos produits disponible dans votre région',
          aboutDescription2: 'Chaque plante est cultivée avec soin, récoltée à la main, lentement séchée et minutieusement manucurée. Ce processus rigoureux nous permet d\'offrir un cannabis aux profils terpéniques riches. Nous croyons qu\'un produit d\'exception commence par une attention méticuleuse à chaque détail.',
          aboutDescription3: 'Saint-Laurent Cannabis partage une vision commune avec Cheers Cannabis : celle de fournir des produits de cannabis de qualité, tout en mettant l\'accent sur la durabilité. Cette synergie se traduit par des collaborations sur des projets innovants et le partage de bonnes pratiques, renforçant ainsi notre engagement envers l\'excellence et la satisfaction de notre clientèle.',
          whereToBuy: 'Où acheter'
        },
        en: {
          introTitle1: 'Saint Laurent shares a common vision',
          introTitle2: 'with Cheers Cannabis',
          aboutTitle: 'Learn more about Saint-Laurent',
          aboutDescription1: 'We are committed to offering cannabis products that meet the highest quality standards, by rigorously selecting our strains and controlling every step of production.',
          aboutTitle2: 'Discover our products available in your region',
          aboutDescription2: 'Each plant is carefully cultivated, hand-harvested, slowly dried and meticulously manicured. This rigorous process allows us to offer cannabis with rich terpene profiles. We believe that an exceptional product starts with meticulous attention to every detail.',
          aboutDescription3: 'Saint-Laurent Cannabis shares a common vision with Cheers Cannabis: to provide quality cannabis products while focusing on sustainability. This synergy translates into collaborations on innovative projects and sharing best practices, thus reinforcing our commitment to excellence and customer satisfaction.',
          whereToBuy: 'Where to buy'
        }
      },

      // Product Descriptions
      productDescriptions: {
        'fr-CA': {
          genericDescription: 'Cette variété de {{category}}, sous forme de fleurs séchées, possède une intensité de THC et contient du CBD. Elle pourrait laisser une impression d\'être plus relaxé. Ses terpènes génèrent naturellement des arômes {{aroma}}.',
          categoryDefault: 'cannabis',
          aromaDefault: 'variés'
        },
        en: {
          genericDescription: 'This {{category}} variety, in dried flower form, has THC intensity and contains CBD. It may leave an impression of being more relaxed. Its terpenes naturally generate {{aroma}} aromas.',
          categoryDefault: 'cannabis',
          aromaDefault: 'varied'
        }
      },

      // Footer
      footer: {
        'fr-CA': {
          copyright: '© 2025 cheerscannabis.com. Tous droits réservés',
          allRightsReserved: 'Tous droits réservés'
        },
        en: {
          copyright: '© 2025 cheerscannabis.com. All rights reserved',
          allRightsReserved: 'All rights reserved'
        }
      },

      // Loading States
      loading: {
        'fr-CA': {
          loading: 'Chargement...',
          loadingContent: 'Chargement du contenu...',
          pleaseWait: 'Veuillez patienter...',
          almostReady: 'Presque prêt...'
        },
        en: {
          loading: 'Loading...',
          loadingContent: 'Loading content...',
          pleaseWait: 'Please wait...',
          almostReady: 'Almost ready...'
        }
      },

      // Error Messages
      errors: {
        'fr-CA': {
          genericError: 'Une erreur s\'est produite',
          networkError: 'Erreur de réseau. Vérifiez votre connexion.',
          contentNotFound: 'Contenu non trouvé',
          pageNotFound: 'Page non trouvée',
          serverError: 'Erreur du serveur. Veuillez réessayer plus tard.',
          tryAgain: 'Réessayer',
          goHome: 'Retour à l\'accueil',
          contactSupport: 'Contacter le support'
        },
        en: {
          genericError: 'An error occurred',
          networkError: 'Network error. Check your connection.',
          contentNotFound: 'Content not found',
          pageNotFound: 'Page not found',
          serverError: 'Server error. Please try again later.',
          tryAgain: 'Try Again',
          goHome: 'Go Home',
          contactSupport: 'Contact Support'
        }
      },

      // Form Validation
      validation: {
        'fr-CA': {
          required: 'Ce champ est requis',
          invalidEmail: 'Adresse courriel invalide',
          tooShort: 'Trop court',
          tooLong: 'Trop long',
          invalidFormat: 'Format invalide',
          passwordMismatch: 'Les mots de passe ne correspondent pas',
          invalidDate: 'Date invalide'
        },
        en: {
          required: 'This field is required',
          invalidEmail: 'Invalid email address',
          tooShort: 'Too short',
          tooLong: 'Too long',
          invalidFormat: 'Invalid format',
          passwordMismatch: 'Passwords do not match',
          invalidDate: 'Invalid date'
        }
      },

      // Common Actions
      common: {
        'fr-CA': {
          yes: 'Oui',
          no: 'Non',
          ok: 'OK',
          cancel: 'Annuler',
          close: 'Fermer',
          back: 'Retour',
          next: 'Suivant',
          previous: 'Précédent',
          continue: 'Continuer',
          save: 'Sauvegarder',
          delete: 'Supprimer',
          edit: 'Modifier',
          view: 'Voir',
          download: 'Télécharger',
          upload: 'Téléverser',
          search: 'Rechercher',
          filter: 'Filtrer',
          sort: 'Trier',
          share: 'Partager',
          copy: 'Copier',
          print: 'Imprimer'
        },
        en: {
          yes: 'Yes',
          no: 'No',
          ok: 'OK',
          cancel: 'Cancel',
          close: 'Close',
          back: 'Back',
          next: 'Next',
          previous: 'Previous',
          continue: 'Continue',
          save: 'Save',
          delete: 'Delete',
          edit: 'Edit',
          view: 'View',
          download: 'Download',
          upload: 'Upload',
          search: 'Search',
          filter: 'Filter',
          sort: 'Sort',
          share: 'Share',
          copy: 'Copy',
          print: 'Print'
        }
      },

      // Date & Time
      dateTime: {
        'fr-CA': {
          days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
          daysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
          months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
          monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
          today: 'Aujourd\'hui',
          yesterday: 'Hier',
          tomorrow: 'Demain',
          now: 'Maintenant',
          am: 'AM',
          pm: 'PM'
        },
        en: {
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          today: 'Today',
          yesterday: 'Yesterday',
          tomorrow: 'Tomorrow',
          now: 'Now',
          am: 'AM',
          pm: 'PM'
        }
      }
    }
  }),

  getters: {
    // Get current language info
    currentLanguageInfo: (state) => {
      return state.availableLanguages.find(lang => lang.code === state.currentLanguage)
    },

    // Check if current language is French (default)
    isFrench: (state) => state.currentLanguage === 'fr-CA',

    // Check if current language is English
    isEnglish: (state) => state.currentLanguage === 'en',

    // Get all available languages
    languages: (state) => state.availableLanguages,

    // Get translation function - this is the main getter you'll use
    t: (state) => (key, fallback = null) => {
      // Split the key by dots to handle nested objects
      const keys = key.split('.')
      let translation = state.translations
      
      // Navigate through the translation object
      for (const k of keys) {
        if (translation && translation[k]) {
          translation = translation[k]
        } else {
          // Key not found, return fallback or key
          return fallback || key
        }
      }
      
      // Get the translation for current language
      if (translation && typeof translation === 'object' && translation[state.currentLanguage]) {
        return translation[state.currentLanguage]
      }
      
      // Fallback to French if English translation not found
      if (translation && typeof translation === 'object' && translation['fr-CA'] && state.currentLanguage !== 'fr-CA') {
        return translation['fr-CA']
      }
      
      // Return fallback or original key if no translation found
      return fallback || key
    },

    // Get translation with interpolation support
    // Usage: tl('some.key', { name: 'John', count: 5 })
    tl: (state) => (key, interpolations = {}, fallback = null) => {
      const translation = state.translations
      const keys = key.split('.')
      let result = translation
      
      // Navigate through the translation object
      for (const k of keys) {
        if (result && result[k]) {
          result = result[k]
        } else {
          return fallback || key
        }
      }
      
      // Get the translation for current language
      let translatedText = ''
      if (result && typeof result === 'object' && result[state.currentLanguage]) {
        translatedText = result[state.currentLanguage]
      } else if (result && typeof result === 'object' && result['fr-CA']) {
        translatedText = result['fr-CA']
      } else {
        return fallback || key
      }
      
      // Apply interpolations
      Object.keys(interpolations).forEach(placeholder => {
        const value = interpolations[placeholder]
        translatedText = translatedText.replace(new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g'), value)
      })
      
      return translatedText
    }
  },

  actions: {
    // Set the current language and trigger content refetch
setLanguage(languageCode) {
  if (this.availableLanguages.some(lang => lang.code === languageCode)) {
    this.currentLanguage = languageCode
    
    // Save to localStorage
    try {
      localStorage.setItem('cheers_language', languageCode)
    } catch (error) {
      console.warn('Could not save language preference to localStorage:', error)
    }
    
    // Update content store language and refetch content
    this.refetchContent()
    
    return true
  }
  return false
},

    // Set language based on user location
    setLanguageByLocation(locationCode) {
      let language = 'en' // Default to English
      
      // Only Quebec gets French
      if (locationCode === 'QC') {
        language = 'fr-CA'
      }
      
      this.setLanguage(language)
    },

    // Toggle between available languages
    toggleLanguage() {
      const currentIndex = this.availableLanguages.findIndex(lang => lang.code === this.currentLanguage)
      const nextIndex = (currentIndex + 1) % this.availableLanguages.length
      const nextLanguage = this.availableLanguages[nextIndex]
      
      this.setLanguage(nextLanguage.code)
    },

    // Refetch content from Strapi with new language
async refetchContent() {
  try {
    // Dynamic import to avoid circular dependency
    const { useContentStore } = await import('@/stores/content.js')
    const contentStore = useContentStore()
    
    // Update language in content store and refetch all content
    contentStore.setLanguage(this.currentLanguage, true) // true = force refetch
    
    console.log(`🌍 Content refetched for language: ${this.currentLanguage}`)
  } catch (error) {
    console.error('Error refetching content with new language:', error)
  }
},

    // Load language preference from localStorage
    loadLanguagePreference() {
      try {
        const savedLanguage = localStorage.getItem('cheers_language')
        if (savedLanguage && this.availableLanguages.some(lang => lang.code === savedLanguage)) {
          this.currentLanguage = savedLanguage
        }
      } catch (error) {
        console.warn('Could not load language preference from localStorage:', error)
      }
    },

    // Initialize the translation store
    init() {
      this.loadLanguagePreference()
    },

    // Add new translations (for dynamic content)
    addTranslations(category, translations) {
      if (!this.translations[category]) {
        this.translations[category] = {}
      }
      
      Object.assign(this.translations[category], translations)
    },

    // Check if a translation exists
    hasTranslation(key) {
      const keys = key.split('.')
      let translation = this.translations
      
      for (const k of keys) {
        if (translation && translation[k]) {
          translation = translation[k]
        } else {
          return false
        }
      }
      
      return translation && typeof translation === 'object' && 
             (translation[this.currentLanguage] || translation['fr-CA'])
    },

    // Get available keys for a category
    getKeysForCategory(category) {
      if (!this.translations[category]) {
        return []
      }
      
      return Object.keys(this.translations[category])
    },

    // Debug helper - get all translation keys
    getAllTranslationKeys() {
      const keys = []
      
      const traverse = (obj, prefix = '') => {
        Object.keys(obj).forEach(key => {
          const newKey = prefix ? `${prefix}.${key}` : key
          if (typeof obj[key] === 'object' && obj[key] !== null && !obj[key].fr && !obj[key].en) {
            traverse(obj[key], newKey)
          } else {
            keys.push(newKey)
          }
        })
      }
      
      traverse(this.translations)
      return keys
    }
  }
})