<template>
  <section data-bg="purple">
        <div class="title">
            <div class="is-content">
                <div speed="0.5">
                    <img src="@/assets/cup.png"/>
                </div>
                <p data-animate="fade" data-animate-duration="2500">Notre équipe travaille sans relâche pour perfectionner nos techniques de culture. Nous investissons continuellement dans la recherche et le développement pour rester à la pointe de l'industrie et répondre aux besoins de nos clients.</p>
            </div>
            <div class="is-bottom">
                <h2 data-animate="reveal" data-animate-duration="1000">Cultivé avec<br>passion</h2>
                <h2 data-animate="reveal" data-animate-duration="1000">Partagé<br>avec plaisir</h2>
            </div>
        </div>
    </section>
</template>

<style scoped>
.title {
    padding: var(--space-xl) var(--space-rg);
    > .is-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: var(--space-lg);
        
        > p {
            font-size: var(--font-md);
            max-width: 60ch;
        }
        & img {
             margin-bottom: -2em;
             transform: rotate(-20deg);
        }
    }
     > .is-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            > h2:last-child {
                text-align: right;
            }
        }
}

@media screen and (max-width: 768px) {
    .title {
        padding: var(--space-sm);
            p {
            display: none;
        }
    }
}
</style>