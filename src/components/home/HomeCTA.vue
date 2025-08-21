<template>
<section>
  <div class="cta">
    <div class="is-content">
      <h2 data-animate="fade" data-animate-delay="500">Producteur passioné</h2>
      <div class="is-title">
        <div><h1 data-animate="fade-up" data-animate-delay="150" data-animate-duration="1000">Produire un <span>cannabis</span></h1></div>
        <div><h1 data-animate="fade-up" data-animate-delay="350" data-animate-duration="1000">qui fait <span>honneur</span> à</h1></div>
        <div><h1 data-animate="fade-up" data-animate-delay="500" data-animate-duration="1000">la <span>culture</span></h1></div>
      </div>
      <h2 data-animate="fade" data-animate-delay="500">Cannabis de qualité</h2>
      </div>
    <div speed="-0.5" class="is-image">
      <img src="@/assets/cup.png"/>
    </div>
  </div>
</section>
</template>

<style scoped>
.cta {
 > .is-content {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: end;
text-align: center;
padding: var(--space-rg);
> .is-title div {
  overflow: hidden;
}
 > div {
flex-shrink: 0;
 &:last-child {
 text-align: right;
}
 }
 & h1 {
font-size: var(--font-xl);
}
 & h1 span {
font-family: 'italic';
}
 }
> .is-image {
display: flex;
flex: 1;
margin-top: -6em;
  > img {
      margin: auto;
  }
 }
}
</style>