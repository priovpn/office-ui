import { reactive } from "vue";
import api from "@/api";

export default reactive({
  data: [
    {
      id: 1,
      name: "Test",
      ip: "127.0.0.1",
      lastConnect: 1679456897384,
      isBlocked: true,
    },
  ],

  async fetch() {
    this.data = (await api.get("/devices")).data;
  },

  async block(id) {
    await api.post(`/devices/${id}/block`);
  },

  async unblock(id) {
    await api.post(`/devices/${id}/unblock`);
  },

  async delete(id) {
    await api.delete(`/devices/${id}`);
  },
});
