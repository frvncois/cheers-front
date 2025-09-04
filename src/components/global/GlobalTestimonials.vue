<script setup>
import Element02 from '@/assets/Element02.vue';
import ButtonBorder from '@/assets/ButtonBorder.vue';
</script>

<template>
  <section data-bg="purple">
        <div class="testimonials">
            <div class="is-title" data-animate="fade" data-animate-delay="0" data-animate-duration="1500">
                <h1>Votre avis <br>nous intéresse</h1>
                <Element02/>
            </div>
            <div class="is-content" data-animate="fade" data-animate-delay="0" data-animate-duration="1500">
                <p>Si vous avez essayé nos produits, nous serions ravis de connaître votre avis. Vos commentaires nous aident à améliorer constamment notre qualité et à mieux répondre à vos attentes.</p>
                <a href="https://www.google.com/search?sca_esv=452a92eb2c2ade68&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_K7zVY47ugG6AjZMVDn_kF7vATiekvx3ZKramRhDR25QesKBZfwCwRUL2LwkOLi80DfczEAvkLsneZYTe_w-JOeF5i-&q=Cheers+Cannabis+Reviews&sa=X&ved=2ahUKEwjSp4vInb2PAxXElFYBHeY5MLMQ0bkNegQIPhAE&biw=1751&bih=1039&dpr=1" target="_blank">Laisser un avis<ButtonBorder /></a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.testimonials {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-xl) var(--space-2xl);
    > div {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        align-items: flex-start;
    }
    & h1 {
        font-size: var(--font-lg);
    }
    & svg {
        position: absolute;
        top: -1.5em;
        right: 0;
        left: 18ch;
    }
    & a {
      position: relative;
      z-index: 1;
      padding: 2.5em;
        & svg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        }
    }
}

@media screen and (max-width: 768px) {
    .testimonials {
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-xl) var(--space-rg) 0 var(--space-rg);
    }
}
</style>