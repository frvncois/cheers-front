<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import CheersIcon from '@/assets/CheersIcon.vue';
import CheersLogo from '@/assets/CheersLogo.vue';
import Element01 from '@/assets/Element01.vue';

const router = useRouter();
const isNavVisible = ref(false);
const isClosing = ref(false);

// Header and nav colors
const currentHeaderColor = ref('var(--yellow)');
const currentNavBg = ref('var(--yellow)');
const currentNavText = ref('var(--purple)');

const toggleNav = () => {
	if (isNavVisible.value) {
		closeNav();
	} else {
		isNavVisible.value = true;
	}
};

const closeNav = () => {
	isClosing.value = true;
	setTimeout(() => {
		isNavVisible.value = false;
		isClosing.value = false;
	}, 600);
};

// Update all colors based on current section
const updateColors = () => {
	const sections = document.querySelectorAll('section');
	
	if (!sections.length) return;
	
	// Find the section at the top of viewport
	for (const section of sections) {
		const rect = section.getBoundingClientRect();
		
		if (rect.top <= 100 && rect.bottom > 0) {
			const bgColor = section.getAttribute('data-bg');
			
			if (bgColor) {
				// Set header color based on section background
				let headerColor, navBg, navText;
				
				switch(bgColor) {
					case 'yellow':
						headerColor = 'var(--purple)';
						navBg = 'var(--purple)';
						navText = 'var(--yellow)';
						break;
					case 'purple':
						headerColor = 'var(--yellow)';
						navBg = 'var(--yellow)';
						navText = 'var(--purple)';
						break;
					case 'light':
						headerColor = 'var(--purple)';
						navBg = 'var(--purple)';
						navText = 'var(--light)';
						break;
					case 'green':
						headerColor = 'var(--light)';
						navBg = 'var(--light)';
						navText = 'var(--purple)';
						break;
					default:
						headerColor = 'var(--yellow)';
						navBg = 'var(--yellow)';
						navText = 'var(--purple)';
				}
				
				currentHeaderColor.value = headerColor;
				currentNavBg.value = navBg;
				currentNavText.value = navText;
				
				break; // Exit loop once we find the active section
			}
		}
	}
};

onMounted(() => {
	// Initial color check
	nextTick(() => {
		updateColors();
	});
	
	// Listen to scroll
	window.addEventListener('scroll', updateColors, { passive: true });
});

onUnmounted(() => {
	window.removeEventListener('scroll', updateColors);
});

watch(() => router.currentRoute.value.path, () => {
	if (isNavVisible.value) {
		closeNav();
	}
	nextTick(() => {
		updateColors();
	});
});
</script>

<template>
	<header 
		:style="{ 
			color: isNavVisible ? currentNavText : currentHeaderColor 
		}"
		data-animate="fade"
	>
		<div class="logo">
			<router-link to="/"><CheersIcon /></router-link>
		</div>
		<div class="toggle" @click="toggleNav">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</header>
	
	<div class="mask" :class="{ 'is-open': isNavVisible, 'is-closing': isClosing }">
		<nav 
			v-if="isNavVisible || isClosing"
			:style="{ 
				backgroundColor: currentNavBg,
				color: currentNavText
			}"
		>
			<ul>
				<li>
					<router-link to="/">Accueil</router-link>
				</li>
				<li>
					<router-link to="/products">Produits</router-link>
					<router-link to="/saint-laurent">Saint-Laurent</router-link>
				</li>
				<li>
					<router-link to="/about">À propos</router-link>
					<router-link to="/blog">Blog</router-link>
					<router-link to="/contact">Contact</router-link>
				</li>
				<li>
					<a href="https://www.instagram.com/cheerscannabis" target="_blank">Instagram</a>
					<a href="https://www.facebook.com/Cheerscannabinc" target="_blank">Facebook</a>
					<a href="https://www.cheerscannabis.com/newsletter" target="_blank">Infolettre</a>
				</li>
				<li>
					<Element01/>
				</li>
			</ul>
			<div class="is-logo">
				<CheersLogo/>
			</div>
		</nav>
	</div>
</template>

<style scoped>
header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 6;
	padding: var(--space-rg);
	transition: color 0.1s ease;
}

header .logo svg {
	height: 4em;
}

header .toggle {
	height: 4em;
	width: 2em;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	cursor: pointer;
}

header .toggle span {
	width: 100%;
	height: 1px;
	background: currentColor;
}

header .toggle span:nth-child(2) {
	width: 50%;
}

.mask {
	height: 0vh;
	width: 100vw;
	position: fixed;
	z-index: 5;
	top: 0;
	left: 0;
	overflow: hidden;
	transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.mask.is-open {
	height: 100vh;
}

.mask.is-closing {
	height: 0vh;
}

nav {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 100vh;
	transition: background-color 0.1s ease, color 0.1s ease;
}

nav ul {
	display: flex;
	padding: 0 var(--space-rg);
	gap: var(--space-md);
	position: relative;
}

nav ul li {
	display: flex;
	flex-direction: column;
	flex: 1;
	position: relative;
}

nav ul li > a {
	padding: var(--space-xs) 0;
}

nav ul li:last-child {
	position: absolute;
	bottom: 0;
	right: var(--space-md);
}

nav .is-logo {
	position: relative;
	margin: 0 var(--space-rg);
	top: 4.75em;
}

nav .is-logo svg {
	width: 100%;
	height: 100%;
}

@media screen and (max-width: 768px) {
	nav ul {
		flex-direction: column;
		gap: 0;
		padding: 0;
	}
	
	nav ul li > a {
		text-align: center;
		font-size: var(--font-lg);
		padding: 0;
	}
	
	nav ul li:nth-child(4) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		flex-direction: row;
		margin-top: var(--space-md);
		border-bottom: 1px solid currentColor;
	}
	
	nav ul li:nth-child(4) > a {
		border-top: 1px solid currentColor;
		font-size: var(--font-rg)!important;
		padding: var(--space-sm);
	}
	
	nav ul li:nth-child(4) > a:nth-child(2) {
		border-left: 1px solid currentColor;
	}
	
	nav ul li:nth-child(4) > a:last-child {
		grid-column: span 2;
	}
	
	nav .is-logo {
		top: 2.5em;
	}
}
</style>