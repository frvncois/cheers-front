<template>
  <template v-if="!userStore.isVerified">
    <GlobalRouter
      @verified="handleUserVerified" 
    />
    <HomeHero/>
  </template>
  <template v-if="userStore.isVerified">
    <GlobalHeader />
    <RouterView />
  </template>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import GlobalHeader from '@/components/global/GlobalHeader.vue'
import GlobalRouter from './components/global/GlobalRouter.vue'
import HomeHero from './components/home/HomeHero.vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.init()
})

const handleUserVerified = (userData) => {
  console.log('User verified:', userData)
}
</script>