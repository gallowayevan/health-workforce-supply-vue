<template>
  <g id="map-container">
    <text id="map-title" transform="translate(0,25)" v-html="title"></text>
    <g class="counties" :transform="`translate(${chartMargin.left}, ${chartMargin.top})`">
      <path
        v-for="item in countyFeatures"
        :key="item.properties.county"
        :d="generatePath(item.geometry)"
        class="county"
        :class="{selected: item.properties.county == region}"
        :fill="colorScale(mapData.get(item.properties[aggregationLevel]))"
        @click="clicked(item.properties.county)"
      >
        <title
          v-html="`${item.properties.county} County\n${hoverValueText(mapData.get(item.properties[aggregationLevel]))}${variable == `providerRate` ? `\n(` + totalMap.get(item.properties[aggregationLevel]) + ` total)` : ``}`"
        ></title>
      </path>
    </g>
    <g
      class="ahecs"
      :transform="`translate(${chartMargin.left}, ${chartMargin.top})`"
      v-show="aggregationLevel == 'ahec'"
    >
      <path
        v-for="item in ahecFeatures"
        :key="item.properties.ahec"
        :d="generatePath(item.geometry)"
        class="overlay ahec"
        :class="{selected: item.properties.ahec == region}"
        @click="clicked(item.properties.ahec)"
      >
        <title
          v-html="`${item.properties.ahec == 'Wake AHEC' ? 'Wake' : item.properties.ahec}\n${hoverValueText(mapData.get(item.properties[aggregationLevel]))}${variable == `providerRate` ? `\n(` + totalMap.get(item.properties[aggregationLevel]) + ` total)` : ``}`"
        ></title>
      </path>
    </g>
    <g
      class="medicaids"
      :transform="`translate(${chartMargin.left}, ${chartMargin.top})`"
      v-show="aggregationLevel == 'medicaid'"
    >
      <path
        v-for="item in medicaidFeatures"
        :key="item.properties.medicaid"
        :d="generatePath(item.geometry)"
        class="overlay medicaid"
        :class="{selected: item.properties.medicaid == region}"
        @click="clicked(item.properties.medicaid)"
      >
        <title
          v-html="`${getMedicaidRegionName(item.properties.medicaid)}\n${hoverValueText(mapData.get(item.properties[aggregationLevel]))}${variable == `providerRate` ? `\n(` + totalMap.get(item.properties[aggregationLevel]) + ` total)` : ``}`"
        ></title>
      </path>
    </g>
    <histogram-legend
      class="histogram-legend"
      transform="translate(40,325)"
      :colorScale="colorScale"
      :histogramData="histogramData"
      :mapData="mapData"
      v-if="aggregationLevel=='county'"
    ></histogram-legend>
    <row-chart v-else transform="translate(215,325)" :colorScale="colorScale" :mapData="mapData"></row-chart>
  </g>
</template>

<script>
import { geoAlbers, rotate, fitSize, geoPath } from "d3-geo";
import { extent, histogram, ticks, max } from "d3-array";
import { scaleThreshold, scaleQuantile } from "d3-scale";
// import { interpolateViridis } from "d3-scale-chromatic";
import { schemeYlGn } from "d3-scale-chromatic";
import { formatter, wrap, medicaidRegionName } from "../utility";
import mapGeojson from "../assets/data/ncMap";
import ahecGeojson from "../assets/data/ahec";
import medicaidGeojson from "../assets/data/medicaid";
import { professionChartTitle } from "../chart-text";
// import BeeswarmChart from './BeeswarmChart';
import HistogramLegend from "./HistogramLegend";
import RowChart from "./RowChart";
import { mapState } from "vuex";
import scaleCluster from "d3-scale-cluster";

export default {
  name: "Map",
  data() {
    return {
      width: 665,
      chartMargin: { top: -25, right: 37, bottom: 21, left: 10 },
      mapGeojson: mapGeojson,
      ahecGeojson: ahecGeojson,
      showTooltip: false,
      centroid: -9,
      tooltipRegion: "",
      mapHoverOrigin: false
    };
  },
  components: { HistogramLegend, RowChart },
  computed: {
    height() {
      return this.width * 0.6;
    },
    countyFeatures: function() {
      let features = mapGeojson.features;
      const region = this.region;
      //Need to reorder to bring selected county to front of render stack to show stroke
      if (region != "North Carolina" && this.aggregationLevel == "county") {
        let index = 0;
        index = features.map(d => d.properties.county).indexOf(region);
        features.push(features.splice(index, 1)[0]);
      }

      return features;
    },
    ahecFeatures: function() {
      let features = ahecGeojson.features;
      const region = this.region;
      //Need to reorder to bring selected county to front of render stack to show stroke
      if (region != "North Carolina" && this.aggregationLevel == "ahec") {
        let index = 0;
        index = features.map(d => d.properties.ahec).indexOf(region);
        features.push(features.splice(index, 1)[0]);
      }

      return features;
    },
    medicaidFeatures: function() {
      let features = medicaidGeojson.features;
      const region = this.region;
      //Need to reorder to bring selected county to front of render stack to show stroke
      if (region != "North Carolina" && this.aggregationLevel == "medicaid") {
        let index = 0;
        index = features.map(d => d.properties.medicaid).indexOf(region);
        features.push(features.splice(index, 1)[0]);
      }

      return features;
    },
    title: function() {
      let title = `${professionChartTitle(this.variable, this.specialty)} by ${
        this.aggregationLevel == "county"
          ? "County"
          : this.aggregationLevel == "ahec"
          ? "AHEC region"
          : "Medicaid Region"
      }, North Carolina, ${this.year}`;
      // console.log(wrap(title))
      return wrap({ text: title, maxCharsPerLine: 85 });
    },
    mapData() {
      const mapDataMap = new Map(
        this.data
          .filter(d => d.year == this.year && d.type == this.aggregationLevel)
          .map(d => {
            // const modRegion =
            //   this.aggregationLevel == "medicaid"
            //     ? +d.region.slice(-1)
            //     : d.region;
            return [d.region, d[this.variable]];
          })
      );

      return mapDataMap;
    },
    totalMap() {
      return new Map(
        this.data
          .filter(d => d.year == this.year && d.type == this.aggregationLevel)
          .map(d => {
            return [d.region, d.total];
          })
      );
    },
    viewBox: function() {
      return `0 0 ${this.width} ${this.height}`;
    },
    generatePath: function() {
      const chartWidth =
        this.width - this.chartMargin.left - this.chartMargin.right;
      const chartHeight =
        this.height - this.chartMargin.top - this.chartMargin.bottom;

      const projection = geoAlbers()
        .rotate([0, 62, 0])
        .fitSize([chartWidth, chartHeight], mapGeojson);

      return geoPath(projection);
    },
    currentDomainAllTime() {
      return this.data
        .filter(
          d =>
            d.type == this.aggregationLevel &&
            d[this.variable] > 0 &&
            d[this.variable] != "NA"
        )
        .map(d => ({ value: d[this.variable], year: d.year }));
    },
    histogramData() {
      const currentDomain = this.currentDomainAllTime
        .filter(d => d.year == this.year)
        .map(d => +d.value);
      const currentExtent = extent(this.currentDomainAllTime, d => d.value);
      // const currentDivider = this.aggregationLevel == "county" ? 10 : 3;
      // const currTicks = ticks(
      //   ...currentExtent,
      //   Math.round(
      //     this.currentDomainAllTime
      //       .filter(d => d.year == this.yearExtent[1])
      //       .map(d => +d.value).length / currentDivider
      //   )
      // );
      // const currTicks = 10;

      const currHistogram = histogram()
        .domain(currentExtent)
        .thresholds(ticks(...currentExtent, 10)); //thresholdSturges(currentDomain)));

      const currBins = currHistogram(currentDomain);
      // console.log(currBins)
      return currBins;
    },
    colorScale() {
      const currDomain = this.currentDomainAllTime
        .filter(d => d.year == this.scaleYear)
        .map(d => +d.value);

      if (this.aggregationLevel == "county") {
        const currRangeCount = currDomain.length;
        // const currDomain = [].concat(...this.histogramData);
        const numberOfColorBins = Math.max(
          Math.min(Math.round(currDomain.length / 12), 6),
          3
        );
        const currRange = schemeYlGn[numberOfColorBins + 1].slice(1); //get rid of yellow as it is too light
        const currBinWidth =
          this.histogramData[1].x1 - this.histogramData[1].x0; //max(this.histogramData, d=>d.x1 - d.x0);
        const clusterScale = scaleCluster()
          .domain(currDomain)
          .range(currRange);
        // console.log(clusterScale.clusters());

        const clusters = clusterScale.clusters();
        const matchedClusters = clusters.map(function(d, i) {
          let currValue = d;
          if (i == 0) {
            currValue = Math.ceil(currValue / currBinWidth) * currBinWidth;
          } else if (i == clusters.length - 1) {
            currValue = Math.floor(currValue / currBinWidth) * currBinWidth;
          } else {
            currValue = Math.round(currValue / currBinWidth) * currBinWidth;
          }

          return currValue;
        });
        // console.log(matchedClusters)
        const allClusters = [0, Number.EPSILON, ...matchedClusters].filter(
          (d, i, arr) => d != arr[i - 1]
        );
        const allRange = ["url(#NApattern)", "#e3e3e3", ...currRange];

        //Use set to ensure only unique values
        const colorScale = scaleThreshold()
          .domain([...new Set(allClusters)])
          .range(allRange);

        return colorScale;
      } else {
        const quantileScale = scaleQuantile()
          .domain(currDomain)
          .range(schemeYlGn[4].slice(1));

        const colorScale = scaleThreshold()
          .domain([0, Number.EPSILON, ...quantileScale.quantiles()])
          .range(["url(#NApattern)", "#e3e3e3", ...quantileScale.range()]);

        return colorScale;
      }
    },
    valueFormatter: function() {
      return formatter(this.variable);
    },
    hoverValueText() {
      let variableText = "";
      switch (this.variable) {
        case "providerRate":
          variableText = "per 10,000 population";
          break;
        case "percentFemale":
          variableText = "female";
          break;
        case "percentAge":
          variableText = "65 or older";
          break;
        case "percentUnderrepresented":
          variableText = "underrepresented minority";
          break;
        case "total":
          variableText = "total";
          break;
      }

      return function(valueToFormat) {
        const formattedValue = this.valueFormatter(valueToFormat);
        return `${formattedValue} ${variableText}`;
      };
    },
    ...mapState([
      "data",
      "year",
      "variable",
      "specialty",
      "region",
      "aggregationLevel",
      "yearExtent",
      "scaleYear"
    ])
  },
  methods: {
    clicked: function(region) {
      this.$store.commit("changeRegion", region);
    },
    getMedicaidRegionName: function(numericRegionName) {
      return medicaidRegionName.get(numericRegionName);
    }
  }
};
</script>


<style>
.county {
  stroke: #fff;
  stroke-width: 1;
}
.county:hover {
  fill: #808080;
}
.overlay:hover {
  fill: #808080;
  opacity: 0.6;
}

.overlay {
  fill: none;
  stroke: #2a2a2a;
  stroke-width: 3;
  pointer-events: all;
}

.selected {
  stroke: rgb(163, 49, 128);
  stroke-width: 4px;
}

#map-title {
  text-align: center;
  font-weight: 600;
  font-size: 1em;
}

/* div.tooltip {
  position: absolute;
  text-align: center;			
  padding: 8px;
  font: 12px sans-serif;
  background: rgb(163, 49, 128);
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
  opacity: 0.85;
  color: #fff;
} */

/* .titleYear {
  font-size: 1.3em;
  animation-name: titleYearAnimation;
  animation-duration: 2s;
}

@keyframes titleYearAnimation {
  from {font-size: 1.3em}
  to {font-size: 2em}
} */
</style>
 
