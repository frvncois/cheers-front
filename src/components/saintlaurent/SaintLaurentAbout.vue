<script setup>
import ButtonBorder from '@/assets/ButtonBorder.vue'
</script>

<template>
  <section data-bg="green">
    <div class="about">
      <div class="is-content">
        <h2 data-animate="reveal" data-animate-delay="500">En savoir plus sur Saint-Laurent</h2>
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="500">
          Nous nous engageons à offrir des produits de cannabis répondant aux plus hauts standards de qualité, en sélectionnant rigoureusement nos variétés et en contrôlant chaque étape de la production.
        </p>
        <h2 data-animate="reveal" data-animate-delay="500">Découvrez nos produits disponible dans votre région</h2>
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="500">
          Chaque plante est cultivée avec soin, récoltée à la main, lentement séchée et minutieusement manucurée. Ce processus rigoureux nous permet d’offrir un cannabis aux profils terpéniques riches. Nous croyons qu’un produit d’exception commence par une attention méticuleuse à chaque détail.
        </p>
      </div>
      <div class="is-content" data-animate="fade" data-animate-delay="250" data-animate-duration="200">
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="500">
            Saint-Laurent Cannabis partage une vision commune avec Cheers Cannabis : celle de fournir des produits de cannabis de qualité, tout en mettant l'accent sur la durabilité. Cette synergie se traduit par des collaborations sur des projets innovants et le partage de bonnes pratiques, renforçant ainsi notre engagement envers l'excellence et la satisfaction de notre clientèle.
        </p>
        <router-link to="/products">
          <span>Où acheter</span>
          <ButtonBorder />
        </router-link>
      </div>
    </div>
  </section> 
</template>

<style scoped>
.about {
  display: flex;
  gap: var(--space-xl);
  padding: var(--space-lg) var(--space-2xl);
  flex-wrap: wrap;
  background: var(--green);
  color: var(--light);
  > .is-content {
    display: flex;
    flex: 0 0 calc(50% - var(--space-lg));
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-md);
  }
  & a {
      position: relative;
      z-index: 1;
      padding: 2.5em;
    }
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

@media screen and (max-width: 768px) {
  .about {
    flex-direction: column;
    padding: var(--space-sm);
    padding-top: var(--space-xl);
    > .is-content  a { 
      margin: auto;
    }
  }
}
</style>