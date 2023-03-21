<template>
  <v-tooltip location="bottom" v-if="item.status === 'running'">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat">
        <v-icon size="small"> mdi-stop </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.stop") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom" v-if="item.status === 'running'">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat">
        <v-icon size="small"> mdi-restart </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.restart") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom" v-if="item.status === 'stopped'">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat">
        <v-icon size="small"> mdi-play </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.start") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat">
        <v-icon size="small"> mdi-pen </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.edit") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat">
        <v-icon size="small"> mdi-delete </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.delete") }}
    </span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {};
  },
};
</script>
