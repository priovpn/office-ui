<template>
  <v-footer app color="transparent">
    <span style="font-size: 15px; font-weight: 300">
      © 2023 PrioVPN. All Rights Reserved.
    </span>
    <v-spacer></v-spacer>
    <v-btn variant="text" to="/terms">Terms of Service</v-btn>
    <v-menu min-width="100px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon variant="text">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-btn
          variant="text"
          href="#"
          @click.prevent="() => uiStore.changeLocale('en')"
          block
        >
          English
        </v-btn>
        <v-btn
          variant="text"
          href="#"
          @click.prevent="() => uiStore.changeLocale('ru')"
          block
        >
          Русский
        </v-btn>
      </v-card>
    </v-menu>
  </v-footer>
</template>
<script>
import uiStore from "@/store/ui.store";

export default {
  setup() {
    return {
      uiStore,
    };
  },
};
</script>
