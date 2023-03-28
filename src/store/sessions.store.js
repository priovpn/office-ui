import { reactive } from "vue";
import api from "@/api";

export default reactive({
  data: [],
  selected: [],

  pagination: {
    total: 0,
    perPage: 10,
    page: 1,
  },

  updatePagination(p) {
    this.pagination = p;
  },

  async fetch() {
    const res = await api.sessions.fetch({
      perPage: this.pagination.perPage,
      page: this.pagination.page,
      groupBy: this.pagination.groupBy,
      sortBy: this.pagination.sortBy,
    });
    this.data = res.data;
    this.pagination.total = res.total;
    return res;
  },

  async close(id) {
    await api.sessions.close(id);
    this.selected = [];
    await this.fetch();
  },

  async block(id) {
    await api.sessions.block(id);
    this.selected = [];
    await this.fetch();
  },
});
