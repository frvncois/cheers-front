import { defineStore } from 'pinia'
import productsData from '@/data.json'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: productsData.products || [],
    metadata: productsData.metadata || {}
  }),
  
  getters: {
    getAllProducts: (state) => state.products,
    getProductsByAvailability: (state) => (availability) => 
      state.products.filter(product => product.availability === availability),
    getFeaturedProducts: (state) => state.products.slice(0, 6) // First 6 for slider
  }
})