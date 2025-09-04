<script setup>
import SaintLaurentLogo from '@/assets/SaintLaurentLogo.vue';
</script>

<template>
  <section data-bg="green">
    <div class="intro">
      <div class="is-title">
        <h2 data-animate="reveal">Saint Laurent partage <br>une vision commune</h2>
        <h2 data-animate="reveal">avec Cheers <br>Cannabis</h2>
      </div>
      <div class="is-logo" data-animate="reveal" data-animate-delay="0" data-animate-duration="1000">
        <SaintLaurentLogo/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  padding: var(--space-2xl) var(--space-rg);
  position: relative;
  background: var(--green);
  gap: var(--space-lg);
  color: var(--light);
  > .is-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  > .is-logo svg {
    width: 100%;
    height: auto;
  }
  > .is-title img {
    position: absolute;
    height: 30em;
    width: 100%;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
    bottom: -12em;
    left: 0;
    right: 0;
  }
  > .is-title h2:last-child {
    text-align: right;
  }
}
@media screen and (max-width: 768px) {
  .intro {
    gap: var(--space-rg);
    padding: var(--space-sm);
    padding-top: 50vh;
  }
}
</style>