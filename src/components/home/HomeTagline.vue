<template>
  <section>
    <div class="tagline">
      <div class="is-content">
        <div class="is-image">
          <img src="@/assets/intro.png" speed="1.25" data-animate="reveal" data-animate-duration="2000"/>
        </div>
        <div class="is-title" animte="fade-up">
          <h1>Du premier plan<br>au dernier puff,<br>on cultive l'excellence</h1>
        </div>
        <div class="is-image">
          <img src="@/assets/intro.png" speed="1.25" data-animate="reveal" data-animate-duration="2000"/>
        </div>
      </div>
      <div class="is-cover">
        <img speed="1.25" src="@/assets/intro.png" data-animate="reveal" data-animate-duration="2000"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tagline {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-rg);
    gap: var(--space-lg);
    > .is-content {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        > .is-image {
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1;
          flex: 1;
          height: 100%;
          width: 100%;
          background: var(--accent);
          &:last-child {
            margin-top: 30%;
          }
          > img {
            position: absolute;
            width: 100%;
            object-fit: cover;
            height: 150%;
          }
        }
        > .is-title {
        flex: 1;
        aspect-ratio: 1/2;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        > h1 {
            font-size: var(--font-lg);
        }
        }
    }
    > .is-cover {
        overflow: hidden;
        height: 50vh;
        position: relative;
        background: var(--accent);
        > img {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 200%;
          object-fit: cover;
        }
    }
}
</style>