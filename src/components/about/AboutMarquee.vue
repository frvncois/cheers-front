<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const itemsRef = ref(null)

const handleScroll = () => {
  if (!itemsRef.value) return
  
  const section = itemsRef.value.closest('section')
  const rect = section.getBoundingClientRect()
  const sectionHeight = section.offsetHeight
  const viewportHeight = window.innerHeight
  
  // Calculate scroll progress through the section
  const scrolled = Math.max(0, -rect.top)
  const maxScroll = sectionHeight - viewportHeight
  const progress = Math.min(scrolled / maxScroll, 1)
  
  // Move items from 0% to -100vw (100% left)
  const translateX = progress * -100
  itemsRef.value.style.transform = `translateX(${translateX}vw)`
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script><template>
  <section>
    <div class="intro">
      <div class="is-track">
        <div class="is-items" ref="itemsRef">
          <div class="is-item">
            <div class="is-title">
              <h1>Une histoire<br>de famille</h1>
            </div>
            <div class="is-content">
              <p>Que vous ayez des suggestions, des questions ou simplement envie de partager votre expérience, nous sommes impatients de vous lire et de continuer à vous offrir le meilleur du cannabis de qualité supérieure.</p>
            </div>
          </div>
          <div class="is-item">
            <div class="is-title">
              <img src="@/assets/demo.png"/>
              <h1>Depuis 2018</h1>
            </div>
            <div class="is-content">
              <h1>À Propos</h1>
              <p>Chez Cheers Cannabis, nous croyons fermement à l'importance de rester connectés et engagés avec notre communauté et l'industrie du cannabis dans son ensemble. Participer aux Cannabis Trade Shows est une opportunité précieuse pour nous de partager notre passion, d'échanger des idées innovantes, et de tisser des liens solides avec d'autres professionnels du secteur.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background: var(--light);
  color: var(--purple);
}

.intro {
  height: 200vh;
  > .is-track {
    position: sticky;
    height: 100vh;
    top: 0;
    width: 100vw;
    overflow: hidden;
    > .is-items {
      display: flex;
      gap: var(--space-xl);
      width: 200vw;
      height: 100vh;
      transition: transform 0.1s ease-out;
      > .is-item {
        display: flex;
        padding: var(--space-rg);
        align-items: center;
        gap: var(--space-lg);
        &:first-child {
          > .is-title {
            flex: 0.75;
          }
          > .is-content {
            flex: 1;
          }
        }
      }
      & h1 {
        font-size: var(--font-xl);
      }
    }
  }
}
</style>