<template>
<div>
<p class="title">{{title}}</p>
<svg preserveAspectRatio="xMinYMin meet" :width=width :height=height :viewBox="viewBox">
<g :transform="`translate(${chartMargin.left}, ${chartMargin.top})`">
    <rect 
        v-for="item in chartData" 
        :key="item.year"  
        :x="xScale(item.year)" 
        :y="yScale(item.value)"
        :width="bandwidth" 
        :height="barHeight(item.value)" 
        @mouseover="mouseover(item.year)"
        @mouseout="mouseout"
     >
    </rect>
</g>
<g :transform="`translate(${chartMargin.left}, ${chartMargin.top})`">
    <template v-for="item in chartData" >
        <text
            :key="item.year + 'value'"
            :x="xScale(item.year) - 0.5*bandwidth" 
            :y="yScale(item.value) - 4"
            v-show="showLabel(item.year)"
            >
            {{valueFormatter(item.value)}}
        </text>

        <text
            :key="item.year + 'year'"
            :x="xScale(item.year) - 0.5*bandwidth - 3" 
            :y="yScale(item.value) + barHeight(item.value) + 15"
            v-show="showLabel(item.year)"
            class="yearLabel"
            >
            {{item.year}}
        </text>
    </template>
</g>
</svg>
</div>
</template>

<script>
import {extent, range, max} from 'd3-array'
import {scaleBand, scaleLinear, domain, rangeRound, padding} from 'd3-scale'
import {formatter} from '../utility'

// Need to render all rectangles first and then all annotation in 
// order to ensure that annotation is in front of rectangles.
// This is why the rectangles and the annotation are in diiferenct svg groups.

export default {
  name: 'SparkBarChart',
  data () {
    return {
        width: 240,
        height: 70, 
        chartMargin : { top: 15, right: 37, bottom: 21, left: 5 }
    }
  }, 
  props: ['variable'], 
  computed: {
    chartData: function(){
        return this.$store.getters.getDataByVariable(this.variable);
    },
    title: function(){
        return this.chartTitle(this.variable)
    },
    viewBox: function(){
          return `0 0 ${this.width} ${this.height}`
      },
    chartWidth: function(){return this.width - this.chartMargin.left - this.chartMargin.right},
    chartHeight: function(){return this.height - this.chartMargin.top - this.chartMargin.bottom}, 
    yearRange: function(){
        return extent(this.chartData, d=>d.year);
    }, 
    xScale: function(){
        const xDomain = range(this.yearRange[0], this.yearRange[1]+1);
        return scaleBand().domain(xDomain).rangeRound([0, this.chartWidth]).padding(0.1);
    },
    bandwidth: function(){
        return this.xScale.bandwidth();
    },
    yScale: function(){
        const yMax = max(this.chartData, function(d) {return d.value});
        console.log(yMax);
        return scaleLinear().domain([0,yMax]).rangeRound([this.chartHeight, 0]);
    },
    barHeight: function(){
        const height = this.chartHeight;
        const yScale = this.yScale;
        return function(value){return height - yScale(value)}
    },
    valueFormatter: function(){
        return formatter(this.variable)
    },
    showLabel: function(){
        const hoveredYear = this.hoveredYear;
        const yearRange = this.yearRange;
        return function(year){
            return (hoveredYear == 0 & (year == yearRange[0] || year == yearRange[1])) || year == hoveredYear ? true : false
        }       
    },
    hoveredYear() {
      return this.$store.state.hoveredYear;
    }, 
    mouseover() {
        return function(year){
      this.$store.commit('changeHoveredYear', year)
    }
    }
  },
  methods: { 
    // mouseover: function(year){
    //   this.$store.commit('changeHoveredYear', year)
    // },
    mouseout: function(){
      this.$store.commit('changeHoveredYear', 0)
    },
    chartTitle: function(currentVariable){
            var currentChartTitle = currentVariable;
            switch (currentVariable) {
                case "provider_rate":
                    currentChartTitle = "Rate per 10,000 Population";
                    break;
                case "percent_females":
                currentChartTitle = "Percent Female";
                    break;
                case "percent_age":
                    currentChartTitle = "Percent 65 or Older";
                    break;
                case "percent_underrepresented":
                    currentChartTitle = "Percent Underrepresented Minority";
                    break;
                    case "percent_race_na":
          currentChartTitle = "Percent Missing Race";
          break;
                case "total":
                    currentChartTitle = "Total";
                    break;
            }
            return currentChartTitle;
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
    margin: 0;
}

.title {
    font-size: 1.2rem;
    text-align: center;
}

rect {
  fill: rgb(173, 221, 142); 
  stroke-width: 0;
  }

rect:hover {
  stroke: rgb(90, 90, 90);;
  stroke-width: 2;
}

text {
    font-size: 1.2rem;   
  }

text.yearLabel {
    fill: rgb(189, 189, 189);
  }
</style>