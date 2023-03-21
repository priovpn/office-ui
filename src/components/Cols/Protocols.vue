<template>
  <v-row dense>
    <span
      class="mr-3"
      style="font-size: 13px"
      v-for="(i, k) in protocols"
      :key="k"
      >{{ protNames[i] }}</span
    >
  </v-row>
</template>

<script>
export default {
  props: {
    protocols: Array,
  },
  data() {
    return {
      protNames: {
        openvpn: "OpenVPN",
        wireguard: "WireGuard",
        outline: "Outline",
        tailscale: "Tailscale",
      },
    };
  },
};
</script>
