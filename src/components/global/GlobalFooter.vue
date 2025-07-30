<script setup>
import CheersLogo from '@/assets/CheersLogo.vue';
import CheersIcon from '@/assets/CheersIcon.vue';
</script>

<template>
    <footer>
        <div class="is-logo">
        <CheersLogo/>
        </div>
        <ul>
            <li>
                <a>Accueil</a>
            </li>
            <li>
                <a>Produits</a>
                <a>Saint-Laurent</a>
            </li>
            <li>
                <a>À propos</a>
                <a>Blog</a>
                <a>Contact</a>
            </li>
            <li>
                <a>Instagram</a>
                <a>Facebook</a>
                <a>Infolettre</a>
            </li>
            <li>
              <CheersIcon/>
            </li>
        </ul>
        <div class="imprint">
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