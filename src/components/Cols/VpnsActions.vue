<template>
  <v-tooltip location="bottom" v-if="item.status === 'running'">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat" @click="() => stop(item)">
        <v-icon size="small"> mdi-stop </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.stop") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom" v-if="item.status === 'running'">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat" @click="() => restart(item)">
        <v-icon size="small"> mdi-restart </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.restart") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom" v-if="item.status === 'stopped'">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat" @click="() => start(item)">
        <v-icon size="small"> mdi-play </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.start") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat" @click="() => edit(item)">
        <v-icon size="small"> mdi-pen </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.edit") }}
    </span>
  </v-tooltip>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" variant="flat" @click="() => remove(item)">
        <v-icon size="small"> mdi-delete </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $vuetify.locale.t("$vuetify.main.actions.delete") }}
    </span>
  </v-tooltip>
</template>

<script>
import vpnsStore from "@/store/vpns.store";

export default {
  props: {
    selected: Object,
  },
  data() {
    return {};
  },
  methods: {
    async stop(item) {
      await vpnsStore.stop(item._id);
      await vpnsStore.fetch();
    },
    async restart() {
      await vpnsStore.restart(item._id);
      await vpnsStore.fetch();
    },
    async start() {
      await vpnsStore.start(item._id);
      await vpnsStore.fetch();
    },
    async edit() {
      // await vpnsStore.edit(item._id);
      // await vpnsStore.fetch();
    },
    async remove(item) {
      await vpnsStore.delete(item._id);
      await vpnsStore.fetch();
    },
  },
};
</script>
