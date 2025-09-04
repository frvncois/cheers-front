<script setup>
import ButtonMailing from '@/assets/ButtonMailing.vue';
import ButtonBorder from '@/assets/ButtonBorder.vue';
</script>

<template>
    <section data-bg="yellow">
        <div class="contact">
            <div class="is-content">
                <h1 data-animate="fade" data-animate-duration="1000">Contactez<br>nous</h1>
                <p data-animate="fade" data-animate-delay="150">Que vous ayez des suggestions, des questions ou simplement envie de partager votre expérience, nous sommes impatients de vous lire et de continuer à vous offrir le meilleur du cannabis de qualité supérieure.</p>
                <a data-animate="fade" data-animate-delay="200">contact@cheerscannabis.com</a>
                <p data-animate="fade" data-animate-delay="250">560-50, rue de La Gabelle<br>Varennes, QC , J3X 2J4</p>
            </div>
            <form class="is-form" data-animate="reveal" data-animate-delay="250">
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
                <button>Envoyer<ButtonMailing/><ButtonBorder /></button>
            </form>
        </div>
        <div class="cover">
            <div class="is-image">
                <img speed="-1" src="@/assets/hero.png" alt="Contact Cover"/>
            </div>
        </div>
        <div class="overlay">
            <div class="is-image">
                <img speed="-0.5" src="@/assets/hero.png" alt="Contact Cover"/>
            </div>
        </div>
    </section>
</template>




<style scoped>
section {
    background: var(--yellow);
    color: var(--purple);
    position: relative;
    > .contact {
        display: flex;
        flex-direction: row;
        padding: var(--space-2xl) var(--space-2xl) 0 var(--space-2xl);
        gap: var(--space-lg);
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
    > .cover {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding-bottom: var(--space-lg);
        > .is-image {
            height: 100%;
            margin: auto;
            > img {
                height: 100%;
                object-fit: cover;
            }
        }
    }
    > .overlay {
        position: absolute;
        top: 70vh;
        width: 25em;
        height: 100%;
        pointer-events: none;
        > .is-image {
            width: 25em;
            height: 100%;
            margin: auto;
            transform: rotate(15deg);
            
            > img {
                width: 45em;
                height: 100%;
                object-fit: contain;
                margin-left: -20em;
            }
        }
    }
    & input, textarea {
        background: transparent;
        border: unset;
        border-bottom: 1px solid var(--purple);
        font-family: 'body';
        font-size: var(--font-md);
        padding: var(--space-xs) 0;
        resize: none;
        :focus {
            outline: none;
        }
    }
    & button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-xs);
        position: relative;
        padding-right: 2.5ch;
        > svg:nth-child(2) {
            position: absolute;
            width: 10em;
            height: 100%;
            top: 0;
            right: 0;
            margin-right: 0;
            bottom: 0;
        }
    }
}

</style>