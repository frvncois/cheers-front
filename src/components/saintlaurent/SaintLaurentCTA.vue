<script setup>
import SaintLaurentLogo from '@/assets/SaintLaurentLogo.vue';
</script>

<template>
  <section data-bg="green">
    <div class="footer">
        <img src="@/assets/bud.png" speed="-0.5"/>
        <img src="@/assets/flower.png" speed="-0.75"/>
      <div class="is-logo "data-animate="reveal" data-animate-delay="0" data-animate-duration="1000">
        <SaintLaurentLogo/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  padding: var(--space-2xl) var(--space-rg) var(--space-xl) var(--space-rg);
  position: relative;
  background: var(--green);
  color: var(--light);
  > .is-logo svg {
    width: 100%;
    height: auto;
  }
  > img {
    position: absolute;
    &:nth-child(1) {
        width: 15em;
        top: 75%;
    }
    &:nth-child(2) {
        width: 25em;
        top: var(--space-xl);
        left: auto;
        right: var(--space-xl);
        transform: rotate(8deg);
    }
  }
}
</style>