<template>
  <v-tooltip location="bottom" v-if="!item.raw.closedAt">
    <template v-slot:activator="{ props }">
      <v-icon size="small" color="green" v-bind="props"> mdi-check </v-icon>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.status.opened") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom" v-else-if="item.raw.isBlocked">
    <template v-slot:activator="{ props }">
      <v-icon size="small" color="red" v-bind="props"> mdi-cancel </v-icon>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.status.blocked") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom" v-else-if="item.raw.closedAt">
    <template v-slot:activator="{ props }">
      <v-icon size="small" color="red" v-bind="props"> mdi-close </v-icon>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.status.closed") }}
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
