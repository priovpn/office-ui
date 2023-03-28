<template>
  <v-card class="mx-auto" width="100%" prepend-icon="mdi-door">
    <template v-slot:title>
      {{ $vuetify.locale.t("$vuetify.settings.cards.sessions") }}
    </template>
    <template v-slot:append>
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            variant="plain"
            :disabled="
              sessionsStore.data.length === 0 ||
              sessionsStore.selected.length === 0
            "
            @click="close"
          >
            <v-icon size="small"> mdi-logout </v-icon>
          </v-btn>
        </template>
        <span>
          {{ $vuetify.locale.t("$vuetify.main.btns.logout") }}
        </span>
      </v-tooltip>
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            variant="plain"
            :disabled="
              sessionsStore.data.length === 0 ||
              sessionsStore.selected.length === 0
            "
            @click="block"
          >
            <v-icon size="small"> mdi-cancel </v-icon>
          </v-btn>
        </template>
        <span>
          {{ $vuetify.locale.t("$vuetify.main.btns.block") }}
        </span>
      </v-tooltip>
    </template>
    <v-divider />
    <v-data-table-server
      v-model="sessionsStore.selected"
      :headers="headers"
      :items-length="sessionsStore.pagination.total"
      :items-per-page="sessionsStore.pagination.perPage"
      :page="sessionsStore.pagination.page"
      :items="sessionsStore.data"
      :loading="loading"
      @update:options="options = $event"
      :no-data-text="$vuetify.locale.t('$vuetify.errors.NO_DATA')"
      :loading-text="$vuetify.locale.t('$vuetify.errors.LOADING_TEXT')"
      show-select
    >
      <template v-slot:item._id="{ item }">
        {{ parsers.cutId(item.raw._id) }}
      </template>
      <template v-slot:item.ip="{ item }">
        {{ item.raw.ip ?? "-" }}
      </template>
      <template v-slot:item.location="{ item }">
        {{
          item.raw.location
            ? `${item.raw.location.city}, ${item.raw.location.region_code}, ${item.raw.location.country_code}`
            : "-"
        }}
      </template>
      <template v-slot:item.name="{ item }">
        {{ item.raw.userAgent ? parsers.parseUA(item.raw.userAgent) : "-" }}
      </template>
      <template v-slot:item.status="{ item }">
        <Status :item="item" />
      </template>
      <template v-slot:item.openedAt="{ item }">
        {{ parsers.parseDurationDate(item.raw.openedAt) }}
      </template>
      <template v-slot:item.closedAt="{ item }">
        {{
          item.raw.closedAt ? parsers.parseDurationDate(item.raw.closedAt) : "-"
        }}
      </template>
    </v-data-table-server>
  </v-card>
</template>
<script>
import Status from "@/components/Cols/SessionsTable/Status.vue";
import sessionsStore from "@/store/sessions.store";
import * as parsers from "@/utils/parsers.js";

export default {
  components: { Status },

  props: {},

  setup() {
    return {
      sessionsStore,
      parsers,
    };
  },

  data() {
    return {
      headers: [],
      selected: [],
      options: {},
      loading: false,
    };
  },

  watch: {
    "$vuetify.locale.current"() {
      this.renderHeaders();
    },
    options: {
      async handler() {
        console.log(this.options);
        sessionsStore.updatePagination({
          page: this.options.page,
          perPage: this.options.itemsPerPage,
          groupBy: this.options.groupBy,
          sortBy: this.options.sortBy,
        });
        this.loading = true;
        await sessionsStore.fetch();
        this.loading = false;
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
          title: this.$vuetify.locale.t("$vuetify.tableCols.loc"),
          sortable: false,
          width: 240,
          key: "location",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.status"),
          sortable: false,
          width: 40,
          align: "end",
          key: "status",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.ip"),
          sortable: false,
          width: 130,
          key: "ip",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.opened"),
          sortable: true,
          width: 150,
          key: "openedAt",
        },
        {
          title: this.$vuetify.locale.t("$vuetify.tableCols.closed"),
          sortable: true,
          width: 150,
          key: "closedAt",
        },
      ];
    },

    async _withLoading(fn) {
      this.loading = true;
      await fn();
      this.loading = false;
    },

    async close() {
      await this._withLoading(
        async () =>
          await Promise.all(
            sessionsStore.selected.map((session) =>
              sessionsStore.close(session._id)
            )
          )
      );
    },

    async block() {
      await this._withLoading(
        async () =>
          await Promise.all(
            sessionsStore.selected.map((session) =>
              sessionsStore.block(session._id)
            )
          )
      );
    },
  },
};
</script>
