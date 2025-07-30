<template>
    <section>
        <div class="contact">
            <div class="is-content">
                <h1>Contactez<br>nous</h1>
                <p>Que vous ayez des suggestions, des questions ou simplement envie de partager votre expérience, nous sommes impatients de vous lire et de continuer à vous offrir le meilleur du cannabis de qualité supérieure.</p>
                <a>contact@cheerscannabis.com</a>
                <p>560-50, rue de La Gabelle<br>Varennes, QC , J3X 2J4</p>
            </div>
            <form class="is-form">
                <div>
                    <label>Nom</label>
                    <input placeholder="Votre nom"/>
                </div>
                <div>
                    <label>Prénom</label>
                    <input placeholder="Prénom"/>
                </div>
                <div>
                    <label>Courriel</label>
                    <input placeholder="Courriel"/>
                </div>
                <div>
                    <label>Objet du message</label>
                    <input placeholder="Sujet"/>
                </div>
                <div>
                    <label>Message</label>
                    <textarea placeholder="Message"></textarea>
                </div>
                <button>Envoyer</button>
            </form>
        </div>
    </section>
</template>

<style scoped>
section {
    background: var(--yellow);
    color: var(--purple);
    > .contact {
        display: flex;
        flex-direction: row;
        padding: var(--space-2xl);
        gap: var(--space-md);
        > .is-content {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: var(--font-xl);
            > h1 {
                font-size: var(--font-xl);
            }
        }
        > .is-form {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: var(--space-rg);
            > div {
                display: flex;
                flex-direction: column;
            }
        }
    }
    & input {
        background: transparent;
        border: unset;
        border-bottom: 1px solid var(--purple);
        font-family: 'body';
        font-size: var(--font-md);
        padding: var(--space-xs) 0;
    }
}

</style>