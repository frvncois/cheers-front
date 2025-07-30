<template>
    <section>
        <div class="intro">
            <div class="is-content">
                <h2>Chaque gramme<br>est le fruit de<br>notre savoir-faire</h2>
                <p>Ici, on ne fait pas que cultiver du cannabis. On élève une plante avec passion, on affine chaque détail, on soigne chaque récolte comme un grand cru. Cheers Cannabis, c’est l’amour du produit bien fait, la culture indoor maîtrisée, et une vibe qui sent bon l’authenticité. Que tu sois connaisseur ou juste curieux, ici, t’es au bon endroit.</p>
                <p>Si vous avez des questions sur nos produits ou des commentaires à nous faire, vous pouvez toujours nous contacter grâce au formulaire en cliquant sur le lien suivant.</p>
            </div>
            <div class="is-action">
                <img src="@/assets/intro.png"/>
                <button>Contactez-nous</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background: var(--light);
    color: var(--purple);
   > .intro {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-rg) var(--space-rg) var(--space-xl) var(--space-rg);
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
    > .is-action {
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
}


</style>





