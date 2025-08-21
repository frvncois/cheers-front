<script setup>
import CheersLogo from '@/assets/CheersLogo.vue'
</script>

<template>
  <section>
    <div class="hero">
      <div class="is-title">
        <div><h1 data-animate="fade-up" data-animate-delay="150" data-animate-duration="1000">Chaque <span>gramme</span> est</h1></div>
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
}

.hero > .is-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero > .is-title h1 {
  font-size: var(--font-xl);
}

.hero > .is-title span {
  font-family: 'italic';
}

.hero > .is-title div {
  display: inline-block;
  overflow: hidden;
}

.hero > .is-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: -5em;
  left: var(--space-rg);
  right: var(--space-rg);
}

.hero > .is-content svg {
  width: 100%;
  height: 100%;
}
</style>
