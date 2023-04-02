<template>
  <v-row justify="center" dense no-gutters="">
    <v-col cols="12" md="12" lg="12">
      <CTable />
    </v-col>
  </v-row>
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
