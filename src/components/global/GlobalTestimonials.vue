<script setup>
import Element01 from '@/assets/Element01.vue';
</script>

<template>
    <section>
        <div class="testimonials">
            <div class="is-title">
                <h1>Votre avis <br>nous intéresse</h1>
                <Element01/>
            </div>
            <div class="is-content">
                <p>Si vous avez essayé nos produits, nous serions ravis de connaître votre avis. Vos commentaires nous aident à améliorer constamment notre qualité et à mieux répondre à vos attentes.</p>
                <button>Laisser un avis</button>
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
        top: 0;
        right: 0;
    }
}
</style>