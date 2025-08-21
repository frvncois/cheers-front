<template>
    <section>
        <div class="mailinglist" data-animate="fade" data-animate-duration="2000">
            <div>
                <h1>
                    Une infolettre pour rester à la page
                </h1>
            </div>
            <div>
                <p>
                    Inscrivez-vous à notre infolettre pour recevoir les dernières nouvelles, offres exclusive et conseils.
                </p>
                <form>
                    <input placeholder="Adresse courriel"/>
                    <button>S'inscrire</button>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
.mailinglist {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-xl) var(--space-2xl);
    > div {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        align-items: stretch;
        
        > svg {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    & input {
        background-color: transparent;
        border: unset;
        border-bottom: 1px solid var(--accent);
        padding: var(--space-sm) 0;
        flex: 1;
    }
    & button {
        background: var(--accent);
        border-radius: 10em;
        padding: var(--space-sm) var(--space-md);
    }
    & h1 {
        font-size: var(--font-lg);
    }
    & form {    
        display: flex;
        flex: 1;
    }
}
</style>