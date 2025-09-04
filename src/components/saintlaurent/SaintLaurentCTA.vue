<script setup>
import SaintLaurentLogo from '@/assets/SaintLaurentLogo.vue';
</script>

<template>
  <section data-bg="green">
    <div class="footer">
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
  align-items: center;
  & .is-logo {
    width: 100%;
    height: auto;
    display: flex;
    > svg {
      height: auto;
      width: 100%;
    }
  }
  > img {
    position: absolute;
        width: 25em;
        top: var(--space-xl);
        left: auto;
        right: auto;
        transform: rotate(8deg);
    
  }
}
</style>