<template>
  <HomeNavbar />
  <div class="container-fluid">
    <div class="card mainSection mb-3">
      <div class="card-body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HomeNavbar from '@/components/HomeNavbar.vue'

@Options({
  components: {
    HomeNavbar
  }
})
export default class HomeView extends Vue {}
</script>
