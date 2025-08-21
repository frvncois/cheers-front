<script setup>
import CheersLogo from '@/assets/CheersLogo.vue';
import CheersIcon from '@/assets/CheersIcon.vue';
</script>

<template>
    <footer>
        <div class="is-logo" data-animate="reveal" data-animate-duration="1500">
        <CheersLogo/>
        </div>
        <ul>
            <li data-animate="fade" data-animate-delay="500" data-animate-duration="1000">
                <RouterLink to="/">Accueil</RouterLink>
            </li>
            <li data-animate="fade" data-animate-delay="600" data-animate-duration="1000">
                <RouterLink to="/products">Produits</RouterLink>
                <a>Saint-Laurent</a>
            </li>
            <li data-animate="fade" data-animate-delay="700" data-animate-duration="1000">
                <a>À propos</a>
                <a>Blog</a>
                <a>Contact</a>
            </li>
            <li data-animate="fade" data-animate-delay="800" data-animate-duration="1000">
                <a>Instagram</a>
                <a>Facebook</a>
                <a>Infolettre</a>
            </li>
            <li class="imprint" data-animate="fade" data-animate-delay="800" data-animate-duration="1000">
              <CheersIcon/>
            </li>
        </ul>
        <div class="imprint" data-animate="fade" data-animate-delay="800" data-animate-duration="1000">
          <p>© 2025 cheerscannabis.com. Tous droits réservés</p>
        </div>
    </footer>
</template>

<style scoped>
footer {
display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 5;
  > ul {
    display: flex;
    padding: var(--space-rg);
    margin-bottom: var(--space-lg);
    > li {
      display: flex;
      flex-direction: column;
      flex: 1;
      &:last-child {
        align-items: end;
      }
    }
  }
  > .is-logo {
    position: relative;
    margin: 0 var(--space-rg);
    > svg {
      width: 100%;
      height: 100%;
    }
  }
  > .imprint {
    padding: var(--space-rg);
  }
}
</style>