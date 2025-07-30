<template>
    <div class="cta">
        <div class="is-content">
            <div><h2>Cultivé avec <br>passion</h2></div>
            <div><h1>Chaque gramme<br>est le fruit de<br>notre savoir-faire</h1></div>
            <div><h2>Partagé<br>avec plaisir</h2></div>
        </div>
    </div>
</template>

<style scoped>
.cta {
    > .is-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: var(--space-xl) var(--space-rg);
        > div {
            flex-shrink: 0;
            &:last-child {
                text-align: right;
            }
            h1 {
                font-size: var(--font-xl);
                text-align: center;
            }
        }
    }
    > .is-image {
        display: flex;
        flex: 1;
        margin-top: -4.5em;
        > img {
            margin: auto;
        }
    }
}
</style>