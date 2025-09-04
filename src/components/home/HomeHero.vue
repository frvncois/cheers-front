<script setup>
import CheersLogo from '@/assets/CheersLogo.vue'
</script>

<template>
  <section data-bg="purple">
    <div class="hero">
      <div class="is-title">
        <div><h1 data-animate="fade-up" data-animate-trigger="0.1" data-animate-delay="150">Chaque <span>gramme</span> est</h1></div>
        <div><h1 data-animate="fade-up" data-animate-delay="350" data-animate-duration="1000">le <span>fruit</span> de</h1></div>
        <div><h1 data-animate="fade-up" data-animate-delay="550" data-animate-duration="1000">notre savoir-faire</h1></div>
      </div>
      <div class="is-content">
        <CheersLogo />
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
    text-align: center;
  }
  > .is-title h1 {
    font-size: var(--font-xl);
  }
  > .is-title span {
    font-family: 'italic';
  }
  > .is-title div {
    display: inline-block;
    overflow: hidden;
  }
  > .is-content {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -5vw;
    left: var(--space-rg);
    right: var(--space-rg);
  }
  > .is-content svg {
    width: 100%;
    height: 100%;
  }
}
</style>
