<script setup>
import Element01 from '@/assets/Element01.vue';
</script>
<template>
<section>
<div class="intro">
<div class="is-title">
<h2>Cultivé avec <br>passion</h2>
<img src="@/assets/hero.png"/>
<h2>Partagé avec <br>plaisir</h2>
</div>
</div>
<div class="about">
<div class="is-content">
<p>Ici, on ne fait pas que cultiver du cannabis. On élève une plante avec passion, on affine chaque détail, on soigne chaque récolte comme un grand cru. Cheers Cannabis, c'est l'amour du produit bien fait, la culture indoor maîtrisée, et une vibe qui sent bon l'authenticité. Que tu sois connaisseur ou juste curieux, ici, t'es au bon endroit.</p>
<button>En savoir plus</button>
</div>
<div class="is-actions">
<button class="outlined-button">
<svg class="button-outline" width="186" height="79" viewBox="0 0 186 79" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="outline-path" d="M68.6041 4.02669C85.3053 0.983481 116.423 -0.491525 142.393 2.60961C155.381 4.1606 167.051 6.85289 174.982 11.0464C178.947 13.1426 181.956 15.6034 183.737 18.4628C185.512 21.3129 186.08 24.5786 185.131 28.3254C184.18 32.0811 181.73 35.9758 178.043 39.8641C174.358 43.7505 169.451 47.6162 163.611 51.3165C151.933 58.7169 136.547 65.4379 119.813 70.3245C103.078 75.2109 85.0046 78.2602 67.9523 78.3229C50.8973 78.3857 34.8826 75.4618 22.2489 68.4219C9.63965 61.3963 3.15057 54.4432 1.21988 47.8654C-0.702659 41.3151 1.87326 35.0455 7.63674 29.3068C13.4032 23.5653 22.3261 18.3947 32.9791 14.0827C43.6279 9.77239 55.986 6.32765 68.6041 4.02669Z" stroke="#FFBE57" stroke-width="0.555977"/>
</svg>
<span class="button-text">Où acheter</span>
</button>
</div>
<div class="is-cover">
<img speed="0.75" src="@/assets/intro.png">
</div>
<div class="is-title">
<h2>Cultivé avec <br>passion</h2>
<Element01/>
<h2>Partagé avec <br>plaisir</h2>
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
 > .is-title {
display: flex;
flex-direction: row;
justify-content: space-between;
position: relative;
}
> .is-title img {
position: absolute;
height: 30em;
left: 50%;
bottom: -8em;
transform: translateX(-50%);
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
overflow: hidden;
position: relative;
overflow: hidden;
height: 50vh;
}
> .is-cover img {
position: absolute;
bottom: 0;
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
 > img {
position: absolute;
left: 50%;
bottom: -8em;
transform: translateX(-50%);
}
> h2:last-child {
text-align: right;
}
 }
}

/* Outlined Button Styles */
.outlined-button {
position: relative;
background: transparent;
border: none;
padding: 0;
cursor: pointer;
width: 186px;
height: 79px;
}

.button-outline {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}


</style>