<template>
  <v-card class="mx-auto" width="100%" prepend-icon="mdi-door">
    <template v-slot:title>
      {{ $vuetify.locale.t("$vuetify.devices.cards.devices") }}
    </template>
    <template v-slot:append>
      <v-menu
        v-model="create.show"
        :close-on-content-click="false"
        location="start"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="plain" @click="create">
            <v-icon size="small"> mdi-plus </v-icon>
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-select
            :label="$vuetify.locale.t('$vuetify.tableCols.type')"
            :items="deviceTypesSelect"
            item-title="a"
            item-value="b"
            hide-details="auto"
            v-model="create.deviceType"
            :disabled="create.loading"
          ></v-select>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="tonal"
              block
              @click="createDevice"
              :loading="create.loading"
            >
              {{ $vuetify.locale.t("$vuetify.main.actions.create") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            variant="plain"
            :disabled="
              devicesStore.data.length === 0 ||
              devicesStore.selected.length === 0
            "
            @click="remove"
          >
            <v-icon size="small"> mdi-delete </v-icon>
          </v-btn>
        </template>
        <span>
          {{ $vuetify.locale.t("$vuetify.main.btns.delete") }}
        </span>
      </v-tooltip>
    </template>
    <v-divider />
    <v-data-table-server
      v-model="devicesStore.selected"
      :headers="headers"
      :items-length="devicesStore.pagination.total"
      :items-per-page="devicesStore.pagination.perPage"
      :page="devicesStore.pagination.page"
      :items="devicesStore.data"
      :loading="loading"
      @update:options="options = $event"
      :no-data-text="$vuetify.locale.t('$vuetify.errors.NO_DATA')"
      :loading-text="$vuetify.locale.t('$vuetify.errors.LOADING_TEXT')"
      show-select
    >
      <template v-slot:item._id="{ item }">
        {{ parsers.cutId(item.raw._id) }}
      </template>
      <template v-slot:item.name="{ item }">
        <span>{{
          item.raw.name ?? $vuetify.locale.t("$vuetify.devices.new")
        }}</span>
      </template>
      <template v-slot:item.type="{ item }">
        <Type :item="item" />
      </template>
      <template v-slot:item.ip="{ item }">
        <span>{{ item.raw.ip ?? "-" }}</span>
      </template>
      <template v-slot:item.vpns="{ item }">
        <v-chip v-for="(i, k) in item.raw.vpns ?? []" :key="k">{{
          parsers.cutId(i)
        }}</v-chip>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ parsers.parseDurationDate(item.raw.createdAt) }}
      </template>
    </v-data-table-server>
  </v-card>
</template>
<script>
import Type from "@/components/Cols/DevicesTable/Type.vue";
import devicesStore from "@/store/devices.store";
import sessionsStore from "@/store/sessions.store";
import * as parsers from "@/utils/parsers.js";
import { useLocale } from "vuetify/lib/framework.mjs";

export default {
  components: { Type },

  props: {},

  setup() {
    return {
      sessionsStore,
      devicesStore,
      parsers,
    };
  },

  computed: {
    deviceTypesSelect() {
      const { current } = useLocale();
      return this.$vuetify.locale.messages[current.value].devices._types;
    },
  },

  data() {
    return {
      headers: [],
      selected: [],
      options: {},
      loading: false,
      create: {
        deviceType: null,
        show: false,
        loading: false,
      },
    };
  },

  watch: {
    "$vuetify.locale.current"() {
      this.renderHeaders();
    },
    options: {
      async handler() {
        devicesStore.updatePagination({
          page: this.options.page,
          perPage: this.options.itemsPerPage,
          groupBy: this.options.groupBy,
          sortBy: this.options.sortBy,
        });

        await this._withLoading(devicesStore.fetch.bind(devicesStore));
      },
      deep: true,
    },
  },

  async mounted() {
    this.renderHeaders();
  },

  methods: {
    renderHeaders() {
      this.headers = [
        {
          title: "ID",
          align: "start",
          sortable: true,
          width: 60,
          key: "_id",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.name"),
          sortable: false,
          width: 170,
          key: "name",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.type"),
          sortable: false,
          width: 120,
          align: "end",
          key: "type",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.ip"),
          sortable: false,
          width: 180,
          align: "end",
          key: "ip",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.linkedTo"),
          sortable: false,
          width: 200,
          align: "end",
          key: "vpns",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.created"),
          sortable: true,
          width: 150,
          key: "createdAt",
        },
      ];
    },

    async _withLoading(fn) {
      this.loading = true;
      this.create.loading = true;
      await fn();
      this.loading = false;
      this.create.loading = false;
    },

    async createDevice() {
      await this._withLoading(
        async () =>
          await devicesStore.create({
            type: this.create.deviceType,
          })
      );

      this.create.show = false;
    },

    async remove() {
      await this._withLoading(
        async () =>
          await Promise.all(
            devicesStore.selected.map((device) =>
              devicesStore.remove(device._id)
            )
          )
      );
    },
  },
};
</script>
