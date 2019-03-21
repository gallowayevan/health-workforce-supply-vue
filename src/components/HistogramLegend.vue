 <template>
 <g> 
     <g :transform="`translate(${xScale.range()[0] - binWidth * 1.9}, ${yScale(0)})`">
<rect   x=0
        :y="yScale(zeroRegions) - yScale(0)"
        :width="binWidth"
        :height="yScale(0) - yScale(zeroRegions)"
        :fill="colorScale(0)" 
        ><title>{{zeroRegions + " counties"}}</title>
</rect>
<line :x2="binWidth" x1=0></line>
<text dy=30 :dx="binWidth/2" >0</text>
</g> 
<template v-for="(item, index) in histogramData">      
<g :key="index+'rect'">
<rect   :x="index == 0 ? xScale.range()[0] : xScale(item.x0)" 
        :y="yScale(item.length)"
        :width="binWidth"
        :height="yScale(0) - yScale(item.length)"
        :fill="colorScale(item.x0)" 
        ><title>{{item.length + " counties"}}</title>
</rect>
</g>
</template>
<g :transform="`translate(${xScale.range()[1] + binWidth * 0.9}, ${yScale(0)})`" v-show="variable.indexOf('percent') > -1">
<rect   x=0
        :y="yScale(missingRegions) - yScale(0)"
        :width="binWidth"
        :height="yScale(0) - yScale(missingRegions)"
        :fill="colorScale(-9)" 
        ><title>{{missingRegions + " counties"}}</title>
</rect>
<line :x2="binWidth" x1="0"></line>
<text dy=30 :dx="binWidth/2" >NA</text>
</g>

<g class="histogramAxis" :transform="`translate(0,${height - 15})`">
    <line :x2="xScale.range()[1]" :x1="xScale.range()[0]"></line>
    <template v-for="(item, index) in xAxisTicks">
        <g :key="index + 'value'" :transform="`translate(${xScale(item)},0)`">
            <line y2 = 15 ></line>
            <text dy=30 v-if="index % 2 != 0" >{{axisValueFormatter(item)}}</text>
        </g>
</template>
        <g class="yAxis" v-for="item in yAxisTicks" :transform="`translate(0,${yScale(item) - height + 15})`" v-if="item != 0">
            <line :x1="xScale.range()[0] - binWidth * 2" :x2="variable.indexOf('percent') > -1 ? xScale.range()[1] + binWidth * 2 : xScale.range()[1]"  ></line>
            <text :dx="xScale.range()[0] - binWidth * 2 - 10" dy=5>{{item}}</text>
        </g>

        <text class="yLabel" :transform="`translate(-10,${-height/2})`">
        <tspan x=0 dy="0em">Number</tspan>
        <tspan x=0 dy="1.3em">of</tspan>
        <tspan x=0 dy="1.3em" v-html="aggregationLevel == 'county' ? 'Counties' : 'AHECs'"></tspan>
        </text>

<g class="ncLine">
  <line :x2="xScale(ncData.value)" :x1="xScale(ncData.value)" y1=0 :y2="-(height - 5)"></line>
  <text :x="xScale(ncData.value)" :y="-(height)">{{ncText}}</text>
  </g>
<text class="histogramTitle" :x="chartMargin.left + (xScale.range()[1] - xScale.range()[0])/2" dy=55>{{chartTitle}}</text>
</g>
</g>
 </template>

 <script>
import { extent, range, max } from "d3-array";
import { scaleLinear, scaleLog, domain, rangeRound } from "d3-scale";
import {format} from "d3-format";
import {formatter} from "../utility";

export default {
  name: "HistogramLegend",
  data() {
    return {
      width: 400,
      height: 230,
      chartMargin: { top: 0, right: 15, bottom: 15, left: 100 },
      binWidth: 25
    };
  },
  props: ["colorScale", "histogramData", "mapData"],
  computed: {
    ncData() {
      return this.$store.getters
        .getDataByVariableForNorthCarolina(this.variable)
        .filter(d => d.year == this.$store.state.year)[0];
    },
    missingRegions() {
      return Array.from(this.mapData).filter(d => d[1] == "NA" || d[1] < 0)
        .length;
    },
    zeroRegions() {
      return Array.from(this.mapData).filter(d => d[1] == 0).length;
    },
    xDomain() {
      const currDomain = this.histogramData.map(d => d.x1).slice(0, -1);
      // const currExtent = [this.histogramData[0].x0, this.histogramData[this.histogramData.length - 1]];
      const binWidth = max(this.histogramData, d => d.x1 - d.x0);
      // console.log( [
      //   Math.max(0, currDomain[0] - binWidth),
      //   ...currDomain,
      //   currDomain[currDomain.length - 1] + binWidth
      // ])
      return [
        Math.max(0, currDomain[0] - binWidth),
        ...currDomain,
        currDomain[currDomain.length - 1] + binWidth
      ];
    },
    xScale: function() {

      const scaleWidth = this.histogramData.length * this.binWidth + this.chartMargin.left;
      return scaleLinear()
        .domain(extent(this.xDomain))
        .range([this.chartMargin.left, scaleWidth]);
    },
    xAxisTicks: function() {
      //prevent 101% from being labeled
      const lastElement = this.xDomain[this.xDomain.length - 1];
      return this.variable.indexOf("percent") > -1 && lastElement > 1
        ? this.xDomain.slice(0, -1)
        : this.xDomain;
    },
    yScale() {
      return scaleLinear()
        .domain([
          0,
          Math.max(
            max(this.histogramData, d => d.length),
            this.missingRegions,
            this.zeroRegions
          )
        ])
        .range([this.height - this.chartMargin.bottom, this.chartMargin.top]);
    },
    yAxisTicks() {
      return this.yScale.ticks(5);
    },
    chartTitle() {
      let currentChartTitle = "Histogram";
      switch (this.variable) {
        case "providerRate":
          currentChartTitle = "Rate per 10,000 Population";
          break;
        case "percentFemale":
          currentChartTitle = "Percent Female";
          break;
        case "percentAge":
          currentChartTitle = "Percent 65 or Older";
          break;
        case "percentUnderrepresented":
          currentChartTitle = "Percent Underrepresented Minority";
          break;
        case "total":
          currentChartTitle = "Total";
          break;
      }
      return currentChartTitle;
    },
    ncText() {
      let txt = "State ";
      txt = this.variable == "providerRate"
        ? txt + "Rate"
        : this.variable == "total" ? txt + "Median" : txt + "Percentage";

        return `${txt}: ${this.valueFormatter(this.ncData.value)}`
    },
    valueFormatter: function(){
        return formatter(this.variable)
    },
    variable: function() {
      return this.$store.state.variable;
    },
    aggregationLevel: function() {
      return this.$store.state.aggregationLevel;
    }
  },
  methods: {
    mouseover: function(region) {
      this.$store.commit("changeHoveredRegion", region);
    },
    mouseout: function() {
      this.$store.commit("changeHoveredRegion", -9);
    },
    axisValueFormatter(currValue) {
      let formatted = currValue;
      if (this.variable.indexOf("percent") > -1) {
        formatted = Math.round(currValue * 100) + "%";
      } else if(this.variable == "providerRate"){
        formatted = format("")(currValue);
      } else {
        formatted = this.valueFormatter(currValue)
      }
      return formatted;
    }
  }
};
</script>

<style scoped>
.xAxisText {
  font-weight: 600;
}
text {
  font-size: 1.1em;
  fill: #4b4b4b;
  text-anchor: middle;
}

line {
  stroke: #4b4b4b;
}

.histogramTitle {
  font-size: 1em;
  font-weight: 600;
  text-anchor: middle;
}

.yLabel {
  font-size: 1em;
  font-weight: 600;
  text-anchor: middle;
}

.ncLine text {
  fill: #007fae;
  font-weight: 600;
  font-size: 1em;
}

.ncLine line {
  stroke: #007fae;
  stroke-width: 3px;
}

.yAxis line {
  stroke: #bdbdbd;
}

/* .hoverBox rect {
  fill: rgb(163, 49, 128);
  opacity: 0.85;
}

.hoverBox text {
  fill: #fff;
} */

.selectedCircle {
  stroke: rgb(163, 49, 128);
  stroke-width: 3px;
  fill: #808080;
}
</style>
 