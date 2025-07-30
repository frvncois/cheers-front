<template>
  <section>
    <div class="marquee">

      <div class="is-wrap">
        <div class="is-track">
          <div class="is-items" v-for="(item, index) in items" :key="index">
            <div class="txt" v-if="item.text">
              <h1>{{ item.text }}</h1>
            </div>
            <div class="img" v-if="item.image">
              <img :src="item.image" alt="" />
            </div>
          </div>
        </div>
        <div class="is-track is-trick">
          <div class="is-items" v-for="(item, index) in items" :key="`dup-${index}`">
            <div class="txt" v-if="item.text">
              <h1>{{ item.text }}</h1>
            </div>
            <div class="img" v-if="item.image">
              <img :src="item.image" alt="" />
            </div>
          </div>
        </div>
      </div>



       <div class="about">
            <div class="is-title">
                <h2>Cultivé avec <br>passion</h2>
                <h2>Partagé avec <br>plaisir</h2>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.marquee {
  > .is-wrap {
    display: flex;
    overflow: hidden;
    justify-content: center;
    gap: var(--space-lg);
    > .is-track {
      display: flex;
      min-width: 100vw;
      align-items: center;
      justify-content: space-between;
      animation: marquee 15s linear infinite;
    }
    > .is-trick {
      animation-delay: 0s;
    }
    & img {
      width: 10em;
    }
  }
}

.about {
    > .is-title {
      display: flex;
      flex: 0 0 100%;
      flex-direction: row;
      justify-content: space-between;
      position: relative;
      padding: var(--space-rg);
      > img {
          position: absolute;
          left: 50%;
          bottom: -8em;
          transform: translateX(-50%);
      }
      > h2:last-child {
          text-align: right;
      }
  }
}


@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}


</style>