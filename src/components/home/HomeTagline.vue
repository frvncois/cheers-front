<template>
  <section>
    <div class="tagline">
      <div class="is-content">
        <div speed="0.25" class="is-image">
          <img src="@/assets/intro.png"/>
        </div>
        <div class="is-title">
          <h1>Du premier plan<br>au dernier puff,<br>on cultive l'excellence</h1>
        </div>
        <div class="is-image">
          <img speed="-0.25" src="@/assets/intro.png"/>
        </div>
      </div>
      <div class="is-cover">
        <img speed="0.5" src="@/assets/intro.png"/>
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
        flex: 1;
        overflow: hidden;
        position: relative;
        aspect-ratio: 1;
        &:last-child {
            display: flex;
            align-items: flex-end;
        }
        > img {
          position: absolute;
            aspect-ratio: 1;
            width: 100%;
            object-fit: cover;
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
        background: red;
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