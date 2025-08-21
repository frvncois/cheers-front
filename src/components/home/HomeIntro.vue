<script setup>
import Element01 from '@/assets/Element01.vue';
</script>

<template>
  <section>
    <div class="intro">
      <div class="is-title" >
        <h2 data-animate="reveal">Cultivé avec <br>passion</h2>
        <img src="@/assets/hero.png" speed="-0.5"/>
        <h2 data-animate="reveal">Partagé avec <br>plaisir</h2>
      </div>
    </div>
    <div class="about">
      <div class="is-content">
        <p data-animate="fade" data-animate-delay="350" data-animate-duration="1000">Ici, on ne fait pas que cultiver du cannabis. On élève une plante avec passion, on affine chaque détail, on soigne chaque récolte comme un grand cru. Cheers Cannabis, c'est l'amour du produit bien fait, la culture indoor maîtrisée, et une vibe qui sent bon l'authenticité. Que tu sois connaisseur ou juste curieux, ici, t'es au bon endroit.</p>
        <button data-animate="fade" data-animate-delay="550" data-animate-duration="1000">En savoir plus</button>
      </div>
      <div class="is-actions" data-animate="fade" data-animate-delay="250" data-animate-duration="200">
        <button>
          <span>Où acheter</span>
        </button>
      </div>
      <div class="is-cover">
        <img src="@/assets/intro.png" data-animate="reveal" data-animate-duration="2000" speed="-0.75">
      </div>
      <div class="is-title">
        <h2 data-animate="reveal" data-animate-delay="500">Cultivé avec <br>passion</h2>
        <Element01/>
        <h2 data-animate="reveal" data-animate-delay="500">Partagé avec <br>plaisir</h2>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  padding: var(--space-rg);
  margin-bottom: var(--space-xl);
  position: relative;
  > .is-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

.about {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-rg);
  flex-wrap: wrap;
  > .is-cover {
    display: flex;
    flex: 0 0 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    overflow: hidden;
    height: 50vh;
    background: var(--accent);
  }
  > .is-cover img {
    position: absolute;
    width: 100%;
    height: 150%;
    object-fit: cover;
  }
  > .is-actions {
    display: flex;
    flex: 0 0 calc(50% - var(--space-rg));
    align-items: flex-start;
    justify-content: flex-end;
  }
  > .is-content {
    display: flex;
    flex: 0 0 calc(50% - var(--space-rg));
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  > .is-title {
    display: flex;
    flex: 0 0 100%;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    > h2:last-child {
      text-align: right;
    }
  }
}

@media screen and (max-width: 768px) {
    .about {
        flex-direction: column;
    }
}
</style>