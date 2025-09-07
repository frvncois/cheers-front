// stores/content.js
import { defineStore } from 'pinia'
import strapiAPI from '@/services/api.js'

export const useContentStore = defineStore('content', {
  state: () => ({
    // Single content types
    home: null,
    about: null,
    saintLaurent: null,
    global: null,
    
    // Collections
    products: [],
    blog: [],
    categories: [],
    tags: [],
    
    // Current language for API calls
    currentLanguage: 'en',
    
    // Loading states
    loading: {
      home: false,
      about: false,
      saintLaurent: false,
      global: false,
      products: false,
      blog: false,
      categories: false,
      tags: false,
      all: false
    },
    
    // Error states
    errors: {
      home: null,
      about: null,
      saintLaurent: null,
      global: null,
      products: null,
      blog: null,
      categories: null,
      tags: null,
      general: null
    },
    
    // Last fetch timestamps for caching
    lastFetched: {
      home: null,
      about: null,
      saintLaurent: null,
      global: null,
      products: null,
      blog: null,
      categories: null,
      tags: null
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
    
    // Get products by category
    productsByCategory: (state) => (categorySlug) => {
      return state.products.filter(product => {
        const category = product.attributes?.category?.data?.attributes || product.category
        return category?.slug === categorySlug
      })
    },
    
    // Get blog posts by category
    blogPostsByCategory: (state) => (categorySlug) => {
      return state.blog.filter(post => {
        const category = post.attributes?.category?.data?.attributes || post.category
        return category?.slug === categorySlug
      })
    },
    
    // Check if any content is loading
    isAnyLoading: (state) => {
      return Object.values(state.loading).some(loading => loading)
    },
    
    // Check if all essential content is loaded
    isAllContentLoaded: (state) => {
      return state.home && state.about && state.saintLaurent && 
             state.products.length > 0
    }
  },

  actions: {
    // Set current language and refetch content if needed
    setLanguage(language, refetch = false) {
      const oldLanguage = this.currentLanguage
      this.currentLanguage = language
      
      if (refetch && oldLanguage !== language) {
        console.log(`🌐 Language changed from ${oldLanguage} to ${language}, refetching content...`)
        this.fetchAllContent(true)
      }
    },

    // Fetch Home content
    async fetchHome(force = false) {
      if (!force && this.isDataFresh('home') && this.home) {
        console.log('🏠 Using cached home content')
        return this.home
      }
      
      console.log('🏠 Fetching home content from Strapi Cloud...')
      this.loading.home = true
      this.errors.home = null
      
      try {
        const response = await strapiAPI.getHome(this.currentLanguage)
        
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
      
      console.log('ℹ️ Fetching about content from Strapi Cloud...')
      this.loading.about = true
      this.errors.about = null
      
      try {
        const response = await strapiAPI.getAbout(this.currentLanguage)
        
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
      
      console.log('🍷 Fetching Saint-Laurent content from Strapi Cloud...')
      this.loading.saintLaurent = true
      this.errors.saintLaurent = null
      
      try {
        const response = await strapiAPI.getSaintLaurent(this.currentLanguage)
        
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

    // Fetch Global settings
    async fetchGlobal(force = false) {
      if (!force && this.isDataFresh('global') && this.global) {
        console.log('🌐 Using cached global settings')
        return this.global
      }
      
      console.log('🌐 Fetching global settings from Strapi Cloud...')
      this.loading.global = true
      this.errors.global = null
      
      try {
        const response = await strapiAPI.getGlobalSettings(this.currentLanguage)
        
        console.log('🌐 Global response:', response)
        this.global = response.data
        this.lastFetched.global = Date.now()
        console.log('✅ Global settings loaded successfully')
        return this.global
      } catch (error) {
        console.error('❌ Global settings error:', error.message)
        this.errors.global = error.message
        throw error
      } finally {
        this.loading.global = false
      }
    },

    // Fetch Products collection
    async fetchProducts(options = {}, force = false) {
      if (!force && this.isDataFresh('products') && this.products.length > 0) {
        console.log('🛍️ Using cached products')
        return this.products
      }
      
      console.log('🛍️ Fetching products from Strapi Cloud...')
      this.loading.products = true
      this.errors.products = null
      
      try {
        const defaultOptions = {
          locale: this.currentLanguage
        }
        
        const response = await strapiAPI.getProducts({
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

    // Fetch Blog collection
    async fetchBlog(options = {}, force = false) {
      if (!force && this.isDataFresh('blog') && this.blog.length > 0) {
        console.log('📝 Using cached blog posts')
        return this.blog
      }
      
      console.log('📝 Fetching blog posts from Strapi Cloud...')
      this.loading.blog = true
      this.errors.blog = null
      
      try {
        const defaultOptions = {
          locale: this.currentLanguage
        }
        
        const response = await strapiAPI.getBlogPosts({
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

    // Fetch Categories
    async fetchCategories(type = 'product', force = false) {
      if (!force && this.isDataFresh('categories') && this.categories.length > 0) {
        console.log('📂 Using cached categories')
        return this.categories
      }
      
      console.log('📂 Fetching categories from Strapi Cloud...')
      this.loading.categories = true
      this.errors.categories = null
      
      try {
        const response = await strapiAPI.getCategories(type, this.currentLanguage)
        
        console.log('📂 Categories response:', response)
        this.categories = response.data || []
        this.lastFetched.categories = Date.now()
        console.log(`✅ Categories loaded successfully: ${this.categories.length} categories`)
        return this.categories
      } catch (error) {
        console.error('❌ Categories error:', error.message)
        this.errors.categories = error.message
        throw error
      } finally {
        this.loading.categories = false
      }
    },

    // Fetch Tags
    async fetchTags(force = false) {
      if (!force && this.isDataFresh('tags') && this.tags.length > 0) {
        console.log('🏷️ Using cached tags')
        return this.tags
      }
      
      console.log('🏷️ Fetching tags from Strapi Cloud...')
      this.loading.tags = true
      this.errors.tags = null
      
      try {
        const response = await strapiAPI.getTags(this.currentLanguage)
        
        console.log('🏷️ Tags response:', response)
        this.tags = response.data || []
        this.lastFetched.tags = Date.now()
        console.log(`✅ Tags loaded successfully: ${this.tags.length} tags`)
        return this.tags
      } catch (error) {
        console.error('❌ Tags error:', error.message)
        this.errors.tags = error.message
        throw error
      } finally {
        this.loading.tags = false
      }
    },

    // Fetch all content at once
    async fetchAllContent(force = false) {
      console.log('🚀 Starting to fetch all content from Strapi Cloud...')
      this.loading.all = true
      this.errors.general = null
      
      try {
        const results = await Promise.allSettled([
          this.fetchHome(force),
          this.fetchAbout(force),
          this.fetchSaintLaurent(force),
          this.fetchGlobal(force),
          this.fetchProducts({}, force),
          this.fetchBlog({}, force),
          this.fetchCategories('product', force),
          this.fetchTags(force)
        ])
        
        console.log('📊 All content fetch results:', results)
        
        // Log any failures
        const contentTypes = ['home', 'about', 'saintLaurent', 'global', 'products', 'blog', 'categories', 'tags']
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`❌ Failed to load ${contentTypes[index]}:`, result.reason)
          } else {
            console.log(`✅ Successfully loaded ${contentTypes[index]}`)
          }
        })
        
        // Return success count
        const successCount = results.filter(r => r.status === 'fulfilled').length
        console.log(`📈 Successfully loaded ${successCount}/${results.length} content types`)
        
      } catch (error) {
        console.error('💥 Error in fetchAllContent:', error)
        this.errors.general = error.message
      } finally {
        this.loading.all = false
        console.log('🏁 Finished fetching all content')
      }
    },

    // Search content
    async searchContent(query, contentTypes = ['products', 'blogs']) {
      console.log(`🔍 Searching for: "${query}"`)
      
      try {
        const results = await strapiAPI.search(query, contentTypes, this.currentLanguage)
        console.log('🔍 Search results:', results)
        return results
      } catch (error) {
        console.error('❌ Search error:', error.message)
        throw error
      }
    },

    // Find product by slug
    findProductBySlug(slug) {
      return this.products.find(product => 
        product.attributes?.slug === slug || product.slug === slug
      )
    },

    // Fetch single product by slug
    async fetchProductBySlug(slug) {
      try {
        const response = await strapiAPI.getProduct(slug, this.currentLanguage)
        return response.data?.[0] || null
      } catch (error) {
        console.error('❌ Error fetching product:', error)
        return null
      }
    },

    // Find blog post by slug
    findBlogPostBySlug(slug) {
      return this.blog.find(post => 
        post.attributes?.slug === slug || post.slug === slug
      )
    },

    // Fetch single blog post by slug
    async fetchBlogPostBySlug(slug) {
      try {
        const response = await strapiAPI.getBlogPost(slug, this.currentLanguage)
        return response.data?.[0] || null
      } catch (error) {
        console.error('❌ Error fetching blog post:', error)
        return null
      }
    },

    // Utility methods for media URLs
    getMediaURL(media) {
      return strapiAPI.getMediaURL(media)
    },

    getMediaURLs(mediaArray) {
      return strapiAPI.getMediaURLs(mediaArray)
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
      this.global = null
      this.products = []
      this.blog = []
      this.categories = []
      this.tags = []
      this.currentLanguage = 'en'
      
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

    // Get all content as a single object
    getAllContent() {
      return {
        home: this.home,
        about: this.about,
        saintLaurent: this.saintLaurent,
        global: this.global,
        products: this.products,
        blog: this.blog,
        categories: this.categories,
        tags: this.tags
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
        case 'global':
          return this.global
        case 'products':
          return this.products
        case 'blog':
          return this.blog
        case 'categories':
          return this.categories
        case 'tags':
          return this.tags
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
        case 'categories':
          return await this.fetchCategories('product', force)
        case 'tags':
          return await this.fetchTags(force)
        case 'all':
          return await this.fetchAllContent(force)
        default:
          throw new Error(`Unknown content type: ${type}`)
      }
    },

    // Health check for Strapi connection
    async checkConnection() {
      try {
        const isHealthy = await strapiAPI.healthCheck()
        console.log(isHealthy ? '✅ Strapi connection is healthy' : '❌ Strapi connection failed')
        return isHealthy
      } catch (error) {
        console.error('❌ Strapi health check error:', error)
        return false
      }
    }
  }
})