<template>
    <section>
        <div class="tagline">
            <div class="is-content">
                <h1>Chaque gramme est<br>le fruit de<br>notre savoir-faire</h1>
            </div>
            <div class="is-bottom">
                <div>
                    <p>Cultivé<br>avec passion</p>
                </div>
                <div>
                    <p>Partagé<br>avec plaisir</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.tagline {
    display: flex;
    flex-direction: column;
    padding: var(--space-rg);
    > .is-content {
        display: flex;
        > h1 {
            font-size: var(--font-xl);
        }
    }
    > .is-bottom {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--yellow);
        padding: var(--space-sm) 0;
        > div:last-child {
            text-align: right;
        }
    }
}
</style>