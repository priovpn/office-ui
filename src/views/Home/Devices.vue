<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          width="100%"
          height="350"
          prepend-icon="mdi-network"
        >
          <template v-slot:title>{{
            $vuetify.locale.t("$vuetify.menubar.myDevices")
          }}</template>
          <v-divider />
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $vuetify.locale.t("$vuetify.tableCols._id") }}
                </th>
                <th class="text-left">
                  {{ $vuetify.locale.t("$vuetify.tableCols.name") }}
                </th>
                <th class="text-left">
                  {{ $vuetify.locale.t("$vuetify.tableCols.ip") }}
                </th>
                <th class="text-left">
                  {{ $vuetify.locale.t("$vuetify.tableCols.lastConnect") }}
                </th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in devicesStore.data"
                :key="item.name"
                :style="item.isBlocked ? 'opacity: 0.5' : ''"
              >
                <td>{{ item._id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.ip }}</td>
                <td>
                  {{
                    moment
                      .duration(moment(item.lastConnect).diff(now))
                      .locale(this.locale)
                      .humanize(true)
                  }}
                </td>
                <td>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn icon v-bind="props" variant="flat">
                        <v-icon size="small"> mdi-car-speed-limiter </v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{
                        $vuetify.locale.t("$vuetify.main.actions.limitTraffic")
                      }}
                    </span>
                  </v-tooltip>
                  <v-tooltip location="bottom" v-if="!item.isBlocked">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        v-bind="props"
                        variant="flat"
                        @click="() => block(item)"
                      >
                        <v-icon size="small"> mdi-cancel </v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{ $vuetify.locale.t("$vuetify.main.actions.block") }}
                    </span>
                  </v-tooltip>
                  <v-tooltip location="bottom" v-else>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        v-bind="props"
                        variant="flat"
                        @click="() => unblock(item)"
                      >
                        <v-icon size="small"> mdi-check </v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{ $vuetify.locale.t("$vuetify.main.actions.unblock") }}
                    </span>
                  </v-tooltip>
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        v-bind="props"
                        variant="flat"
                        @click="() => remove(item)"
                      >
                        <v-icon size="small"> mdi-delete </v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{ $vuetify.locale.t("$vuetify.main.actions.delete") }}
                    </span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import { useLocale } from "vuetify/lib/framework.mjs";
import devicesStore from "@/store/devices.store.js";
export default {
  components: {},
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
  async created() {
    await devicesStore.fetch();
  },
  methods: {
    async block(item) {
      await devicesStore.block(item._id);
      await devicesStore.fetch();
    },

    async unblock(item) {
      await devicesStore.unblock(item._id);
      await devicesStore.fetch();
    },

    async remove(item) {
      await devicesStore.delete(item._id);
      await devicesStore.fetch();
    },
  },
};
</script>
