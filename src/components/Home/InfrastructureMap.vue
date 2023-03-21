<template>
  <div style="height: 600px; width: 800px">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="[23.23, 90.89]"
      :useGlobalLeaflet="false"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="(item, key) in markerLatLng"
        :key="key"
        :lat-lng="item.loc"
        :name="item.name"
      >
        <l-popup>{{ item.name }}</l-popup></l-marker
      >
    </l-map>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import { LMap, LPopup, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 2,
      markerLatLng: [
        {
          name: "Ukraine",
          loc: [48.356, 34.31],
        },
        {
          name: "Russia",
          loc: [62.99, 94.927],
        },
      ],
    };
  },
  async beforeMount() {
    await import("leaflet/dist/leaflet-src.esm");
    this.mapIsReady = true;
  },
};
</script>
