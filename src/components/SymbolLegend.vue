<template>
  <g>
    <g v-show="layerIsActive(0)">
      <path
        fill="#001a0e"
        opacity="0.5"
        d="M-3.1622776601683795,-3.1622776601683795h6.324555320336759v6.324555320336759h-6.324555320336759Z"
        transform="scale(1.5) translate(-5 0)"
      />
      <text :dy="textdy" :dx="textdx">Rural (Nonmetropolitan)</text>
    </g>
    <g v-show="layerIsActive(1)" :transform="`translate(0 ${offset * 1})`">
      <line x2="15" stroke-width="1.5" stroke="#001a0e" opacity="0.6" transform="translate(-15 0)" />
      <text :dy="textdy" :dx="textdx">Interstates</text>
    </g>
    <g v-show="layerIsActive(2)" :transform="`translate(0 ${offset * 2})`">
      <g transform="translate(-20 -10)">
        <use xlink:href="#urbanized-area-icon" />
      </g>
      <text :dy="textdy" :dx="textdx">Urbanized Areas</text>
    </g>
  </g>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SymbolLegend",
  data() {
    return {
      offset: 20,
      textdy: 5,
      textdx: 10
    };
  },
  computed: {
    layerIsActive() {
      return testValue => this.layers.some(({ value }) => value == testValue);
    },
    ...mapState(["layers"])
  }
};
</script>

<style scoped>
text {
  font-size: 1em;
  font-weight: 600;
  fill: #4b4b4b;
}
</style>>