<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12" md="12" lg="9"> <CTable /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import { useLocale } from "vuetify/lib/framework.mjs";
import devicesStore from "@/store/devices.store.js";
import CTable from "@/components/Devices/Table.vue";

export default {
  components: { CTable },
  setup() {
    const { current } = useLocale();

    return {
      moment,
      devicesStore,
      locale: current.value,
    };
  },
  data() {
    return {};
  },
  async created() {},
  methods: {},
};
</script>
