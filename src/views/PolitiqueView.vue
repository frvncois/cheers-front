<script setup>
import { computed, onMounted } from 'vue'
import { useContentStore } from '@/stores/content.js'
import PolicyIntro from '@/components/policy/PolicyIntro.vue'
import PolicyContent from '@/components/policy/PolicyContent.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})

const contentStore = useContentStore()

const politiqueEntry = computed(() => normalizeEntry(contentStore.politique))
const loading = computed(() => contentStore.loading.politique)
const pageTitle = computed(() => getTitle(politiqueEntry.value))
const blocks = computed(() => extractBlocks(politiqueEntry.value))

onMounted(() => {
  if (!politiqueEntry.value && !loading.value) {
    contentStore.fetchPolitique().catch(() => {})
  }
})

function normalizeEntry(entry) {
  if (!entry) return null
  if (Array.isArray(entry)) return normalizeEntry(entry[0])
  if (entry.data) return normalizeEntry(entry.data)
  if (entry.attributes) return entry.attributes
  return entry
}

function getTitle(entry) {
  if (!entry) return ''
  return entry.Title || entry.title || entry.Name || entry.name || ''
}

function extractBlocks(entry) {
  if (!entry) return []
  if (Array.isArray(entry.Content)) return entry.Content
  if (Array.isArray(entry.content)) return entry.content
  if (Array.isArray(entry.Blocks)) return entry.Blocks
  if (Array.isArray(entry.blocks)) return entry.blocks
  return []
}
</script>

<template>
  <PolicyIntro
    :translation-store="props.translationStore"
    :title="pageTitle"
  />
  <PolicyContent
    :translation-store="props.translationStore"
    :blocks="blocks"
    :loading="loading"
  />
  <GlobalFooter :translation-store="props.translationStore" />
</template>
