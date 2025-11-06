<script setup>
import { computed } from 'vue'

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  },
  blocks: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const loadingText = computed(() => {
  return props.translationStore.translations.loading[props.translationStore.currentLanguage].loadingContent
})

const emptyText = computed(() => {
  return props.translationStore.translations.errors[props.translationStore.currentLanguage].contentNotFound
})

const renderedBlocks = computed(() => {
  return (props.blocks || [])
    .map((block, index) => ({
      key: `${block?.id || block?.type || 'block'}-${index}`,
      html: renderBlock(block)
    }))
    .filter(block => block.html)
})

function renderBlock(block) {
  if (!block) return ''

  switch (block.type) {
    case 'paragraph':
      return `<p>${renderChildren(block.children || [])}</p>`
    case 'heading': {
      const level = Math.min(Math.max(Number(block.level) || 2, 1), 6)
      return `<h${level}>${renderChildren(block.children || [])}</h${level}>`
    }
    case 'list': {
      const tag = block.format === 'ordered' ? 'ol' : 'ul'
      const items = (block.children || [])
        .map(item => (item.type === 'list-item' ? renderBlock(item) : `<li>${renderChildren(item.children || [])}</li>`))
        .join('')
      return `<${tag}>${items}</${tag}>`
    }
    case 'list-item':
      return `<li>${renderChildren(block.children || [])}</li>`
    case 'quote':
    case 'block-quote':
      return `<blockquote>${renderChildren(block.children || [])}</blockquote>`
    case 'code':
    case 'code-block': {
      const codeContent = (block.children || []).map(child => child.text || '').join('')
      return `<pre><code>${escapeHtml(codeContent)}</code></pre>`
    }
    case 'image': {
      const url = block.url || block.image?.url
      if (!url) return ''
      const alt = block.alternativeText || block.alt || ''
      return `<figure><img src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" /></figure>`
    }
    default: {
      if (Array.isArray(block.children)) {
        return renderChildren(block.children)
      }
      return ''
    }
  }
}

function renderChildren(children = []) {
  return children.map(child => {
    if (!child) return ''

    if (child.type === 'text' || Object.prototype.hasOwnProperty.call(child, 'text')) {
      return renderInlineStyle(child)
    }

    if (child.type === 'link') {
      const inner = renderChildren(child.children || [])
      const url = escapeAttribute(child.url || '#')
      const target = escapeAttribute(child.target || '_blank')
      return `<a href="${url}" target="${target}" rel="noopener noreferrer">${inner}</a>`
    }

    if (['paragraph', 'heading', 'list', 'list-item', 'quote', 'block-quote'].includes(child.type)) {
      return renderBlock(child)
    }

    return ''
  }).join('')
}

function renderInlineStyle(node) {
  const text = escapeHtml(node.text || '')
  let content = text

  if (node.code) content = `<code>${content}</code>`
  if (node.bold) content = `<strong>${content}</strong>`
  if (node.italic) content = `<em>${content}</em>`
  if (node.underline) content = `<u>${content}</u>`
  if (node.strikethrough) content = `<s>${content}</s>`

  return content
}

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function escapeAttribute(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
</script>

<template>
  <section data-bg="light" class="policy-content">
    <div class="policy-content__wrap" data-animate="reveal" data-animate-duration="1000">
      <p v-if="props.loading" class="policy-content__loading">{{ loadingText }}</p>

      <template v-else>
        <div v-if="renderedBlocks.length" class="policy-content__blocks">
          <div
            v-for="block in renderedBlocks"
            :key="block.key"
            class="policy-content__block"
            v-html="block.html"
          />
        </div>
        <p v-else class="policy-content__empty">{{ emptyText }}</p>
      </template>
    </div>
  </section>
</template>

<style scoped>
.policy-content {
  background: var(--light);
  color: var(--purple);
  padding: 0 var(--space-2xl) var(--space-2xl);
}

.policy-content__wrap {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  line-height: 1.7;
  font-size: 1.05rem;
}

.policy-content__blocks {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.policy-content__block :deep(p) {
  margin: 0;
}

.policy-content__block :deep(h1),
.policy-content__block :deep(h2),
.policy-content__block :deep(h3),
.policy-content__block :deep(h4),
.policy-content__block :deep(h5),
.policy-content__block :deep(h6) {
  margin: 0;
  font-weight: 700;
}

.policy-content__block :deep(ul),
.policy-content__block :deep(ol) {
  padding-left: 1.25rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.policy-content__block :deep(blockquote) {
  border-left: 4px solid var(--purple);
  padding-left: var(--space-md);
  font-style: italic;
  opacity: 0.85;
}

.policy-content__block :deep(code) {
  font-family: 'monospace';
  background: rgba(0, 0, 0, 0.05);
  padding: 0.1rem 0.3rem;
  border-radius: var(--radius-sm);
}

.policy-content__block :deep(pre) {
  background: rgba(0, 0, 0, 0.05);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  overflow: auto;
}

.policy-content__loading,
.policy-content__empty {
  font-size: 1.05rem;
  opacity: 0.75;
}

@media screen and (max-width: 768px) {
  .policy-content {
    padding: 0 var(--space-md) var(--space-lg);
  }
}
</style>
