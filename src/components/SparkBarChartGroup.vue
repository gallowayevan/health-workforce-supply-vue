<template>
  <g transform="translate(638, 90)" id="bar-chart-group">
    <text class="barChartHeader" transform="translate(0,-65)" v-html="barChartHeader"></text>
    <!-- <transition name="fade">
    <g class="ncLineLegend" transform="translate(0,-35)" v-if="region != 'North Carolina'">
    <line x1="0"  x2="40" />
    <text dx=45 dy=3 >Rate / Median / Percent for State</text>
    </g>
    </transition>-->
    <SparkBarChart
      v-for="(variable, index) in variables"
      :key="variable"
      :variable="variable"
      :transform="`translate(0,${index*110})`"
    ></SparkBarChart>
  </g>
</template>

<script>
import SparkBarChart from "./SparkBarChart";
import { wrap, medicaidRegionName } from "../utility";
import { mapState } from "vuex";

export default {
  name: "SparkBarChartGroup",
  components: {
    SparkBarChart
  },
  data() {
    return {};
  },
  computed: {
    barChartHeader() {
      const currRegion =
        this.aggregationLevel == "county" && this.region != "North Carolina"
          ? `${this.region} County`
          : this.aggregationLevel == "ahec" &&
            this.region.indexOf("AHEC") == -1 &&
            this.region != "North Carolina"
          ? `${this.region} AHEC`
          : this.aggregationLevel == "medicaid" &&
            this.region != "North Carolina"
          ? this.getMedicaidRegionName(this.region)
          : this.region;
      let text = `Profession Demographics for ${currRegion}`; //, ${this.yearExtent[0]} - ${this.yearExtent[1]};
      return wrap({ text: text, maxCharsPerLine: 30, lineHeight: 1.1 });
    },
    ...mapState(["variables", "region", "aggregationLevel", "yearExtent"])
  },
  methods: {
    getMedicaidRegionName: function(numericRegionName) {
      return medicaidRegionName.get(numericRegionName);
    }
  }
};
</script>

<style scoped>
.ncLineLegend text {
  font-size: 0.8em;
}

.ncLineLegend line {
  stroke: #4b9cd3;
  stroke-width: 2;
  /* stroke-opacity: 0.8; */
}

.barChartHeader {
  font-size: 1em;
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

