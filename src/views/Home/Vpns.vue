<template>
  <v-row>
    <v-col>
      <v-card
        class="mx-auto"
        width="100%"
        height="350"
        prepend-icon="mdi-network"
      >
        <template v-slot:title>{{
          $vuetify.locale.t("$vuetify.menubar.myVpns")
        }}</template>
        <template v-slot:append>
          <v-btn variant="flat">
            <v-icon icon="mdi-plus" class="me-2"></v-icon>
            {{ $vuetify.locale.t("$vuetify.main.btns.createVpn") }}
          </v-btn>
        </template>
        <v-divider />
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                {{ $vuetify.locale.t("$vuetify.tableCols.id") }}
              </th>
              <th class="text-left">
                {{ $vuetify.locale.t("$vuetify.tableCols.name") }}
              </th>
              <th class="text-left">
                {{ $vuetify.locale.t("$vuetify.tableCols.status") }}
              </th>
              <th class="text-left">
                {{ $vuetify.locale.t("$vuetify.tableCols.loc") }}
              </th>
              <th class="text-left">
                {{ $vuetify.locale.t("$vuetify.tableCols.protocols") }}
              </th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in vpnsStore.data" :key="item.name">
              <td>{{ item._id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <StatusCol :status="item.status" />
              </td>
              <td>{{ item.location }}</td>
              <td>
                <ProtocolsCol :protocols="item.protocols" />
              </td>
              <td>
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" variant="flat">
                      <v-icon size="small">
                        mdi-chart-areaspline-variant
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    {{ $vuetify.locale.t("$vuetify.main.btns.stats") }}
                  </span>
                </v-tooltip>
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" variant="flat">
                      <v-icon size="small"> mdi-connection </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    {{ $vuetify.locale.t("$vuetify.main.btns.connect") }}
                  </span>
                </v-tooltip>
                <VpnsActionsCol :item="item" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import StatusCol from "@/components/Cols/Status.vue";
import ProtocolsCol from "@/components/Cols/Protocols.vue";
import VpnsActionsCol from "@/components/Cols/VpnsActions.vue";
import vpnsStore from "@/store/vpns.store";
export default {
  components: {
    StatusCol,
    ProtocolsCol,
    VpnsActionsCol,
  },
  setup() {
    return {
      vpnsStore,
    };
  },
  data() {
    return {};
  },
  async created() {
    await vpnsStore.fetch();
  },
};
</script>
