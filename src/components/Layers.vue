<template>
  <g>
    <!-- **************** Rural Circles ***************-->
    <g v-show="layerSet.has(7)">
      <circle
        v-for="feature in layersMap.get(0).geo.features"
        :key="feature.properties.fips"
        class="rural-marker"
        cx="0"
        cy="0"
        r="4"
        :transform="`translate(${projection(feature.geometry.coordinates)})`"
      />
    </g>

    <!-- **************** Interstates ***************-->
    <g v-show="layerSet.has(1)">
      <path
        v-for="feature in layersMap.get(1).geo.features"
        :key="feature.properties.LINEARID"
        class="interstates"
        fill="none"
        stroke-width="1.5"
        stroke="#001a0e"
        opacity="0.2"
        :d="generatePath(feature.geometry)"
      ></path>
    </g>
    <!-- **************** Urbanized Areas ***************-->
    <g v-show="layerSet.has(2)">
      <path
        v-for="feature in layersMap.get(2).geo.features"
        :key="feature.properties.GEOID10"
        class="urbanized-areas"
        fill="none"
        stroke-width="1"
        stroke-opacity="0.5"
        stroke="#001a0e"
        :d="generatePath(feature.geometry)"
      ></path>
    </g>
    <!-- **************** Rural Triangles***************-->
    <g v-show="layerSet.has(5)">
      <path
        v-for="feature in layersMap.get(0).geo.features"
        :key="feature.properties.fips"
        class="rural-marker"
        :transform="`translate(${projection(feature.geometry.coordinates)})`"
        d="M0,-5.549055267050423L4.805622828269508,2.7745276335252114L-4.805622828269508,2.7745276335252114Z"
      ></path>
    </g>
    <!-- **************** Rural Diamonds***************-->
    <g v-show="layerSet.has(6)">
      <path
        v-for="feature in layersMap.get(0).geo.features"
        :key="feature.properties.fips"
        class="rural-marker"
        :transform="`translate(${projection(feature.geometry.coordinates)})`"
        d="M0,-5.885661912765424L3.398088489694245,0L0,5.885661912765424L-3.398088489694245,0Z"
      ></path>
    </g>
    <!-- **************** Rural Squares***************-->
    <g v-show="layerSet.has(0)">
      <path
        v-for="feature in layersMap.get(0).geo.features"
        :key="feature.properties.fips"
        class="rural-marker"
        :transform="`translate(${projection(feature.geometry.coordinates)})`"
        d="M-3.1622776601683795,-3.1622776601683795h6.324555320336759v6.324555320336759h-6.324555320336759Z"
      ></path>
    </g>
  </g>
</template>

<script>
import { geoPath } from "d3-geo";
import layersJSON from "../assets/data/layers";
const layersMap = new Map(layersJSON.map(d => [d.id, d]));

export default {
  data() {
    return {
      layersMap: layersMap
    };
  },
  props: ["projection"],
  computed: {
    layers() {
      return this.$store.state.layers;
    },
    layerSet() {
      return new Set(this.layers.map(d => d.value));
    },
    generatePath: function() {
      return geoPath(this.projection);
    }
  }
};
</script>

<style scoped>
g {
  pointer-events: none;
}

.rural-marker {
  /* fill: "#001a0e";
  opacity: 0.4; */
  fill: #ffffff;
  stroke: #001a0e;
}
</style>