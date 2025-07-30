<template>
<section>
    <div class="socials">
        <div class="is-title">
            <h1>Retrouvez Cheers sur les réseau sociaux</h1>
            <p>Suivez-nous sur les réseaux sociaux ! Restez connectés pour les dernières nouvelles, offres exclusives et mises à jour sur nos produits.</p>
        </div>
        <div class="is-content">
        <div>
            <h2>Instagram</h2>
            <p>@cheerscannabis</p>
        </div>
        <div>
            <h2>Facebook</h2>
            <p>@cheerscannabis</p>
        </div>
        </div>
    </div>
</section>
</template>

<style scoped>
section {
    background: var(--light);
    color: var(--purple);
    padding: var(--space-xl)  var(--space-2xl);
    > .socials {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        > .is-title {
            display: flex;
            gap: var(--space-lg);
            > h1 {
                flex: 1;
            }
            > p {
                flex: 1;
            }
        }
        > .is-content {
            display: flex;
            > div {
                display: flex;
                flex-direction: column;
                flex: 1;
                align-items: center;
            }
        }
    }
}
</style>