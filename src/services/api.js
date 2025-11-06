class StrapiAPI {
  constructor() {
    this.baseURL = import.meta.env.VITE_STRAPI_URL || 'https://heroic-champion-86333ba9c3.strapiapp.com'
    this.apiToken = import.meta.env.VITE_STRAPI_API_KEY || '259420a33b8b2bbd98033ef6649bf8ec49f91fcb182edf2b93ba39d01f90c3aa969f1b3923ca19e0ea134a22be0a2a17e1a63dc0886cac6c7e10243d474657612cfa501b8f0e478c1433471ae705f07b3a2dd66a5a4c35a4967de83a682f4cd411e3129d61a84820ec726fae22641a8e8af19adf98b650aae2cd10225bc51ce3'
  }

  buildURL(endpoint, options = {}) {
    const {
      populate = '*',
      sort,
      filters,
      pagination,
      locale,
      query
    } = options

    let url = `${this.baseURL}/api/${endpoint}`
    const params = new URLSearchParams()

    const resolvedLocale = locale ?? 'en'
    if (resolvedLocale !== false) {
      params.append('locale', resolvedLocale)
    }

    if (populate === '*') {
      params.append('populate', '*')
    } else if (Array.isArray(populate)) {
      populate.forEach(path => {
        params.append('populate', path)
      })
    } else if (typeof populate === 'string') {
      params.append('populate', populate)
    }

    if (sort) {
      params.append('sort', sort)
    }

    if (filters) {
      if (typeof filters === 'object') {
        Object.entries(filters).forEach(([key, value]) => {
          params.append(`filters[${key}]`, value)
        })
      }
    }

    if (pagination) {
      if (pagination.page) params.append('pagination[page]', pagination.page)
      if (pagination.pageSize) params.append('pagination[pageSize]', pagination.pageSize)
      if (pagination.start) params.append('pagination[start]', pagination.start)
      if (pagination.limit) params.append('pagination[limit]', pagination.limit)
    }

    if (query && typeof query === 'object') {
      Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null) return
        params.append(key, value)
      })
    }

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    return url
  }

  async fetch(endpoint, options = {}) {
    const url = this.buildURL(endpoint, options)
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`
        }
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid API token')
        } else if (response.status === 403) {
          throw new Error('Forbidden: Access denied')
        } else if (response.status === 404) {
          throw new Error(`Not Found: ${endpoint} endpoint not found`)
        } else if (response.status >= 500) {
          throw new Error('Server Error: Strapi server is having issues')
        } else {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
        }
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getHome(locale = 'en') {
    return this.fetch('home', {
      populate: '*',
      locale
    })
  }

  async getAbout(locale = 'en') {
    return this.fetch('about', {
      populate: '*',
      locale
    })
  }

  async getPolitique(locale = 'en') {
    return this.fetch('politique', {
      populate: '*',
      locale
    })
  }

  async getSaintLaurent(locale = 'en') {
    return this.fetch('saint-laurent', {
      populate: ['Cover', 'Product', 'Product.Image'],
      locale
    })
  }

  async getProductList(locale = 'en') {
    return this.fetch('product-list', {
      populate: '*',
      locale,
      query: {
        'plugins[i18n][locale]': locale
      }
    })
  }

  async getProducts(options = {}) {
    const defaultOptions = {
      populate: '*',
      sort: 'createdAt:desc',
      pagination: { pageSize: 100 },
      locale: 'en'
    }
    
    return this.fetch('products', { ...defaultOptions, ...options })
  }

  async getProduct(slug, locale = 'en') {
    return this.fetch('products', {
      filters: { slug },
      populate: '*',
      locale
    })
  }

  async getBlogPosts(options = {}) {
    const defaultOptions = {
      populate: '*',
      sort: 'publishedAt:desc',
      pagination: { pageSize: 100 },
      locale: 'en'
    }
    
    return this.fetch('blogs', { ...defaultOptions, ...options })
  }

  async getBlogPost(slug, locale = 'en') {
    return this.fetch('blogs', {
      filters: { slug },
      populate: '*',
      locale
    })
  }

  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/api/users-permissions/roles`)
      return response.ok
    } catch (error) {
      return false
    }
  }

  getMediaURL(media) {
    if (!media) return null

    if (typeof media === 'string') {
      if (media.startsWith('http://') || media.startsWith('https://')) {
        return media
      }
      if (media.startsWith('/')) {
        return `${this.baseURL}${media}`
      }
      return media
    }

    const mediaData = media.data || media

    const url = mediaData?.attributes?.url || mediaData?.url
    if (!url) return null

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }

    return `${this.baseURL}${url}`
  }

  getMediaURLs(mediaArray) {
    if (!Array.isArray(mediaArray)) return []
    
    return mediaArray
      .map(media => this.getMediaURL(media))
      .filter(url => url !== null)
  }

  async search(query, contentTypes = ['products', 'blogs'], locale = 'en') {
    const results = {}
    
    for (const contentType of contentTypes) {
      try {
        const data = await this.fetch(contentType, {
          filters: {
            $or: [
              { title: { $containsi: query } },
              { description: { $containsi: query } },
              { content: { $containsi: query } }
            ]
          },
          populate: '*',
          locale
        })
        results[contentType] = data
      } catch (error) {
        results[contentType] = { data: [] }
      }
    }
    
    return results
  }
}

const strapiAPI = new StrapiAPI()

export default strapiAPI

export const {
  getHome,
  getAbout,
  getPolitique,
  getSaintLaurent,
  getProducts,
  getProductList,
  getProduct,
  getBlogPosts,
  getBlogPost,
  search,
  healthCheck,
  getMediaURL,
  getMediaURLs
} = strapiAPI
