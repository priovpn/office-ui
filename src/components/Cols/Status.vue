<template>
  <div v-if="status === 'starting'">
    <v-icon icon="mdi-reload" class="me-2" style="color: darkorange"></v-icon>
    <span>{{ $vuetify.locale.t(`$vuetify.main.status.starting`) }}</span>
  </div>
  <div v-if="status === 'running'">
    <v-icon icon="mdi-check" class="me-2" style="color: green"></v-icon>
    <span>{{ $vuetify.locale.t(`$vuetify.main.status.running`) }}</span>
  </div>
  <div v-if="status === 'stopped'">
    <v-icon
      icon="mdi-stop-circle-outline"
      class="me-2"
      style="color: red"
    ></v-icon>
    <span>{{ $vuetify.locale.t(`$vuetify.main.status.stopped`) }}</span>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
  },
};
</script>
