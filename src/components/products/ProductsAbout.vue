<template>
    <section>
        <div class="about">
            <div class="is-content">
                <h2>Chaque gramme <br>est le fruit de <br>notre savoir-faire</h2>
                <p>Ici, on ne fait pas que cultiver du cannabis. On élève une plante avec passion, on affine chaque détail, on soigne chaque récolte comme un grand cru. Cheers Cannabis, c’est l’amour du produit bien fait, la culture indoor maîtrisée, et une vibe qui sent bon l’authenticité. Que tu sois connaisseur ou juste curieux, ici, t’es au bon endroit.</p>
            </div>
            <div class="is-cover">
                <img src="@/assets/intro.png"/>
            </div>
        </div>
    </section>
</template>


<style scoped>
.about {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-rg);
    margin-top: var(--space-xl);
    > .is-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        padding: var(--space-rg) 0;
        flex: 1;
        > h2 {
            font-size: var(--font-lg);
        }
        > p {
            max-width: 50ch;
        }
    }
    > .is-cover {
        flex: 1;
        width: 100%;
        overflow: hidden;
        background: red;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>