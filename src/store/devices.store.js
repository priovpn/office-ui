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
    const res = await api.devices.fetch({
      perPage: this.pagination.perPage,
      page: this.pagination.page,
      groupBy: this.pagination.groupBy,
      sortBy: this.pagination.sortBy,
    });
    this.data = res.data;
    this.pagination.total = res.total;
    return res;
  },

  async create(data) {
    await api.devices.create(data);
    this.selected = [];
    await this.fetch();
  },

  async remove(id) {
    await api.devices.delete(id);
    this.selected = [];
    await this.fetch();
  },
});
