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
  if (url.startsWith('http')) return url
  return url.startsWith('/') ? `${baseURL}${url}` : `${baseURL}/${url}`
}

const videoEmbedUrl = computed(() => {
  if (!article.value?.Video) return null
  const url = article.value.Video.trim()

  if (url.includes('youtube.com/watch?v=')) {
    const id = new URL(url).searchParams.get('v')
    return `https://www.youtube.com/embed/${id}`
  }

  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]
    return `https://www.youtube.com/embed/${id}`
  }

  if (url.includes('youtube.com/embed/')) return url

  return url
})

onMounted(() => {
  if (contentStore.blog.length === 0 && !contentStore.loading.blog) {
    contentStore.fetchBlog()
  }
})
</script>

<template>
  <section data-bg="light">
    <div class="article" v-if="article">
      <div class="is-cover" v-if="article.Cover?.url">
        <img
          :src="getStrapiImageUrl(article.Cover.url)"
          :alt="article.Cover.alternativeText || article.Title"
        />
      </div>

      <div class="is-title">
        <h1>{{ article.Title }}</h1>
      </div>

      <div class="is-content">
        <div
          v-for="block in article.Content"
          :key="block.id || Math.random()"
        >
          <p v-if="block.type === 'paragraph'">
            <template
              v-for="child in block.children"
              :key="child.id || Math.random()"
            >
              <a
                v-if="child.type === 'link'"
                :href="child.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <template
                  v-for="grand in child.children"
                  :key="grand.id || Math.random()"
                >
                  {{ grand.text }}
                </template>
              </a>

              <span v-else-if="child.type === 'text'">
                {{ child.text }}
              </span>
            </template>
          </p>
        </div>
      </div>

      <div class="is-video" v-if="videoEmbedUrl">
        <iframe
          :src="videoEmbedUrl"
          frameborder="0"
          allowfullscreen
          loading="lazy"
          title="Article video"
        ></iframe>
      </div>

      <div class="is-gallery" v-if="article.Gallerie?.length">
        <div
          class="gallery-item"
          v-for="(img, index) in article.Gallerie"
          :key="img.id || index"
        >
          <img
            :src="getStrapiImageUrl(img.url)"
            :alt="img.alternativeText || img.name"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <p>Loading article...</p>
    </div>
  </section>
</template>

<style scoped>
.article {
  background: var(--light);
  color: var(--purple);
  padding: var(--space-xl) var(--space-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.is-cover img {
  width: 100%;
  aspect-ratio: 1.5;
  object-fit: cover;
  border-radius: var(--radius-md);
  display: block;
}

.is-video {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin: var(--space-md) 0;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.is-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.is-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-rg);
  line-height: 1.75;
}

.is-content a {
  color: var(--purple);
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.2s ease;
}

.is-content a:hover {
  color: var(--yellow);
}

.is-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.is-gallery .gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
}

.is-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.is-gallery img:hover {
  transform: scale(1.05);
}
</style>
