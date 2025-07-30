<template>
<section>
  <div class="cta">
    <div class="is-content">
      <h2>Producteur passioné</h2>
      <div class="is-title">
        <div><h1>Produire un <span>cannabis</span></h1></div>
        <div><h1>qui fait <span>honneur</span> à</h1></div>
        <div><h1>la <span>culture</span></h1></div>
      </div>
      <h2>Cannabis de qualité</h2>
      </div>
    <div speed="-0.5" class="is-image">
      <img src="@/assets/cup.png"/>
    </div>
  </div>
</section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let observer;

onMounted(() => {
  const titleElement = document.querySelector('.cta .is-title');
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const divs = entry.target.querySelectorAll('div');
        divs.forEach((div, index) => {
          div.style.animationDelay = `${index * 150}ms`;
          div.classList.add('animate');
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });
  
  if (titleElement) {
    observer.observe(titleElement);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.cta {
 > .is-content {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: end;
text-align: center;
padding: var(--space-rg);
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

/* ONLY animation additions */
.cta .is-title div {
overflow: hidden;
opacity: 0;
transform: translateY(50%);
}

.cta .is-title div.animate {
animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes slideUp {
 to {
opacity: 1;
transform: translateY(0%);
}
}
</style>