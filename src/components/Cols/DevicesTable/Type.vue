<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-icon size="small" v-bind="props" v-if="item.raw.type === 'desktop'">
        mdi-desktop-tower-monitor
      </v-icon>
      <v-icon size="small" v-bind="props" v-if="item.raw.type === 'mobile'">
        mdi-cellphone
      </v-icon>
      <v-icon size="small" v-bind="props" v-if="item.raw.type === 'tablet'">
        mdi-tablet
      </v-icon>
      <v-icon size="small" v-bind="props" v-if="item.raw.type === 'router'">
        mdi-router-wireless
      </v-icon>
      <v-icon size="small" v-bind="props" v-if="item.raw.type === 'server'">
        mdi-server
      </v-icon>
      <v-icon size="small" v-bind="props" v-if="item.raw.type === 'tv'">
        mdi-television
      </v-icon>
      <v-icon size="small" v-bind="props" v-if="item.raw.type === 'other'">
        mdi-devices
      </v-icon>
    </template>
    <span>
      {{ $vuetify.locale.t(`$vuetify.devices.types.${item.raw.type}`) }}
    </span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    item: Object,
  },
};
</script>
