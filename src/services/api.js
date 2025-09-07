// services/api.js
class StrapiAPI {
  constructor() {
    this.baseURL = import.meta.env.VITE_STRAPI_URL || 'https://heroic-champion-86333ba9c3.strapiapp.com'
    this.apiToken = import.meta.env.VITE_STRAPI_API_KEY || 'ee13ec7d3aede228c5e7b8b2c533c69d6583eea2a3622bc6651faebaed922cc21bdbfc520c1927f26e18e8de7ac7084a4f18daea203c655272cdc8f88e79577647adad915a855d7c1bc360eb3e601be1ed5712b66ec48dada67b17612a38138b93e5d833f012cfcccfdbe6ec08e5b9def2d1e16e85777d2c86705be89277b2c3'
  }

  // Build URL with query parameters
  buildURL(endpoint, options = {}) {
    const { populate = '*', sort, filters, pagination, locale = 'en' } = options
    
    let url = `${this.baseURL}/api/${endpoint}`
    const params = new URLSearchParams()
    
    // Add locale for internationalization
    params.append('locale', locale)
    
    // Add populate parameter
    if (populate) {
      if (typeof populate === 'string') {
        params.append('populate', populate)
      } else if (typeof populate === 'object') {
        // Handle complex populate structures
        params.append('populate', JSON.stringify(populate))
      }
    }
    
    // Add sorting
    if (sort) {
      params.append('sort', sort)
    }
    
    // Add filters
    if (filters) {
      if (typeof filters === 'object') {
        Object.entries(filters).forEach(([key, value]) => {
          params.append(`filters[${key}]`, value)
        })
      } else {
        params.append('filters', filters)
      }
    }
    
    // Add pagination
    if (pagination) {
      params.append('pagination[page]', pagination.page || 1)
      params.append('pagination[pageSize]', pagination.pageSize || 25)
      if (pagination.start) params.append('pagination[start]', pagination.start)
      if (pagination.limit) params.append('pagination[limit]', pagination.limit)
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    return url
  }

  // Generic fetch method
  async fetch(endpoint, options = {}) {
    const url = this.buildURL(endpoint, options)
    
    console.log(`🌐 Fetching from Strapi Cloud: ${url}`)
    console.log(`📍 Base URL: ${this.baseURL}`)
    console.log(`🔗 Endpoint: ${endpoint}`)
    console.log(`⚙️ Options:`, options)
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`
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
        
        // Provide more specific error messages
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
      console.log(`✅ Data received for ${endpoint}:`, data)
      return data
    } catch (error) {
      console.error(`💥 Error fetching from ${endpoint}:`, {
        message: error.message,
        url: url,
        baseURL: this.baseURL,
        endpoint: endpoint
      })
      throw error
    }
  }

  // Single Type Content Methods
  async getHome(locale = 'en') {
    return this.fetch('home', {
      populate: {
        hero: {
          populate: ['image', 'cta']
        },
        sections: {
          populate: ['image', 'media', 'items']
        },
        seo: true
      },
      locale
    })
  }

  async getAbout(locale = 'en') {
    return this.fetch('about', {
      populate: {
        hero: {
          populate: ['image']
        },
        content: {
          populate: ['media', 'gallery']
        },
        team: {
          populate: ['members.photo']
        },
        seo: true
      },
      locale
    })
  }

  async getSaintLaurent(locale = 'en') {
    return this.fetch('saint-laurent', {
      populate: {
        hero: {
          populate: ['image']
        },
        content: {
          populate: ['media', 'gallery']
        },
        location: true,
        seo: true
      },
      locale
    })
  }

  // Collection Type Methods
  async getProducts(options = {}) {
    const defaultOptions = {
      populate: {
        image: true,
        gallery: true,
        category: true,
        variants: true,
        seo: true
      },
      sort: 'createdAt:desc',
      pagination: { pageSize: 100 },
      locale: 'en'
    }
    
    return this.fetch('products', { ...defaultOptions, ...options })
  }

  async getProduct(slug, locale = 'en') {
    return this.fetch('products', {
      filters: { slug },
      populate: {
        image: true,
        gallery: true,
        category: true,
        variants: true,
        related: {
          populate: ['image']
        },
        seo: true
      },
      locale
    })
  }

  async getBlogPosts(options = {}) {
    const defaultOptions = {
      populate: {
        featuredImage: true,
        author: {
          populate: ['avatar']
        },
        category: true,
        tags: true,
        seo: true
      },
      sort: 'publishedAt:desc',
      pagination: { pageSize: 100 },
      locale: 'en'
    }
    
    return this.fetch('blogs', { ...defaultOptions, ...options })
  }

  async getBlogPost(slug, locale = 'en') {
    return this.fetch('blogs', {
      filters: { slug },
      populate: {
        featuredImage: true,
        author: {
          populate: ['avatar']
        },
        category: true,
        tags: true,
        related: {
          populate: ['featuredImage']
        },
        seo: true
      },
      locale
    })
  }

  // Categories and Tags
  async getCategories(type = 'product', locale = 'en') {
    return this.fetch('categories', {
      filters: { type },
      populate: ['image'],
      sort: 'name:asc',
      locale
    })
  }

  async getTags(locale = 'en') {
    return this.fetch('tags', {
      sort: 'name:asc',
      locale
    })
  }

  // Search functionality
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
          populate: contentType === 'products' ? ['image'] : ['featuredImage'],
          locale
        })
        results[contentType] = data
      } catch (error) {
        console.error(`Error searching ${contentType}:`, error)
        results[contentType] = { data: [] }
      }
    }
    
    return results
  }

  // Utility methods
  async getGlobalSettings(locale = 'en') {
    return this.fetch('global', {
      populate: {
        header: {
          populate: ['logo', 'navigation.items']
        },
        footer: {
          populate: ['logo', 'sections.links', 'social']
        },
        seo: true
      },
      locale
    })
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/api/users-permissions/roles`)
      return response.ok
    } catch (error) {
      console.error('Strapi health check failed:', error)
      return false
    }
  }

  // Get media file URL
  getMediaURL(media) {
    if (!media) return null
    
    // Handle both direct media objects and nested structures
    const mediaData = media.data || media
    
    if (mediaData?.attributes?.url) {
      const url = mediaData.attributes.url
      // If URL is already absolute, return as is
      if (url.startsWith('http')) return url
      // Otherwise, prepend base URL
      return `${this.baseURL}${url}`
    }
    
    return null
  }

  // Get multiple media URLs
  getMediaURLs(mediaArray) {
    if (!Array.isArray(mediaArray)) return []
    
    return mediaArray
      .map(media => this.getMediaURL(media))
      .filter(url => url !== null)
  }
}

// Create and export a singleton instance
const strapiAPI = new StrapiAPI()

export default strapiAPI

// Export individual methods for convenience
export const {
  getHome,
  getAbout,
  getSaintLaurent,
  getProducts,
  getProduct,
  getBlogPosts,
  getBlogPost,
  getCategories,
  getTags,
  search,
  getGlobalSettings,
  healthCheck,
  getMediaURL,
  getMediaURLs
} = strapiAPI