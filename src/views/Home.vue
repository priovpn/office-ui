<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" width="600" height="350" prepend-icon="mdi-map">
          <template v-slot:title>{{
            $vuetify.locale.t("$vuetify.home.cards.infraMap")
          }}</template>
          <InfrastructureMap />
        </v-card>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card class="mx-auto" width="400" prepend-icon="mdi-help-circle">
              <template v-slot:title>{{
                $vuetify.locale.t("$vuetify.home.cards.qa")
              }}</template>

              <v-card-text> This is content </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InfrastructureMap from "@/components/Home/InfrastructureMap.vue";

export default {
  components: {
    InfrastructureMap,
  },
  data() {},
  mounted() {
    //
  },
};
</script>
