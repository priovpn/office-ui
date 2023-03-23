import { reactive } from "vue";
import api from "@/api";

export default reactive({
  data: [
    {
      id: 1,
      name: "Test",
      status: "running",
      location: "Lappeenranta, Finland",
      protocols: ["openvpn", "wireguard"],
    },
    {
      id: 2,
      name: "Test 2",
      status: "running",
      location: "Nuremberg, Germany",
      protocols: ["outline"],
    },
  ],

  async fetch() {
    this.data = (await api.get("/vpns")).data;
  },

  async stop(id) {
    await api.post(`/vpns/${id}/stop`);
  },

  async restart(id) {
    await api.post(`/vpns/${id}/restart`);
  },

  async start(id) {
    await api.post(`/vpns/${id}/start`);
  },

  async delete(id) {
    await api.delete(`/vpns/${id}`);
  },
});
