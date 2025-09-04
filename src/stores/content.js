import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    // Single content types
    home: null,
    about: null,
    saintLaurent: null,
    
    // Collections
    products: [],
    blog: [],
    
    // Loading states
    loading: {
      home: false,
      about: false,
      saintLaurent: false,
      products: false,
      blog: false,
      all: false
    },
    
    // Error states
    errors: {
      home: null,
      about: null,
      saintLaurent: null,
      products: null,
      blog: null,
      general: null
    },
    
    // Last fetch timestamps for caching
    lastFetched: {
      home: null,
      about: null,
      saintLaurent: null,
      products: null,
      blog: null
    },
    
    // Cache duration in milliseconds (5 minutes)
    cacheDuration: 5 * 60 * 1000
  }),

  getters: {
    // Check if data is fresh (within cache duration)
    isDataFresh: (state) => (contentType) => {
      const lastFetch = state.lastFetched[contentType]
      if (!lastFetch) return false
      return Date.now() - lastFetch < state.cacheDuration
    },
    
    // Get published products only
    publishedProducts: (state) => {
      return state.products.filter(product => 
        product.attributes?.publishedAt || product.publishedAt
      )
    },
    
    // Get published blog posts only
    publishedBlogPosts: (state) => {
      return state.blog.filter(post => 
        post.attributes?.publishedAt || post.publishedAt
      )
    },
    
    // Get recent blog posts (last 5)
    recentBlogPosts: (state) => {
      const published = state.blog.filter(post => 
        post.attributes?.publishedAt || post.publishedAt
      )
      return published
        .sort((a, b) => {
          const dateA = new Date(a.attributes?.publishedAt || a.publishedAt)
          const dateB = new Date(b.attributes?.publishedAt || b.publishedAt)
          return dateB - dateA
        })
        .slice(0, 5)
    },
    
    // Check if any content is loading
    isAnyLoading: (state) => {
      return Object.values(state.loading).some(loading => loading)
    },
    
    // Check if all content is loaded
    isAllContentLoaded: (state) => {
      return state.home && state.about && state.saintLaurent && 
             state.products.length > 0
    }
  },

  actions: {
    // Generic fetch function
    async fetchFromStrapi(endpoint, options = {}) {
      // Import translation store to get current language
      const { useTranslationStore } = await import('@/stores/translation.js')
      const translationStore = useTranslationStore()
      
      const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
      const { populate = '*', sort, filters, pagination } = options
      
      let url = `${baseURL}/api/${endpoint}`
      const params = new URLSearchParams()
      
      // ADD LOCALE PARAMETER FOR STRAPI I18N
      params.append('locale', translationStore.currentLanguage)
      
      if (populate) params.append('populate', populate)
      if (sort) params.append('sort', sort)
      if (filters) params.append('filters', JSON.stringify(filters))
      if (pagination) {
        params.append('pagination[page]', pagination.page || 1)
        params.append('pagination[pageSize]', pagination.pageSize || 25)
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      console.log(`🌐 Fetching from Strapi: ${url}`)
      console.log(`📍 Base URL: ${baseURL}`)
      console.log(`🔗 Endpoint: ${endpoint}`)
      console.log(`⚙️ Options:`, options)
      
      try {
        const apiKey = import.meta.env.VITE_STRAPI_API_KEY || '5955b69bb6ac05398461d84b6e6bbdacf55148dde8c13dc0d356d79a5cbcc46f5ec9542e7bc9bdaadda20df6e88a42ac151001d28421b884b6c86ccf3a0814d5b791d4c22a81377ac03efe0f6184574166b35640a274bc3c5e1bb8e1e2491337fc159581f6c9b918c98589fe543ac28d40fc2a2374fd478be488b4d789417add'
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        })
        
        console.log(`📡 Response status for ${endpoint}:`, response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error(`❌ HTTP error for ${endpoint}:`, {
            status: response.status,
            statusText: response.statusText,
            url: url,
            errorText: errorText
          })
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log(`✅ Data received for ${endpoint}:`, data)
        return data
      } catch (error) {
        console.error(`💥 Error fetching from ${endpoint}:`, {
          message: error.message,
          url: url,
          baseURL: baseURL,
          endpoint: endpoint
        })
        throw error
      }
    },

    // Fetch Home content
    async fetchHome(force = false) {
      if (!force && this.isDataFresh('home') && this.home) {
        console.log('🏠 Using cached home content')
        return this.home
      }
      
      console.log('🏠 Fetching home content from Strapi...')
      this.loading.home = true
      this.errors.home = null
      
      try {
        const response = await this.fetchFromStrapi('home', {
          populate: '*'
        })
        
        console.log('🏠 Home response:', response)
        this.home = response.data
        this.lastFetched.home = Date.now()
        console.log('✅ Home content loaded successfully')
        return this.home
      } catch (error) {
        console.error('❌ Home content error:', error.message)
        this.errors.home = error.message
        throw error
      } finally {
        this.loading.home = false
      }
    },

    // Fetch About content
    async fetchAbout(force = false) {
      if (!force && this.isDataFresh('about') && this.about) {
        console.log('ℹ️ Using cached about content')
        return this.about
      }
      
      console.log('ℹ️ Fetching about content from Strapi...')
      this.loading.about = true
      this.errors.about = null
      
      try {
        const response = await this.fetchFromStrapi('about', {
          populate: '*'
        })
        
        console.log('ℹ️ About response:', response)
        this.about = response.data
        this.lastFetched.about = Date.now()
        console.log('✅ About content loaded successfully')
        return this.about
      } catch (error) {
        console.error('❌ About content error:', error.message)
        this.errors.about = error.message
        throw error
      } finally {
        this.loading.about = false
      }
    },

    // Fetch Saint-Laurent content
    async fetchSaintLaurent(force = false) {
      if (!force && this.isDataFresh('saintLaurent') && this.saintLaurent) {
        console.log('🍷 Using cached Saint-Laurent content')
        return this.saintLaurent
      }
      
      console.log('🍷 Fetching Saint-Laurent content from Strapi...')
      this.loading.saintLaurent = true
      this.errors.saintLaurent = null
      
      try {
        const response = await this.fetchFromStrapi('saint-laurent', {
          populate: '*'
        })
        
        console.log('🍷 Saint-Laurent response:', response)
        this.saintLaurent = response.data
        this.lastFetched.saintLaurent = Date.now()
        console.log('✅ Saint-Laurent content loaded successfully')
        return this.saintLaurent
      } catch (error) {
        console.error('❌ Saint-Laurent content error:', error.message)
        this.errors.saintLaurent = error.message
        throw error
      } finally {
        this.loading.saintLaurent = false
      }
    },

    // Fetch Products collection
    async fetchProducts(options = {}, force = false) {
      if (!force && this.isDataFresh('products') && this.products.length > 0) {
        console.log('🛍️ Using cached products')
        return this.products
      }
      
      console.log('🛍️ Fetching products from Strapi...')
      this.loading.products = true
      this.errors.products = null
      
      try {
        const defaultOptions = {
          populate: '*',
          sort: 'createdAt:desc',
          pagination: { pageSize: 100 }
        }
        
        const response = await this.fetchFromStrapi('products', {
          ...defaultOptions,
          ...options
        })
        
        console.log('🛍️ Products response:', response)
        this.products = response.data || []
        this.lastFetched.products = Date.now()
        console.log(`✅ Products loaded successfully: ${this.products.length} products`)
        return this.products
      } catch (error) {
        console.error('❌ Products error:', error.message)
        this.errors.products = error.message
        throw error
      } finally {
        this.loading.products = false
      }
    },

    async fetchBlog(options = {}, force = false) {
      if (!force && this.isDataFresh('blog') && this.blog.length > 0) {
        console.log('📝 Using cached blog posts')
        return this.blog
      }
      
      console.log('📝 Fetching blog posts from Strapi...')
      this.loading.blog = true
      this.errors.blog = null
      
      try {
        const defaultOptions = {
          populate: '*',
          sort: 'createdAt:desc',
          pagination: { pageSize: 100 }
        }
        
        const response = await this.fetchFromStrapi('blogs', { // Changed to 'blogs'
          ...defaultOptions,
          ...options
        })
        
        console.log('📝 Blog response:', response)
        this.blog = response.data || []
        this.lastFetched.blog = Date.now()
        console.log(`✅ Blog posts loaded successfully: ${this.blog.length} posts`)
        return this.blog
      } catch (error) {
        console.error('❌ Blog posts error:', error.message)
        this.errors.blog = error.message
        throw error
      } finally {
        this.loading.blog = false
      }
    },

    // Fetch all content at once
    async fetchAllContent(force = false) {
      console.log('🚀 Starting to fetch all content from Strapi...')
      this.loading.all = true
      this.errors.general = null
      
      try {
        const results = await Promise.allSettled([
          this.fetchHome(force),
          this.fetchAbout(force),
          this.fetchSaintLaurent(force),
          this.fetchProducts({}, force),
          this.fetchBlog({}, force)
        ])
        
        console.log('📊 All content fetch results:', results)
        
        // Log any failures
        const contentTypes = ['home', 'about', 'saintLaurent', 'products', 'blog']
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`❌ Failed to load ${contentTypes[index]}:`, result.reason)
          } else {
            console.log(`✅ Successfully loaded ${contentTypes[index]}`)
          }
        })
        
      } catch (error) {
        console.error('💥 Error in fetchAllContent:', error)
        this.errors.general = error.message
      } finally {
        this.loading.all = false
        console.log('🏁 Finished fetching all content')
      }
    },

    // Find product by slug
    findProductBySlug(slug) {
      return this.products.find(product => 
        product.attributes?.slug === slug || product.slug === slug
      )
    },

    // Find blog post by slug
    findBlogPostBySlug(slug) {
      return this.blog.find(post => 
        post.attributes?.slug === slug || post.slug === slug
      )
    },

    // Clear cache for specific content type
    clearCache(contentType = null) {
      if (contentType) {
        this.lastFetched[contentType] = null
      } else {
        // Clear all cache
        Object.keys(this.lastFetched).forEach(key => {
          this.lastFetched[key] = null
        })
      }
    },

    // Reset store to initial state
    resetStore() {
      this.home = null
      this.about = null
      this.saintLaurent = null
      this.products = []
      this.blog = []
      
      Object.keys(this.loading).forEach(key => {
        this.loading[key] = false
      })
      
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = null
      })
      
      Object.keys(this.lastFetched).forEach(key => {
        this.lastFetched[key] = null
      })
    },

    // Additional utility methods
    
    // Get all content as a single object
    getAllContent() {
      return {
        home: this.home,
        about: this.about,
        saintLaurent: this.saintLaurent,
        products: this.products,
        blog: this.blog
      }
    },

    // Get content by type
    getContentByType(type) {
      switch (type) {
        case 'home':
          return this.home
        case 'about':
          return this.about
        case 'saint-laurent':
        case 'saintLaurent':
          return this.saintLaurent
        case 'products':
          return this.products
        case 'blog':
          return this.blog
        default:
          return null
      }
    },

    // Check if content type has data
    hasContent(type) {
      const content = this.getContentByType(type)
      if (Array.isArray(content)) {
        return content.length > 0
      }
      return content !== null && content !== undefined
    },

    // Get loading state for specific content type
    isLoading(type) {
      return this.loading[type] || false
    },

    // Get error for specific content type
    getError(type) {
      return this.errors[type]
    },

    // Refresh specific content type
    async refreshContent(type, force = true) {
      switch (type) {
        case 'home':
          return await this.fetchHome(force)
        case 'about':
          return await this.fetchAbout(force)
        case 'saint-laurent':
        case 'saintLaurent':
          return await this.fetchSaintLaurent(force)
        case 'products':
          return await this.fetchProducts({}, force)
        case 'blog':
          return await this.fetchBlog({}, force)
        case 'all':
          return await this.fetchAllContent(force)
        default:
          throw new Error(`Unknown content type: ${type}`)
      }
    }
  }
})