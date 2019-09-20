<template>
<transition name="fade">
<g :id="variable" >
  <rect :width="width" :height="width*0.4" fill="#fff"  @click="click" transform="translate(0, -20)"></rect>
<text class="title" transform="translate(0, -5)" @click="click">{{title}}</text>
<g :transform="`translate(${chartMargin.left}, ${chartMargin.top})`">
    <bar-rect 
        v-for="(item, index) in chartData" 
        :key="item.year" 
        :barData="rectValues[index]"       
        ></bar-rect>
</g>
<g :transform="`translate(${chartMargin.left}, ${chartMargin.top})`" v-show="region != 'North Carolina'">
    <path class="ncLine" :d="linePath"></path>
  <text :x="variable.indexOf('percent') > -1 ? ncPosition[0] + 17 : ncPosition[0] + 8" :y="ncPosition[1] + 5" style="fill: #007fae; opacity: 0.5; font-size: 1em;">{{ncText}}</text>
</g>
<g :transform="`translate(${chartMargin.left}, ${chartMargin.top})`">
    <bar-text 
        v-for="(item, index) in chartData" 
        :key="item.year"
        :barData="rectValues[index]"      
        ></bar-text>
</g>
</g>
</transition>
</template>

<script>
import { extent, range, max } from "d3-array";
import { scaleBand, scaleLinear, domain, rangeRound, padding } from "d3-scale";
import { line, x, y } from "d3-shape";
import { formatter } from "../utility";
import BarRect from "./BarRect";
import BarText from "./BarText";

// Need to render all rectangles first and then all annotation in
// order to ensure that annotation is in front of rectangles

export default {
  name: "SparkBarChart",
  data() {
    return {
      width: 240,
      chartMargin: { top: 15, right: 17, bottom: 21, left: 10 },
      linePath: "",
      ncPosition: [0,0]
    };
  },
  props: ["variable"],
  components: {
    BarRect,
    BarText
  },
  computed: {
    region() {
      return this.$store.state.region;
    },
    height() {
      return this.width * 0.29;
    },
    ncData() {
      return this.$store.getters.getDataByVariableForNorthCarolina(
        this.variable
      );
    },
    chartData: function() {
      return this.$store.getters.getDataByVariableForCurrentRegion(
        this.variable
      );
    },
    title: function() {
      return this.chartTitle(this.variable);
    },
    viewBox: function() {
      return `0 0 ${this.width} ${this.height}`;
    },
    chartWidth: function() {
      return this.width - this.chartMargin.left - this.chartMargin.right;
    },
    chartHeight: function() {
      return this.height - this.chartMargin.top - this.chartMargin.bottom;
    },
    //object array of scaled values describing each of the bars
    rectValues: function() {
      //x scale
      const xExtent = extent(this.chartData, d => d.year);
      const xDomain = range(xExtent[0], xExtent[1] + 1);
      const xScale = scaleBand()
        .domain(xDomain)
        .range([0, this.chartWidth])
        .padding(0.1);
      const xBandwidth = Math.min(xScale.bandwidth(), 50)
      const xLinear = scaleLinear()
        .domain(xExtent)
        .range([0, this.chartWidth]); //for making ncLine

      //y scale
      const yMax = this.calculateYMax();
      const yScale = scaleLinear()
        .domain([0, yMax])
        .range([this.chartHeight, 0]);
      //proxy height to enable use within callback and proxy variable name
      const height = this.chartHeight;
      const variable = this.variable;
      //gat array length to test first and last elements
      const arrayLength = this.chartData.length;
      const valueFormatter = this.valueFormatter;
      const linePathGenerator = line()
        .x(function(d, i) {
          return xLinear(d.year);
        })
        .y(function(d, i) {
          return yScale(+d.value);
        });
      this.linePath = linePathGenerator(this.ncData);
      // console.log(yScale(this.ncData[this.ncData.length - 1].value))
      this.ncPosition = [xLinear.range()[1], yScale(this.ncData[this.ncData.length - 1].value)];
      return this.chartData.map(function(d, i) {
        //first and last elements are default annotations
        let defaultAnnotation = i == 0 || i == arrayLength - 1;

        return {
          x: xScale(d.year),
          y: yScale(d.value),
          width: xBandwidth,
          height: height - yScale(d.value),
          value: valueFormatter(d.value),
          year: d.year,
          defaultAnnotation,
          variable: variable
        };
      });
    },
    valueFormatter: function() {
      return formatter(this.variable);
    },
     ncText() {
      let txt = "State ";
      txt = this.variable == "providerRate"
        ? txt + "Rate"
        : this.variable == "total" ? txt + "Median" : txt + "%";

        return txt
    },
  },
  methods: {
    click: function(){
      this.$store.commit('changeVariable', this.variable)
    },
    calculateYMax: function() {
      const regionMax = Math.max(
        max(this.chartData, d => d.value),
        max(this.ncData, d => d.value)
      );
      return regionMax;
    },
    chartTitle: function(currentVariable) {
      var currentChartTitle = currentVariable;
      switch (currentVariable) {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin: 0;
}

.ncLine {
  fill: none;
  stroke: #007FAE;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-opacity: 0.5;
}

.title {
  font-size: 1em;
  text-align: center;
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