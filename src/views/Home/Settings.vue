<template>
  <v-row justify="center" dense no-gutters="">
    <v-col>
      <v-tabs v-model="tab" bg-color="primary" grow>
        <v-tab value="sessions">
          {{
            $vuetify.locale.t("$vuetify.settings.sections.sessions._tabName")
          }}
        </v-tab>
        <v-tab value="2fa">
          {{
            $vuetify.locale.t("$vuetify.settings.sections.security._tabName")
          }}
        </v-tab>
        <v-tab value="deleteData">
          {{
            $vuetify.locale.t("$vuetify.settings.sections.deleteData._tabName")
          }}
        </v-tab>
      </v-tabs>

      <v-card-text class="pa-0">
        <v-window v-model="tab" style="height: 100vh">
          <v-window-item value="sessions">
            <CTable />
          </v-window-item>
          <v-window-item value="2fa">
            <CSecurity />
          </v-window-item>
          <v-window-item value="deleteData">
            <CDeleteData />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { useLocale } from "vuetify/lib/framework.mjs";
import sessionsStore from "@/store/sessions.store.js";
import userStore from "@/store/user.store";
import CTable from "@/components/Settings/Table.vue";
import CSecurity from "@/components/Settings/Security.vue";
import CDeleteData from "@/components/Settings/Security/DeleteData.vue";

export default {
  components: { CTable, CSecurity, CDeleteData },

  setup() {
    return {
      moment,
      sessionsStore,
      userStore,
      isFidoSupported: false,
    };
  },

  data() {
    const { current } = useLocale();
    return {
      locale: current.value,
      loading: false,
      mnemonic: null,
      error: null,
      accountCard: {
        loading: false,
        error: null,
      },
      tab: null,
    };
  },

  methods: {},
};
</script>
