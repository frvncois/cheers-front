<template>
  <section data-bg="green">
    <div class="products">
            <div><h2 data-animate="reveal" data-animate-delay="500">Notre produit phare</h2></div>
      <div class="is-items">
        <div class="is-item">
            <div>
                <h3 data-animate="reveal" data-animate-delay="500">Fleur séchée</h3>
                <h3 data-animate="reveal" data-animate-delay="500">THC 24%</h3>
            </div>
            <div>
                <img src="@/assets/flower.png" alt="Fleur séchée" />
            </div>
            <div>
                <h3 data-animate="reveal" data-animate-delay="500">Holy Kush</h3>
                <h3 data-animate="reveal" data-animate-delay="500">Format<br>35g</h3>
            </div>
        </div>
        <div class="is-item">
            <div>
                <h3 data-animate="reveal" data-animate-delay="500">Fleur séchée</h3>
                <h3 data-animate="reveal" data-animate-delay="500">THC 24%</h3>
            </div>
            <div>
                <img src="@/assets/flower.png" alt="Fleur séchée" />
            </div>
            <div>
                <h3 data-animate="reveal" data-animate-delay="500">Holy Kush</h3>
                <h3 data-animate="reveal" data-animate-delay="500">Format<br>35g</h3>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-lg) var(--space-2xl);
  flex-wrap: wrap;
  flex-direction: column;
  background: var(--green);
  color: var(--light);
  > .is-items {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-xl);
    > .is-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--space-sm);
    }
    > .is-item div {
        display: flex;
        justify-content: space-between;
    }
  }
}

@media screen and (max-width: 768px) {
  .about {
    flex-direction: column;
  }
}
</style>