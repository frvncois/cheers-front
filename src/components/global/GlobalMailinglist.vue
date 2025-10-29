<script setup>
import { onMounted } from 'vue';
import ButtonMailing from '@/assets/ButtonMailing.vue';
import Element03 from '@/assets/Element03.vue';

const props = defineProps({
  translationStore: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  (function(w, d, t, h, s, n) {
    w.FlodeskObject = n;
    var fn = function() {
      (w[n].q = w[n].q || []).push(arguments);
    };
    w[n] = w[n] || fn;
    var f = d.getElementsByTagName(t)[0];
    var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
    var sm = d.createElement(t);
    sm.async = true;
    sm.type = 'module';
    sm.src = h + s + '.mjs' + v;
    f.parentNode.insertBefore(sm, f);
    var sn = d.createElement(t);
    sn.async = true;
    sn.noModule = true;
    sn.src = h + s + '.js' + v;
    f.parentNode.insertBefore(sn, f);
  })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');

  setTimeout(() => {
    window.fd('form', {
      formId: '68c8583edfa76f53c6189fae',
      containerEl: '#fd-form-68c8583edfa76f53c6189fae'
    });
  }, 500);
});
</script>

<template>
  <section data-bg="purple">
    <div class="mailinglist" data-animate="fade" data-animate-duration="2000">
      <div>
        <h1 v-html="props.translationStore.translations.newsletter[props.translationStore.currentLanguage].title"></h1>
        <Element03/>
      </div>
      <div>
        <p>{{ props.translationStore.translations.newsletter[props.translationStore.currentLanguage].description }}</p>
        <div id="fd-form-68c8583edfa76f53c6189fae"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mailinglist {
    display: flex;
    gap: var(--space-xl);
    padding: var(--space-xl) var(--space-2xl);
}

.mailinglist > div {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    align-items: stretch;
}

.mailinglist > div > svg {
    position: absolute;
    bottom: 0;
    right: 0;
}

.mailinglist h1 {
    font-size: var(--font-lg);
    max-width: 15ch;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) * {
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) form {
    display: flex !important;
    flex: 1 !important;
    flex-direction: column;
    gap: 0 !important;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) form > .ff-68c8583edfa76f53c6189fae__title,
:deep(#fd-form-68c8583edfa76f53c6189fae) form > .ff-68c8583edfa76f53c6189fae__subtitle {
    display: none !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) input[type="email"] {
    background-color: transparent !important;
    border: unset !important;
    border-bottom: 1px solid var(--accent) !important;
    padding: var(--space-sm) 0 !important;
    flex: 1 !important;
    color: var(--yellow) !important;
    font-family: inherit !important;
    font-size: inherit !important;
    outline: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) input[type="email"]::placeholder {
    color: var(--yellow) !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) input[type="email"]:focus {
    outline: unset !important;
    border-bottom: 1px solid var(--yellow) !important;
    box-shadow: none !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) button[type="submit"],
:deep(#fd-form-68c8583edfa76f53c6189fae) input[type="submit"] {
    background: var(--accent) !important;
    margin-top: 1em !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 10em !important;
    padding: var(--space-sm) var(--space-md) !important;
    transition: all 0.3s ease !important;
    border: none !important;
    cursor: pointer !important;
    color: var(--yellow) !important;
    font-family: inherit !important;
    font-size: inherit !important;
    gap: var(--space-xs) !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) button[type="submit"]:hover,
:deep(#fd-form-68c8583edfa76f53c6189fae) input[type="submit"]:hover {
    background: var(--yellow) !important;
    color: var(--purple) !important;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) button[type="submit"]::after,
:deep(#fd-form-68c8583edfa76f53c6189fae) input[type="submit"]::after {
    content: '';
    width: 1em;
    height: 1em;
    background: currentColor;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'/%3E%3C/svg%3E") no-repeat center;
    mask-size: contain;
}

:deep(#fd-form-68c8583edfa76f53c6189fae) .fd-form-footer,
:deep(#fd-form-68c8583edfa76f53c6189fae) .flodesk-embed,
:deep(#fd-form-68c8583edfa76f53c6189fae) .fd-form-heading,
:deep(#fd-form-68c8583edfa76f53c6189fae) .fd-form-description,
:deep(#fd-form-68c8583edfa76f53c6189fae) div,
:deep(#fd-form-68c8583edfa76f53c6189fae) p {
    margin: 0 !important;
    padding: 0 !important;
}

@media screen and (max-width: 768px) {
    .mailinglist {
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-xl) var(--space-rg);
    }
    
    :deep(#fd-form-68c8583edfa76f53c6189fae form) {
        flex-direction: column !important;
        gap: var(--space-sm) !important;
    }
}



</style>
