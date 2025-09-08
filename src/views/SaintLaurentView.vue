<script setup>
import { computed } from 'vue'
import { useContentStore } from '@/stores/content.js'
import { useTranslationStore } from '@/stores/translation.js'
import SaintLaurentIntro from '@/components/saintlaurent/SaintLaurentIntro.vue'
import SaintLaurentAbout from '@/components/saintlaurent/SaintLaurentAbout.vue'
import SaintLaurentProducts from '@/components/saintlaurent/SaintLaurentProducts.vue'
import SaintLaurentCTA from '@/components/saintlaurent/SaintLaurentCTA.vue'
import SaintLaurentFooter from '@/components/saintlaurent/SaintLaurentFooter.vue'

const contentStore = useContentStore()
const translationStore = useTranslationStore()

const saintLaurentContent = computed(() => contentStore.saintLaurent)

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <SaintLaurentIntro 
    :content="saintLaurentContent" 
    :translation-store="translationStore" 
  />
  <SaintLaurentAbout 
    :content="saintLaurentContent" 
    :translation-store="translationStore" 
  />
  <SaintLaurentProducts 
    :content="saintLaurentContent" 
    :translation-store="translationStore" 
  />
  <SaintLaurentCTA 
    :content="saintLaurentContent" 
    :translation-store="translationStore" 
  />
  <SaintLaurentFooter 
    :content="saintLaurentContent" 
    :translation-store="translationStore" 
  />
</template>