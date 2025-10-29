
import { defineStore } from 'pinia'
import strapiAPI from '@/services/api.js'

export const useContentStore = defineStore('content', {
  state: () => ({
    contentByLanguage: {
      'fr-CA': {
        home: null,
        about: null,
        saintLaurent: null,
        products: [],
        blog: [],
        productList: null
      },
      'en': {
        home: null,
        about: null,
        saintLaurent: null,
        products: [],
        blog: [],
        productList: null
      }
    },
    currentLanguage: 'en',
    loading: {
      home: false,
      about: false,
      saintLaurent: false,
      products: false,
      blog: false,
      productList: false,
      all: false
    },
    errors: {
      home: null,
      about: null,
      saintLaurent: null,
      products: null,
      blog: null,
      productList: null,
      general: null
    },
    lastFetched: {
      'fr-CA': {
        home: null,
        about: null,
        saintLaurent: null,
        products: null,
        blog: null,
        productList: null
      },
      'en': {
        home: null,
        about: null,
        saintLaurent: null,
        products: null,
        blog: null,
        productList: null
      }
    },
    cacheDuration: 5 * 60 * 1000
  }),

  getters: {
    home: (state) => state.contentByLanguage[state.currentLanguage]?.home,
    about: (state) => state.contentByLanguage[state.currentLanguage]?.about,
    saintLaurent: (state) => state.contentByLanguage[state.currentLanguage]?.saintLaurent,
    products: (state) => state.contentByLanguage[state.currentLanguage]?.products || [],
    blog: (state) => state.contentByLanguage[state.currentLanguage]?.blog || [],
    productList: (state) => state.contentByLanguage[state.currentLanguage]?.productList,
    isDataFresh: (state) => (contentType) => {
      const lastFetch = state.lastFetched[state.currentLanguage]?.[contentType]
      if (!lastFetch) return false
      return Date.now() - lastFetch < state.cacheDuration
    },
    publishedProducts: (state) => {
      const products = state.contentByLanguage[state.currentLanguage]?.products || []
      return products.filter(product =>
        product.attributes?.publishedAt || product.publishedAt
      )
    },
    publishedBlogPosts: (state) => {
      const blog = state.contentByLanguage[state.currentLanguage]?.blog || []
      return blog.filter(post =>
        post.attributes?.publishedAt || post.publishedAt
      )
    },
    recentBlogPosts: (state) => {
      const blog = state.contentByLanguage[state.currentLanguage]?.blog || []
      const published = blog.filter(post =>
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
    isAnyLoading: (state) => {
      return Object.values(state.loading).some(loading => loading)
    },
    isAllContentLoaded: (state) => {
      const currentContent = state.contentByLanguage[state.currentLanguage]
      return (
        currentContent?.home &&
        currentContent?.about &&
        currentContent?.saintLaurent &&
        currentContent?.products?.length > 0 &&
        currentContent?.productList
      )
    }
  },

  actions: {
    setLanguage(language, refetch = false) {
      this.currentLanguage = language
      if (refetch) {
        this.fetchAllContent(true)
      }
    },

    async fetchHome(force = false) {
      const lang = this.currentLanguage
      if (!force && this.isDataFresh('home') && this.contentByLanguage[lang]?.home) {
        return this.contentByLanguage[lang].home
      }
      this.loading.home = true
      this.errors.home = null
      try {
        const response = await strapiAPI.getHome(lang)
        if (!this.contentByLanguage[lang]) this.contentByLanguage[lang] = {}
        if (!this.lastFetched[lang]) this.lastFetched[lang] = {}
        this.contentByLanguage[lang].home = response.data
        this.lastFetched[lang].home = Date.now()
        return response.data
      } catch (error) {
        this.errors.home = error.message
        throw error
      } finally {
        this.loading.home = false
      }
    },

    async fetchAbout(force = false) {
      const lang = this.currentLanguage
      if (!force && this.isDataFresh('about') && this.contentByLanguage[lang]?.about) {
        return this.contentByLanguage[lang].about
      }
      this.loading.about = true
      this.errors.about = null
      try {
        const response = await strapiAPI.getAbout(lang)
        if (!this.contentByLanguage[lang]) this.contentByLanguage[lang] = {}
        if (!this.lastFetched[lang]) this.lastFetched[lang] = {}
        this.contentByLanguage[lang].about = response.data
        this.lastFetched[lang].about = Date.now()
        return response.data
      } catch (error) {
        this.errors.about = error.message
        throw error
      } finally {
        this.loading.about = false
      }
    },

    async fetchSaintLaurent(force = false) {
      const lang = this.currentLanguage
      if (!force && this.isDataFresh('saintLaurent') && this.contentByLanguage[lang]?.saintLaurent) {
        return this.contentByLanguage[lang].saintLaurent
      }
      this.loading.saintLaurent = true
      this.errors.saintLaurent = null
      try {
        const response = await strapiAPI.getSaintLaurent(lang)
        if (!this.contentByLanguage[lang]) this.contentByLanguage[lang] = {}
        if (!this.lastFetched[lang]) this.lastFetched[lang] = {}
        this.contentByLanguage[lang].saintLaurent = response.data
        this.lastFetched[lang].saintLaurent = Date.now()
        return response.data
      } catch (error) {
        this.errors.saintLaurent = error.message
        throw error
      } finally {
        this.loading.saintLaurent = false
      }
    },

    async fetchProducts(options = {}, force = false) {
      const lang = this.currentLanguage
      if (!force && this.isDataFresh('products') && this.contentByLanguage[lang]?.products?.length > 0) {
        return this.contentByLanguage[lang].products
      }
      this.loading.products = true
      this.errors.products = null
      try {
        const response = await strapiAPI.getProducts({ locale: lang, ...options })
        if (!this.contentByLanguage[lang]) this.contentByLanguage[lang] = {}
        if (!this.lastFetched[lang]) this.lastFetched[lang] = {}
        this.contentByLanguage[lang].products = response.data || []
        this.lastFetched[lang].products = Date.now()
        return response.data || []
      } catch (error) {
        this.errors.products = error.message
        throw error
      } finally {
        this.loading.products = false
      }
    },

    async fetchBlog(options = {}, force = false) {
      const lang = this.currentLanguage
      if (!force && this.isDataFresh('blog') && this.contentByLanguage[lang]?.blog?.length > 0) {
        return this.contentByLanguage[lang].blog
      }
      this.loading.blog = true
      this.errors.blog = null
      try {
        const response = await strapiAPI.getBlogPosts({ locale: lang, ...options })
        if (!this.contentByLanguage[lang]) this.contentByLanguage[lang] = {}
        if (!this.lastFetched[lang]) this.lastFetched[lang] = {}
        this.contentByLanguage[lang].blog = response.data || []
        this.lastFetched[lang].blog = Date.now()
        return response.data || []
      } catch (error) {
        this.errors.blog = error.message
        throw error
      } finally {
        this.loading.blog = false
      }
    },

    async fetchProductList(force = false) {
      const lang = this.currentLanguage
      if (!force && this.isDataFresh('productList') && this.contentByLanguage[lang]?.productList) {
        return this.contentByLanguage[lang].productList
      }
      this.loading.productList = true
      this.errors.productList = null
      try {
        const response = await strapiAPI.getProductList(lang)
        if (!this.contentByLanguage[lang]) this.contentByLanguage[lang] = {}
        if (!this.lastFetched[lang]) this.lastFetched[lang] = {}
        this.contentByLanguage[lang].productList = response.data
        this.lastFetched[lang].productList = Date.now()
        return response.data
      } catch (error) {
        this.errors.productList = error.message
        throw error
      } finally {
        this.loading.productList = false
      }
    },

    async fetchAllContent(force = false) {
      const lang = this.currentLanguage
      this.loading.all = true
      this.errors.general = null
      try {
        await Promise.allSettled([
          this.fetchHome(force),
          this.fetchAbout(force),
          this.fetchSaintLaurent(force),
          this.fetchProducts({}, force),
          this.fetchBlog({}, force),
          this.fetchProductList(force)
        ])
      } catch (error) {
        this.errors.general = error.message
      } finally {
        this.loading.all = false
      }
    },

    async loadAllLanguages() {
      this.setLanguage('fr-CA', false)
      await this.fetchAllContent(true)
      this.setLanguage('en', false)
      await this.fetchAllContent(true)
    },

    async searchContent(query, contentTypes = ['products', 'blogs']) {
      try {
        const results = await strapiAPI.search(query, contentTypes, this.currentLanguage)
        return results
      } catch (error) {
        throw error
      }
    },

    findProductBySlug(slug) {
      const products = this.contentByLanguage[this.currentLanguage]?.products || []
      return products.find(product =>
        product.attributes?.slug === slug || product.slug === slug
      )
    },

    async fetchProductBySlug(slug) {
      try {
        const response = await strapiAPI.getProduct(slug, this.currentLanguage)
        return response.data?.[0] || null
      } catch {
        return null
      }
    },

    findBlogPostBySlug(slug) {
      const blog = this.contentByLanguage[this.currentLanguage]?.blog || []
      return blog.find(post =>
        post.attributes?.slug === slug || post.slug === slug
      )
    },

    async fetchBlogPostBySlug(slug) {
      try {
        const response = await strapiAPI.getBlogPost(slug, this.currentLanguage)
        return response.data?.[0] || null
      } catch {
        return null
      }
    },

    getMediaURL(media) {
      return strapiAPI.getMediaURL(media)
    },

    getMediaURLs(mediaArray) {
      return strapiAPI.getMediaURLs(mediaArray)
    },

    isLoading(type) {
      return this.loading[type] || false
    },

    getError(type) {
      return this.errors[type]
    },

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
        case 'productList':
          return await this.fetchProductList(force)
        case 'all':
          return await this.fetchAllContent(force)
        default:
          throw new Error(`Unknown content type: ${type}`)
      }
    },

    async checkConnection() {
      try {
        return await strapiAPI.healthCheck()
      } catch {
        return false
      }
    },

    clearCache(contentType = null, language = null) {
      if (language && contentType) {
        if (this.lastFetched[language]) {
          this.lastFetched[language][contentType] = null
        }
      } else if (language) {
        this.lastFetched[language] = {}
      } else if (contentType) {
        Object.keys(this.lastFetched).forEach(lang => {
          if (this.lastFetched[lang]) {
            this.lastFetched[lang][contentType] = null
          }
        })
      } else {
        this.lastFetched = { 'fr-CA': {}, 'en': {} }
      }
    },

    resetStore() {
      this.contentByLanguage = {
        'fr-CA': {
          home: null,
          about: null,
          saintLaurent: null,
          products: [],
          blog: [],
          productList: null
        },
        'en': {
          home: null,
          about: null,
          saintLaurent: null,
          products: [],
          blog: [],
          productList: null
        }
      }
      this.currentLanguage = 'en'
      Object.keys(this.loading).forEach(key => { this.loading[key] = false })
      Object.keys(this.errors).forEach(key => { this.errors[key] = null })
      this.lastFetched = { 'fr-CA': {}, 'en': {} }
    },

    getAllContent() {
      const currentContent = this.contentByLanguage[this.currentLanguage] || {}
      return {
        home: currentContent.home,
        about: currentContent.about,
        saintLaurent: currentContent.saintLaurent,
        products: currentContent.products || [],
        blog: currentContent.blog || [],
        productList: currentContent.productList
      }
    },

    getContentByType(type) {
      const currentContent = this.contentByLanguage[this.currentLanguage] || {}
      switch (type) {
        case 'home':
          return currentContent.home
        case 'about':
          return currentContent.about
        case 'saint-laurent':
        case 'saintLaurent':
          return currentContent.saintLaurent
        case 'products':
          return currentContent.products || []
        case 'blog':
          return currentContent.blog || []
        case 'productList':
          return currentContent.productList
        default:
          return null
      }
    },

    hasContent(type) {
      const content = this.getContentByType(type)
      if (Array.isArray(content)) {
        return content.length > 0
      }
      return content !== null && content !== undefined
    }
  }
})
