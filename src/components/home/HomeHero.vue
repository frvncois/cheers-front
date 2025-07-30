<script setup>
import { onMounted } from 'vue';
import CheersLogo from '@/assets/CheersLogo.vue';

onMounted(() => {
  const divs = document.querySelectorAll('.hero .is-title div');
  divs.forEach((div, index) => {
    div.style.animationDelay = `${index * 150}ms`;
    div.classList.add('animate');
  });
});
</script>

<template>
  <section>
    <div class="hero">
      <div speed="0.5" class="is-title">
        <div><h1>Chaque <span>gramme</span> est</h1></div>
        <div><h1>le <span>fruit</span> de</h1></div>
        <div><h1>notre savoir-faire</h1></div>
      </div>
      <div class="is-content">
        <CheersLogo/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin-bottom: var(--space-lg);
  > .is-title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  > .is-title h1 {
    font-size: var(--font-xl);
  }

  > .is-title span {
    font-family: 'italic';
  }
  
  > .is-title div {
    overflow: hidden;
    display: inline-block;
    opacity: 0;
    transform: translateY(50%);
  }
  
  > .is-title div.animate {
    animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  > .is-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -5em;
    left: var(--space-rg);
    right: var(--space-rg);
  }
  
  > .is-content svg {
    width: 100%;
    height: 100%;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>