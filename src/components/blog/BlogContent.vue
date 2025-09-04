<template>
  <section data-bg="light">
  <div class="article">
    <div class="is-cover">
        <img 
        v-if="article.Cover?.url"
        :src="getStrapiImageUrl(article.Cover.url)"
        :alt="article.Cover.alternativeText || article.Title"
        />
    </div>
    
    <div class="is-title">
        <h1>{{ article.Title }}</h1>
    </div>
    
    <div class="is-content">
        <div v-for="block in article.Content" :key="block.id || Math.random()">
        <p v-if="block.type === 'paragraph'">
            <span v-for="child in block.children" :key="child.id || Math.random()">{{ child.text }}</span>
        </p>
        </div>
    </div>
  </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useContentStore } from '@/stores/content.js'

const route = useRoute()
const contentStore = useContentStore()

const loading = computed(() => contentStore.loading.blog)

const article = computed(() => {
  const documentId = route.params.id
  return contentStore.blog.find(post => post.documentId === documentId)
})

const getStrapiImageUrl = (url) => {
  if (!url) return ''
  const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  
  if (url.startsWith('http')) {
    return url
  }
  
  if (url.startsWith('/')) {
    return `${baseURL}${url}`
  }
  
  return `${baseURL}/${url}`
}

onMounted(() => {
  if (contentStore.blog.length === 0 && !contentStore.loading.blog) {
    contentStore.fetchBlog()
  }
})
</script>

<style scoped>
.article {
    background: var(--light);
    color: var(--purple);
    padding: var(--space-xl) var(--space-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    > .is-cover {
        width: 100%;
        > img {
            width: 100%;
        }
    }
}
</style>