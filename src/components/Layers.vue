<template>
  <g>
    <!-- **************** Rural ***************-->
    <g v-show="layerSet.has(0)">
      <path
        v-for="feature in layersMap.get(0).geo.features"
        :key="feature.properties.fips"
        class="stars"
        fill="#fff"
        stroke="#898989"
        :transform="`translate(${projection(feature.geometry.coordinates)})`"
        d="M0,-5.169564076968053L1.1606394486397382,-1.5974831532933669L4.916547601805807,-1.597483153293367L1.8779540765830343,0.6101842681027074L3.0385935252227734,4.182265191777393L2.220446049250313e-16,1.9745977703813185L-3.0385935252227725,4.182265191777393L-1.8779540765830343,0.6101842681027079L-4.916547601805807,-1.597483153293366L-1.1606394486397387,-1.5974831532933667Z"
      ></path>
    </g>
    <!-- **************** Interstates ***************-->
    <g v-show="layerSet.has(1)">
      <path
        v-for="feature in layersMap.get(1).geo.features"
        :key="feature.properties.fips"
        class="stars"
        fill="none"
        stroke="#898989"
        :d="generatePath(feature.geometry)"
      ></path>
    </g>
    <!-- **************** Rural Circles ***************-->
    <g v-show="layerSet.has(5)">
      <circle
        v-for="feature in layersMap.get(0).geo.features"
        :key="feature.properties.fips"
        class="rural-circles"
        fill="#fff"
        stroke="#898989"
        cx="0"
        cy="0"
        r="4"
        :transform="`translate(${projection(feature.geometry.coordinates)})`"
      />
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
</style>