<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import CheersIcon from '@/assets/CheersIcon.vue';
import CheersLogo from '@/assets/CheersLogo.vue';
import Element01 from '@/assets/Element01.vue';

const router = useRouter();
const isNavVisible = ref(false);
const isClosing = ref(false);

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

watch(() => router.currentRoute.value.path, () => {
	if (isNavVisible.value) {
		closeNav();
	}
});
</script>

<template>
	<header :class="{ 'header-brown': isNavVisible }" data-animate="fade">
		<div class="logo"><CheersIcon /></div>
		<div class="toggle" @click="toggleNav">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</header>
	
	<div class="mask" :class="{ 'is-open': isNavVisible, 'is-closing': isClosing }">
		<nav v-if="isNavVisible || isClosing">
			<ul>
				<li>
					<router-link to="/">Accueil</router-link>
				</li>
				<li>
					<router-link to="/products">Produits</router-link>
					<router-link to="/">Saint-Laurent</router-link>
				</li>
				<li>
					<router-link to="/about">À propos</router-link>
					<router-link to="/">Blog</router-link>
					<router-link to="/contact">Contact</router-link>
				</li>
				<li>
					<a>Instagram</a>
					<a>Facebook</a>
					<a>Infolettre</a>
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
	color: var(--yellow);
	padding: var(--space-rg);
	transition: color 0.3s ease;
	> .logo svg {
		height: 4em;
	}
	> .toggle {
		height: 4em;
		width: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		> span {
			width: 100%;
			height: 1px;
			background: currentColor;
			&:nth-child(2) {
				width: 50%;
			}
		}
	}
}

.header-brown {
	color: var(--purple);
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
	background: var(--yellow);
	color: var(--purple);
	& ul {
		display: flex;
		padding: 0 var(--space-rg);
		gap: var(--space-md);
		position: relative;
		& li {
			display: flex;
			flex-direction: column;
			flex: 1;
			position: relative;
			> a {
				padding: var(--space-xs) 0;
			}
			&:last-child {
				position: absolute;
				bottom: 0;
				right: var(--space-md);
			}
		}
	}
	> .is-logo {
		position: relative;
		margin: 0 var(--space-rg);
		top: 4.75em;
		> svg {
			width: 100%;
			height: 100%;
		}
	}
}
</style>